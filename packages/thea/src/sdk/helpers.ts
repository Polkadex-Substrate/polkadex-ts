import {
  ASSETHUB_GENESIS,
  POLKADEX_GENESIS,
  SEPOLIA_GENESIS,
  POLKADOT_GENESIS,
  ASTAR_GENESIS,
  PHALA_GENESIS,
  MOONBEAM_GENESIS,
  UNIQUE_GENESIS,
  INTERLAY_GENESIS,
} from "../config";

import {
  AssetHub,
  Polkadex,
  Polkadot,
  Astar,
  Phala,
  Moonbeam,
  Unique,
  Interlay,
} from "./substrate";
import { Sepolia } from "./evm";

import { BaseChainAdapter } from "./";

export const getChainConnector = (genesis: string): BaseChainAdapter => {
  switch (genesis) {
    case INTERLAY_GENESIS:
      return new Interlay();
    case UNIQUE_GENESIS:
      return new Unique();
    case MOONBEAM_GENESIS:
      return new Moonbeam();
    case PHALA_GENESIS:
      return new Phala();
    case ASTAR_GENESIS:
      return new Astar();
    case POLKADOT_GENESIS:
      return new Polkadot();
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
