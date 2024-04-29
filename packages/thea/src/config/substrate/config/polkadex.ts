import { ChainConfig, AssetConfig } from "@moonbeam-network/xcm-config";
import { BalanceBuilder, AssetMinBuilder } from "@moonbeam-network/xcm-builder";

import {
  assetHub,
  polkadex,
  polkadot,
  astar,
  phala,
  moonbeam,
  unique,
  interlay,
} from "../chains";
import {
  usdt,
  usdc,
  ded,
  pink,
  dot,
  astr,
  pha,
  glmr,
  unq,
  ibtc,
} from "../assets";
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

const toPolkadot: AssetConfig[] = [
  new AssetConfig({
    asset: dot,
    balance: BalanceBuilder().substrate().assets().account(),
    destination: polkadot,
    destinationFee: {
      amount: 0,
      asset: dot,
      balance: BalanceBuilder().substrate().system().account(),
    },
    extrinsic: ExtrinsicBuilderV2()
      .polkadotXcm()
      .reserveTransferAssets()
      .here(),
    min: AssetMinBuilder().assets().asset(),
  }),
];

const toAstar: AssetConfig[] = [
  new AssetConfig({
    asset: astr,
    balance: BalanceBuilder().substrate().assets().account(),
    destination: astar,
    destinationFee: {
      amount: 0,
      asset: astr,
      balance: BalanceBuilder().substrate().system().account(),
    },
    extrinsic: ExtrinsicBuilderV2()
      .polkadotXcm()
      .reserveTransferAssets()
      .here(),
    min: AssetMinBuilder().assets().asset(),
  }),
];

const toPhala: AssetConfig[] = [
  new AssetConfig({
    asset: pha,
    balance: BalanceBuilder().substrate().assets().account(),
    destination: phala,
    destinationFee: {
      amount: 0,
      asset: pha,
      balance: BalanceBuilder().substrate().system().account(),
    },
    extrinsic: ExtrinsicBuilderV2()
      .polkadotXcm()
      .reserveTransferAssets()
      .here(),
    min: AssetMinBuilder().assets().asset(),
  }),
];

const toMoonbeam: AssetConfig[] = [
  new AssetConfig({
    asset: glmr,
    balance: BalanceBuilder().substrate().assets().account(),
    destination: moonbeam,
    destinationFee: {
      amount: 0,
      asset: glmr,
      balance: BalanceBuilder().substrate().system().account(),
    },
    extrinsic: ExtrinsicBuilderV2()
      .polkadotXcm()
      .reserveTransferAssets()
      .here(),
    min: AssetMinBuilder().assets().asset(),
  }),
];

const toUnique: AssetConfig[] = [
  new AssetConfig({
    asset: unq,
    balance: BalanceBuilder().substrate().assets().account(),
    destination: unique,
    destinationFee: {
      amount: 0,
      asset: unq,
      balance: BalanceBuilder().substrate().system().account(),
    },
    extrinsic: ExtrinsicBuilderV2()
      .polkadotXcm()
      .reserveTransferAssets()
      .here(),
    min: AssetMinBuilder().assets().asset(),
  }),
];

const toInterlay: AssetConfig[] = [
  new AssetConfig({
    asset: ibtc,
    balance: BalanceBuilder().substrate().assets().account(),
    destination: interlay,
    destinationFee: {
      amount: 0,
      asset: ibtc,
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
  assets: [
    ...toAssethub,
    ...toPolkadot,
    ...toAstar,
    ...toPhala,
    ...toMoonbeam,
    ...toUnique,
    ...toInterlay,
  ],
  chain: polkadex,
});
