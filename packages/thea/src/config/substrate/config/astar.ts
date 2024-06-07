import { AssetConfig, ChainConfig } from "@moonbeam-network/xcm-config";
import { BalanceBuilder, AssetMinBuilder } from "@moonbeam-network/xcm-builder";

import { ExtrinsicBuilderV2 } from "../builders";
import { astar, polkadex } from "../chains";
import { astr, dot, glmr, unq, pha, bnc, vdot, ibtc } from "../assets";

const toPolkadex: AssetConfig[] = [
  new AssetConfig({
    asset: astr,
    balance: BalanceBuilder().substrate().system().account(),
    destination: polkadex,
    destinationFee: {
      amount: 0,
      asset: astr,
      balance: BalanceBuilder().substrate().system().account(),
    },
    extrinsic: ExtrinsicBuilderV2().xTokens().transferMultiassets().here(),
    fee: {
      asset: astr,
      balance: BalanceBuilder().substrate().system().account(),
    },
  }),

  // Tested & Working
  new AssetConfig({
    asset: dot,
    balance: BalanceBuilder().substrate().assets().account(),
    destination: polkadex,
    destinationFee: {
      amount: 0.05,
      asset: dot,
      balance: BalanceBuilder().substrate().system().account(),
    },
    extrinsic: ExtrinsicBuilderV2().xTokens().transfer().X3(),
    min: AssetMinBuilder().assets().asset(),
    fee: {
      asset: astr,
      balance: BalanceBuilder().substrate().system().account(),
    },
  }),

  // Tested & Working
  new AssetConfig({
    asset: glmr,
    balance: BalanceBuilder().substrate().assets().account(),
    destination: polkadex,
    destinationFee: {
      amount: 0.1,
      asset: glmr,
      balance: BalanceBuilder().substrate().assets().account(),
    },
    extrinsic: ExtrinsicBuilderV2().xTokens().transfer().X3(),
    min: AssetMinBuilder().assets().asset(),
    fee: {
      asset: astr,
      balance: BalanceBuilder().substrate().system().account(),
    },
  }),

  // Tested & Working
  new AssetConfig({
    asset: unq,
    balance: BalanceBuilder().substrate().assets().account(),
    destination: polkadex,
    destinationFee: {
      amount: 0,
      asset: unq,
      balance: BalanceBuilder().substrate().assets().account(),
    },
    extrinsic: ExtrinsicBuilderV2().xTokens().transfer().X3(),
    min: AssetMinBuilder().assets().asset(),
    fee: {
      asset: astr,
      balance: BalanceBuilder().substrate().system().account(),
    },
  }),

  // Tested & Working
  new AssetConfig({
    asset: pha,
    balance: BalanceBuilder().substrate().assets().account(),
    destination: polkadex,
    destinationFee: {
      amount: 0.1,
      asset: pha,
      balance: BalanceBuilder().substrate().assets().account(),
    },
    extrinsic: ExtrinsicBuilderV2().xTokens().transfer().X3(),
    min: AssetMinBuilder().assets().asset(),
    fee: {
      asset: astr,
      balance: BalanceBuilder().substrate().system().account(),
    },
  }),

  // Tested & Working
  new AssetConfig({
    asset: bnc,
    balance: BalanceBuilder().substrate().assets().account(),
    destination: polkadex,
    destinationFee: {
      amount: 0.0006,
      asset: bnc,
      balance: BalanceBuilder().substrate().assets().account(),
    },
    extrinsic: ExtrinsicBuilderV2().xTokens().transfer().X3(),
    min: AssetMinBuilder().assets().asset(),
    fee: {
      asset: astr,
      balance: BalanceBuilder().substrate().system().account(),
    },
  }),

  // Tested & Working
  new AssetConfig({
    asset: vdot,
    balance: BalanceBuilder().substrate().assets().account(),
    destination: polkadex,
    destinationFee: {
      amount: 0.00000007,
      asset: vdot,
      balance: BalanceBuilder().substrate().assets().account(),
    },
    extrinsic: ExtrinsicBuilderV2().xTokens().transfer().X3(),
    min: AssetMinBuilder().assets().asset(),
    fee: {
      asset: astr,
      balance: BalanceBuilder().substrate().system().account(),
    },
  }),

  // Tested & Working
  new AssetConfig({
    asset: ibtc,
    balance: BalanceBuilder().substrate().assets().account(),
    destination: polkadex,
    destinationFee: {
      amount: 0.00000063,
      asset: ibtc,
      balance: BalanceBuilder().substrate().assets().account(),
    },
    extrinsic: ExtrinsicBuilderV2().xTokens().transfer().X3(),
    min: AssetMinBuilder().assets().asset(),
    fee: {
      asset: astr,
      balance: BalanceBuilder().substrate().system().account(),
    },
  }),
];

export const astarConfig = new ChainConfig({
  assets: [...toPolkadex],
  chain: astar,
});
