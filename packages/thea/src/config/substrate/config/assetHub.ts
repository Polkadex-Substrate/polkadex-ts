import { AssetConfig, ChainConfig } from "@moonbeam-network/xcm-config";
import { AssetMinBuilder, BalanceBuilder } from "@moonbeam-network/xcm-builder";

import { ExtrinsicBuilderV2 } from "../builders";
import { assetHub, polkadex } from "../chains";
import { dot, usdt, usdc } from "../assets";

const xcmDeliveryFeeAmount = 0.002;

const toPolkadex: AssetConfig[] = [
  new AssetConfig({
    asset: usdt,
    balance: BalanceBuilder().substrate().assets().account(),
    destination: polkadex,
    destinationFee: {
      amount: 0, // Zero destination fee for polkadex
      asset: usdt,
      balance: BalanceBuilder().substrate().assets().account(),
    },
    extrinsic: ExtrinsicBuilderV2()
      .polkadotXcm()
      .limitedReserveTransferAssets()
      .X2(),
    fee: {
      asset: dot,
      balance: BalanceBuilder().substrate().system().account(),
      xcmDeliveryFeeAmount,
    },
    min: AssetMinBuilder().assets().asset(),
  }),

  new AssetConfig({
    asset: usdc,
    balance: BalanceBuilder().substrate().assets().account(),
    destination: polkadex,
    destinationFee: {
      amount: 0,
      asset: usdc,
      balance: BalanceBuilder().substrate().assets().account(),
    },
    extrinsic: ExtrinsicBuilderV2()
      .polkadotXcm()
      .limitedReserveTransferAssets()
      .X2(),
    fee: {
      asset: dot,
      balance: BalanceBuilder().substrate().system().account(),
      xcmDeliveryFeeAmount,
    },
    min: AssetMinBuilder().assets().asset(),
  }),
];

export const assetHubConfig = new ChainConfig({
  assets: [...toPolkadex],
  chain: assetHub,
});
