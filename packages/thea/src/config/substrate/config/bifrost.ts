import { AssetConfig, ChainConfig } from "@moonbeam-network/xcm-config";
import { BalanceBuilder, AssetMinBuilder } from "@moonbeam-network/xcm-builder";

import { ExtrinsicBuilderV2 } from "../builders";
import { bifrost, polkadex } from "../chains";
import { bnc, vdot, astr } from "../assets";

const toPolkadex: AssetConfig[] = [
  new AssetConfig({
    asset: bnc,
    balance: BalanceBuilder().substrate().system().account(),
    destination: polkadex,
    destinationFee: {
      amount: 0,
      asset: bnc,
      balance: BalanceBuilder().substrate().system().account(),
    },
    extrinsic: ExtrinsicBuilderV2().xTokens().transfer().X3(),
    min: AssetMinBuilder().assetRegistry().currencyMetadatas(),
    fee: {
      asset: bnc,
      balance: BalanceBuilder().substrate().system().account(),
    },
  }),

  new AssetConfig({
    asset: vdot,
    balance: BalanceBuilder().substrate().tokens().accounts(),
    destination: polkadex,
    destinationFee: {
      amount: 0,
      asset: vdot,
      balance: BalanceBuilder().substrate().system().account(),
    },
    extrinsic: ExtrinsicBuilderV2().xTokens().transfer().X3(),
    min: AssetMinBuilder().assetRegistry().currencyMetadatas(),
    fee: {
      asset: bnc,
      balance: BalanceBuilder().substrate().system().account(),
    },
  }),

  // Need to test
  new AssetConfig({
    asset: astr,
    balance: BalanceBuilder().substrate().tokens().accounts(),
    destination: polkadex,
    destinationFee: {
      amount: 0.05,
      asset: astr,
      balance: BalanceBuilder().substrate().system().account(),
    },
    extrinsic: ExtrinsicBuilderV2().xTokens().transfer().X3(),
    min: AssetMinBuilder().assetRegistry().currencyMetadatas(),
    fee: {
      asset: bnc,
      balance: BalanceBuilder().substrate().system().account(),
    },
  }),
];

export const bifrostConfig = new ChainConfig({
  assets: [...toPolkadex],
  chain: bifrost,
});
