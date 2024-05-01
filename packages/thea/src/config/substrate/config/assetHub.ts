import { AssetConfig, ChainConfig } from "@moonbeam-network/xcm-config";
import { AssetMinBuilder, BalanceBuilder } from "@moonbeam-network/xcm-builder";

import { ExtrinsicBuilderV2 } from "../builders";
import { assetHub, polkadex } from "../chains";
import { dot, usdt, usdc, ded, pink } from "../assets";

const xcmDeliveryFeeAmount = 0.002;

const toPolkadex: AssetConfig[] = [
  // Not working
  new AssetConfig({
    asset: dot,
    balance: BalanceBuilder().substrate().system().account(),
    destination: polkadex,
    destinationFee: {
      amount: 0,
      asset: dot,
      balance: BalanceBuilder().substrate().assets().account(),
    },
    extrinsic: ExtrinsicBuilderV2()
      .polkadotXcm()
      .limitedReserveTransferAssets()
      .here(),
    fee: {
      asset: dot,
      balance: BalanceBuilder().substrate().system().account(),
      xcmDeliveryFeeAmount,
    },
  }),

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

  new AssetConfig({
    asset: ded,
    balance: BalanceBuilder().substrate().assets().account(),
    destination: polkadex,
    destinationFee: {
      amount: 0,
      asset: ded,
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
    asset: pink,
    balance: BalanceBuilder().substrate().assets().account(),
    destination: polkadex,
    destinationFee: {
      amount: 0,
      asset: pink,
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
