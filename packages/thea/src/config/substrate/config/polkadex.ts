import { ChainConfig, AssetConfig } from "@moonbeam-network/xcm-config";
import { BalanceBuilder, AssetMinBuilder } from "@moonbeam-network/xcm-builder";

import { assetHub, polkadex } from "../chains";
import { usdt, usdc, ded, pink } from "../assets";
import { ExtrinsicBuilderV2 } from "../builders";

const toAssethub: AssetConfig[] = [
  new AssetConfig({
    asset: usdt,
    balance: BalanceBuilder().substrate().assets().account(),
    destination: assetHub,
    destinationFee: {
      amount: 0.7,
      asset: usdt,
      balance: BalanceBuilder().substrate().system().account(),
    },
    extrinsic: ExtrinsicBuilderV2()
      .polkadotXcm()
      .reserveTransferAssets()
      .here(),
    min: AssetMinBuilder().assets().asset(),
  }),

  new AssetConfig({
    asset: usdc,
    balance: BalanceBuilder().substrate().assets().account(),
    destination: assetHub,
    destinationFee: {
      amount: 0.7,
      asset: usdc,
      balance: BalanceBuilder().substrate().system().account(),
    },
    extrinsic: ExtrinsicBuilderV2()
      .polkadotXcm()
      .reserveTransferAssets()
      .here(),
    min: AssetMinBuilder().assets().asset(),
  }),

  new AssetConfig({
    asset: ded,
    balance: BalanceBuilder().substrate().assets().account(),
    destination: assetHub,
    destinationFee: {
      amount: 0.7,
      asset: ded,
      balance: BalanceBuilder().substrate().system().account(),
    },
    extrinsic: ExtrinsicBuilderV2()
      .polkadotXcm()
      .reserveTransferAssets()
      .here(),
    min: AssetMinBuilder().assets().asset(),
  }),

  new AssetConfig({
    asset: pink,
    balance: BalanceBuilder().substrate().assets().account(),
    destination: assetHub,
    destinationFee: {
      amount: 0.7,
      asset: pink,
      balance: BalanceBuilder().substrate().system().account(),
    },
    extrinsic: ExtrinsicBuilderV2()
      .polkadotXcm()
      .reserveTransferAssets()
      .here(),
    min: AssetMinBuilder().assets().asset(),
  }),
];

export const polkadexConfig = new ChainConfig({
  assets: [...toAssethub],
  chain: polkadex,
});