import { ASSETHUB_GENESIS, POLKADEX_GENESIS, SEPOLIA_GENESIS } from "../config";

import { AssetHub, Polkadex } from "./substrate";
import { Sepolia } from "./evm";

import { BaseChainAdapter } from "./";

export const getChainConnector = (genesis: string): BaseChainAdapter => {
  switch (genesis) {
    case ASSETHUB_GENESIS:
      return new AssetHub();
    case POLKADEX_GENESIS:
      return new Polkadex();
    case SEPOLIA_GENESIS:
      return new Sepolia();
    default:
      throw new Error("No chain found for given genesis..");
  }
};
