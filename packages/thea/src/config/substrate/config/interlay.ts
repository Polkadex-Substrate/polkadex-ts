import { AssetConfig, ChainConfig } from "@moonbeam-network/xcm-config";
import { BalanceBuilder } from "@moonbeam-network/xcm-builder";

import { ExtrinsicBuilderV2 } from "../builders";
import { interlay, polkadex } from "../chains";
import { ibtc, intr, dot, glmr, bnc, vdot } from "../assets";

const toPolkadex: AssetConfig[] = [
  new AssetConfig({
    asset: ibtc,
    balance: BalanceBuilder().substrate().tokens().accounts(),
    destination: polkadex,
    destinationFee: {
      amount: 0,
      asset: ibtc,
      balance: BalanceBuilder().substrate().tokens().accounts(),
    },
    extrinsic: ExtrinsicBuilderV2().xTokens().transfer().X2(),
    fee: {
      asset: intr,
      balance: BalanceBuilder().substrate().tokens().accounts(),
    },
  }),

  new AssetConfig({
    asset: dot,
    balance: BalanceBuilder().substrate().tokens().accounts(),
    destination: polkadex,
    destinationFee: {
      amount: 0.1,
      asset: dot,
      balance: BalanceBuilder().substrate().assets().account(),
    },
    extrinsic: ExtrinsicBuilderV2().xTokens().transferMultiasset().X2(),
    fee: {
      asset: intr,
      balance: BalanceBuilder().substrate().tokens().accounts(),
    },
  }),

  new AssetConfig({
    asset: glmr,
    balance: BalanceBuilder().substrate().tokens().accounts(),
    destination: polkadex,
    destinationFee: {
      amount: 0.0035,
      asset: glmr,
      balance: BalanceBuilder().substrate().tokens().accounts(),
    },
    extrinsic: ExtrinsicBuilderV2().xTokens().transfer().X2(),
    fee: {
      asset: intr,
      balance: BalanceBuilder().substrate().tokens().accounts(),
    },
  }),

  new AssetConfig({
    asset: bnc,
    balance: BalanceBuilder().substrate().tokens().accounts(),
    destination: polkadex,
    destinationFee: {
      amount: 0.00055,
      asset: bnc,
      balance: BalanceBuilder().substrate().tokens().accounts(),
    },
    extrinsic: ExtrinsicBuilderV2().xTokens().transfer().X2(),
    fee: {
      asset: intr,
      balance: BalanceBuilder().substrate().tokens().accounts(),
    },
  }),

  new AssetConfig({
    asset: vdot,
    balance: BalanceBuilder().substrate().tokens().accounts(),
    destination: polkadex,
    destinationFee: {
      amount: 0.00000008,
      asset: vdot,
      balance: BalanceBuilder().substrate().tokens().accounts(),
    },
    extrinsic: ExtrinsicBuilderV2().xTokens().transfer().X3(),
    fee: {
      asset: intr,
      balance: BalanceBuilder().substrate().tokens().accounts(),
    },
  }),
];

export const interlayConfig = new ChainConfig({
  assets: [...toPolkadex],
  chain: interlay,
});
