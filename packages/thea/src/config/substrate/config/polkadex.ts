import { ChainConfig, AssetConfig } from "@moonbeam-network/xcm-config";
import { BalanceBuilder, AssetMinBuilder } from "@moonbeam-network/xcm-builder";
import { ASSETS_MAP } from "@polkadex/polkadex-api";

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
  pdex,
} from "../assets";
import { ExtrinsicBuilderV2 } from "../builders";

const xcmDeliveryFeeAmount = 1;

const toAssethub: AssetConfig[] = [
  // Need to test
  new AssetConfig({
    asset: dot,
    balance: BalanceBuilder().substrate().assets().account(),
    destination: assetHub,
    destinationFee: {
      amount: 0, // TODO: Change it later
      asset: dot,
      balance: BalanceBuilder().substrate().system().account(),
    },
    extrinsic: ExtrinsicBuilderV2()
      .theaExecuter()
      .parachainWithdraw()
      .X2()
      .sufficient(),
    min: AssetMinBuilder().assets().asset(),
    fee: {
      asset: pdex,
      balance: BalanceBuilder().substrate().system().account(),
      xcmDeliveryFeeAmount,
    },
  }),

  new AssetConfig({
    asset: usdt,
    balance: BalanceBuilder().substrate().assets().account(),
    destination: assetHub,
    destinationFee: {
      amount: 0.05,
      asset: usdt,
      balance: BalanceBuilder().substrate().system().account(),
    },
    extrinsic: ExtrinsicBuilderV2()
      .theaExecuter()
      .parachainWithdraw()
      .X2()
      .sufficient(),
    min: AssetMinBuilder().assets().asset(),
    fee: {
      asset: pdex,
      balance: BalanceBuilder().substrate().system().account(),
      xcmDeliveryFeeAmount,
    },
  }),

  new AssetConfig({
    asset: usdc,
    balance: BalanceBuilder().substrate().assets().account(),
    destination: assetHub,
    destinationFee: {
      amount: 0.05,
      asset: usdc,
      balance: BalanceBuilder().substrate().system().account(),
    },
    extrinsic: ExtrinsicBuilderV2()
      .theaExecuter()
      .parachainWithdraw()
      .X2()
      .sufficient(),
    min: AssetMinBuilder().assets().asset(),
    fee: {
      asset: pdex,
      balance: BalanceBuilder().substrate().system().account(),
      xcmDeliveryFeeAmount,
    },
  }),

  new AssetConfig({
    asset: ded,
    balance: BalanceBuilder().substrate().assets().account(),
    destination: assetHub,
    destinationFee: {
      amount: 0.7,
      asset: usdt,
      balance: BalanceBuilder().substrate().system().account(),
    },
    extrinsic: ExtrinsicBuilderV2()
      .theaExecuter()
      .parachainWithdraw()
      .X2()
      .insufficient(ASSETS_MAP.get("USDT")?.id as string, 700000000000),
    min: AssetMinBuilder().assets().asset(),
    fee: {
      asset: pdex,
      balance: BalanceBuilder().substrate().system().account(),
      xcmDeliveryFeeAmount,
    },
  }),

  new AssetConfig({
    asset: pink,
    balance: BalanceBuilder().substrate().assets().account(),
    destination: assetHub,
    destinationFee: {
      amount: 0.7,
      asset: usdt,
      balance: BalanceBuilder().substrate().system().account(),
    },
    extrinsic: ExtrinsicBuilderV2()
      .theaExecuter()
      .parachainWithdraw()
      .X2()
      .insufficient(ASSETS_MAP.get("USDT")?.id as string, 700000000000),
    min: AssetMinBuilder().assets().asset(),
    fee: {
      asset: pdex,
      balance: BalanceBuilder().substrate().system().account(),
      xcmDeliveryFeeAmount,
    },
  }),
];

const toPolkadot: AssetConfig[] = [
  new AssetConfig({
    asset: dot,
    balance: BalanceBuilder().substrate().assets().account(),
    destination: polkadot,
    destinationFee: {
      amount: 0, // TODO: Change it later
      asset: dot,
      balance: BalanceBuilder().substrate().system().account(),
    },
    extrinsic: ExtrinsicBuilderV2()
      .theaExecuter()
      .parachainWithdraw()
      .X2()
      .sufficient(),
    min: AssetMinBuilder().assets().asset(),
    fee: {
      asset: pdex,
      balance: BalanceBuilder().substrate().system().account(),
      xcmDeliveryFeeAmount,
    },
  }),
];

