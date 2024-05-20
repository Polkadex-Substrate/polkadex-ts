import { AssetConfig, ChainConfig } from "@moonbeam-network/xcm-config";
import { BalanceBuilder } from "@moonbeam-network/xcm-builder";

import { ExtrinsicBuilderV2 } from "../builders";
import { bifrost, polkadex } from "../chains";
import { bnc, vdot } from "../assets";

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
