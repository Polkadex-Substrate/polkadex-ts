import { AssetConfig, ChainConfig } from "@moonbeam-network/xcm-config";
import { BalanceBuilder } from "@moonbeam-network/xcm-builder";

import { ExtrinsicBuilderV2 } from "../builders";
import { astar, polkadex } from "../chains";
import { astr } from "../assets";

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
];

export const astarConfig = new ChainConfig({
  assets: [...toPolkadex],
  chain: astar,
});
