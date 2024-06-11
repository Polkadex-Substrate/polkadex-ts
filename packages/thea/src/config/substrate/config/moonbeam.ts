import { AssetConfig, ChainConfig } from "@moonbeam-network/xcm-config";
import { BalanceBuilder, AssetMinBuilder } from "@moonbeam-network/xcm-builder";

import { ExtrinsicBuilderV2 } from "../builders";
import { moonbeam, polkadex } from "../chains";
import { glmr, pdex, dot, astr, pha, bnc } from "../assets";

const toPolkadex: AssetConfig[] = [
  new AssetConfig({
    asset: glmr,
    balance: BalanceBuilder().substrate().system().account(),
    destination: polkadex,
    destinationFee: {
      amount: 0,
      asset: glmr,
      balance: BalanceBuilder().substrate().system().account(),
    },
    extrinsic: ExtrinsicBuilderV2().xTokens().evmTransfer(),
    fee: {
      asset: glmr,
      balance: BalanceBuilder().substrate().system().account(),
    },
  }),

  new AssetConfig({
    asset: pdex,
    balance: BalanceBuilder().substrate().assets().account(),
    destination: polkadex,
    destinationFee: {
      amount: 0.0064,
      asset: pdex,
      balance: BalanceBuilder().substrate().system().account(),
    },
    extrinsic: ExtrinsicBuilderV2().xTokens().evmTransfer(),
    min: AssetMinBuilder().assets().asset(),
    fee: {
      asset: glmr,
      balance: BalanceBuilder().substrate().system().account(),
    },
  }),

  new AssetConfig({
    asset: dot,
    balance: BalanceBuilder().substrate().assets().account(),
    destination: polkadex,
    destinationFee: {
      amount: 0.05,
      asset: dot,
      balance: BalanceBuilder().substrate().system().account(),
    },
    extrinsic: ExtrinsicBuilderV2().xTokens().evmTransfer(),
    min: AssetMinBuilder().assets().asset(),
    fee: {
      asset: glmr,
      balance: BalanceBuilder().substrate().system().account(),
    },
  }),

  new AssetConfig({
    asset: astr,
    balance: BalanceBuilder().substrate().assets().account(),
    destination: polkadex,
    destinationFee: {
      amount: 0.05,
      asset: astr,
      balance: BalanceBuilder().substrate().system().account(),
    },
    extrinsic: ExtrinsicBuilderV2().xTokens().evmTransfer(),
    min: AssetMinBuilder().assets().asset(),
    fee: {
      asset: glmr,
      balance: BalanceBuilder().substrate().system().account(),
    },
  }),

  new AssetConfig({
    asset: pha,
    balance: BalanceBuilder().substrate().assets().account(),
    destination: polkadex,
    destinationFee: {
      amount: 0.065,
      asset: pha,
      balance: BalanceBuilder().substrate().system().account(),
    },
    extrinsic: ExtrinsicBuilderV2().xTokens().evmTransfer(),
    min: AssetMinBuilder().assets().asset(),
    fee: {
      asset: glmr,
      balance: BalanceBuilder().substrate().system().account(),
    },
  }),

  new AssetConfig({
    asset: bnc,
    balance: BalanceBuilder().substrate().assets().account(),
    destination: polkadex,
    destinationFee: {
      amount: 0.0006,
      asset: bnc,
      balance: BalanceBuilder().substrate().system().account(),
    },
    extrinsic: ExtrinsicBuilderV2().xTokens().evmTransfer(),
    min: AssetMinBuilder().assets().asset(),
    fee: {
      asset: glmr,
      balance: BalanceBuilder().substrate().system().account(),
    },
  }),
];

export const moonbeamConfig = new ChainConfig({
  assets: [...toPolkadex],
  chain: moonbeam,
});
