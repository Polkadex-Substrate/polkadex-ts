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
  bifrost,
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
  bnc,
  vdot,
} from "../assets";
import { ExtrinsicBuilderV2 } from "../builders";

const xcmDeliveryFeeAmount = 1;

const toAssethub: AssetConfig[] = [
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
      amount: 0.005,
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
      amount: 0.05,
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

  new AssetConfig({
    asset: dot,
    balance: BalanceBuilder().substrate().assets().account(),
    destination: astar,
    destinationFee: {
      amount: 0.05,
      asset: dot,
      balance: BalanceBuilder().substrate().assets().account(),
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
    asset: glmr,
    balance: BalanceBuilder().substrate().assets().account(),
    destination: astar,
    destinationFee: {
      amount: 0.0035,
      asset: glmr,
      balance: BalanceBuilder().substrate().assets().account(),
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
    asset: unq,
    balance: BalanceBuilder().substrate().assets().account(),
    destination: astar,
    destinationFee: {
      amount: 0.01,
      asset: unq,
      balance: BalanceBuilder().substrate().assets().account(),
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
    asset: pha,
    balance: BalanceBuilder().substrate().assets().account(),
    destination: astar,
    destinationFee: {
      amount: 0.065,
      asset: pha,
      balance: BalanceBuilder().substrate().assets().account(),
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
    asset: bnc,
    balance: BalanceBuilder().substrate().assets().account(),
    destination: astar,
    destinationFee: {
      amount: 0.001,
      asset: bnc,
      balance: BalanceBuilder().substrate().assets().account(),
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
    asset: vdot,
    balance: BalanceBuilder().substrate().assets().account(),
    destination: astar,
    destinationFee: {
      amount: 0.0000085,
      asset: vdot,
      balance: BalanceBuilder().substrate().assets().account(),
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
    asset: ibtc,
    balance: BalanceBuilder().substrate().assets().account(),
    destination: astar,
    destinationFee: {
      amount: 0.0000063,
      asset: ibtc,
      balance: BalanceBuilder().substrate().assets().account(),
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
      amount: 0.065,
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
      amount: 0.0035,
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

  new AssetConfig({
    asset: pdex,
    balance: BalanceBuilder().substrate().system().account(),
    destination: moonbeam,
    destinationFee: {
      amount: 0.013,
      asset: pdex,
      balance: BalanceBuilder().substrate().system().account(),
    },
    extrinsic: ExtrinsicBuilderV2()
      .theaExecuter()
      .parachainWithdraw()
      .X2()
      .sufficient(),
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
    destination: moonbeam,
    destinationFee: {
      amount: 0, // Change it
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

  // Need to test
  new AssetConfig({
    asset: astr,
    balance: BalanceBuilder().substrate().assets().account(),
    destination: moonbeam,
    destinationFee: {
      amount: 0, // Change it
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

  // Need to test
  new AssetConfig({
    asset: pha,
    balance: BalanceBuilder().substrate().assets().account(),
    destination: moonbeam,
    destinationFee: {
      amount: 0, // Change it
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
      amount: 0.00000063,
      asset: ibtc,
      balance: BalanceBuilder().substrate().tokens().accounts(),
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
    asset: dot,
    balance: BalanceBuilder().substrate().assets().account(),
    destination: interlay,
    destinationFee: {
      amount: 0.05,
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
    asset: glmr,
    balance: BalanceBuilder().substrate().assets().account(),
    destination: interlay,
    destinationFee: {
      amount: 0.045,
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

  new AssetConfig({
    asset: bnc,
    balance: BalanceBuilder().substrate().assets().account(),
    destination: interlay,
    destinationFee: {
      amount: 0.05,
      asset: bnc,
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
    asset: vdot,
    balance: BalanceBuilder().substrate().assets().account(),
    destination: interlay,
    destinationFee: {
      amount: 0.002,
      asset: vdot,
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

const toBifrost: AssetConfig[] = [
  new AssetConfig({
    asset: bnc,
    balance: BalanceBuilder().substrate().assets().account(),
    destination: bifrost,
    destinationFee: {
      amount: 0.000563136,
      asset: bnc,
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
    asset: vdot,
    balance: BalanceBuilder().substrate().assets().account(),
    destination: bifrost,
    destinationFee: {
      amount: 0.00000007,
      asset: vdot,
      balance: BalanceBuilder().substrate().tokens().accounts(),
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
    ...toBifrost,
  ],
  chain: polkadex,
});