const toAstar: AssetConfig[] = [
  new AssetConfig({
    asset: astr,
    balance: BalanceBuilder().substrate().assets().account(),
    destination: astar,
    destinationFee: {
      amount: 0, // TODO: Change it later
      asset: astr,
      balance: BalanceBuilder().substrate().system().account(),
    },
    extrinsic: ExtrinsicBuilderV2()
      .theaExecuter()
      .parachainWithdraw()
      .X2()
      .sufficient(),
    min: AssetMinBuilder().assets().asset(),
    fee: {
      asset: pdex,
      balance: BalanceBuilder().substrate().system().account(),
      xcmDeliveryFeeAmount,
    },
  }),
];

const toPhala: AssetConfig[] = [
  new AssetConfig({
    asset: pha,
    balance: BalanceBuilder().substrate().assets().account(),
    destination: phala,
    destinationFee: {
      amount: 0, // TODO: Change it later
      asset: pha,
      balance: BalanceBuilder().substrate().system().account(),
    },
    extrinsic: ExtrinsicBuilderV2()
      .theaExecuter()
      .parachainWithdraw()
      .X2()
      .sufficient(),
    min: AssetMinBuilder().assets().asset(),
    fee: {
      asset: pdex,
      balance: BalanceBuilder().substrate().system().account(),
      xcmDeliveryFeeAmount,
    },
  }),
];

const toMoonbeam: AssetConfig[] = [
  new AssetConfig({
    asset: glmr,
    balance: BalanceBuilder().substrate().assets().account(),
    destination: moonbeam,
    destinationFee: {
      amount: 0, // TODO: Change it later
      asset: glmr,
      balance: BalanceBuilder().substrate().system().account(),
    },
    extrinsic: ExtrinsicBuilderV2()
      .theaExecuter()
      .parachainWithdraw()
      .X2()
      .sufficient(),
    min: AssetMinBuilder().assets().asset(),
    fee: {
      asset: pdex,
      balance: BalanceBuilder().substrate().system().account(),
      xcmDeliveryFeeAmount,
    },
  }),
];

const toUnique: AssetConfig[] = [
  new AssetConfig({
    asset: unq,
    balance: BalanceBuilder().substrate().assets().account(),
    destination: unique,
    destinationFee: {
      amount: 0, // TODO: Change it later
      asset: unq,
      balance: BalanceBuilder().substrate().system().account(),
    },
    extrinsic: ExtrinsicBuilderV2()
      .theaExecuter()
      .parachainWithdraw()
      .X2()
      .sufficient(),
    min: AssetMinBuilder().assets().asset(),
    fee: {
      asset: pdex,
      balance: BalanceBuilder().substrate().system().account(),
      xcmDeliveryFeeAmount,
    },
  }),
];

const toInterlay: AssetConfig[] = [
  new AssetConfig({
    asset: ibtc,
    balance: BalanceBuilder().substrate().assets().account(),
    destination: interlay,
    destinationFee: {
      amount: 0, // TODO: Change it later
      asset: ibtc,
      balance: BalanceBuilder().substrate().system().account(),
    },
    extrinsic: ExtrinsicBuilderV2()
      .theaExecuter()
      .parachainWithdraw()
      .X2()
      .sufficient(),
    min: AssetMinBuilder().assets().asset(),
    fee: {
      asset: pdex,
      balance: BalanceBuilder().substrate().system().account(),
      xcmDeliveryFeeAmount,
    },
  }),

  // Need to test
  new AssetConfig({
    asset: dot,
    balance: BalanceBuilder().substrate().assets().account(),
    destination: interlay,
    destinationFee: {
      amount: 0, // TODO: Change it later
      asset: dot,
      balance: BalanceBuilder().substrate().system().account(),
    },
    extrinsic: ExtrinsicBuilderV2()
      .theaExecuter()
      .parachainWithdraw()
      .X2()
      .sufficient(),
    min: AssetMinBuilder().assets().asset(),
    fee: {
      asset: pdex,
      balance: BalanceBuilder().substrate().system().account(),
      xcmDeliveryFeeAmount,
    },
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
