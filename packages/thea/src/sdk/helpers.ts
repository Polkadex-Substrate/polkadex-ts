import { AccountId32 } from "@polkadot/types/interfaces";

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
  BIFROST_GENESIS,
  Chain,
  getSubstrateChain,
  ChainType,
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
  Bifrost,
} from "./substrate";
import { Sepolia } from "./evm";

import { BaseChainAdapter } from "./";

export const getChainConnector = (genesis: string): BaseChainAdapter => {
  switch (genesis) {
    case INTERLAY_GENESIS:
      return new Interlay();
    case BIFROST_GENESIS:
      return new Bifrost();
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

export const getDirectWithdrawalMultilocation = (
  id: AccountId32,
  destChain: Chain,
  type: "sign" | "send"
) => {
  const parachainId = getSubstrateChain(destChain)?.parachainId;
  if (!parachainId || parachainId === -1) {
    // Withdraw to Relay chain i.e. Polkadot chain
    return {
      parents: 1,
      interior: {
        X1: {
          AccountId32: {
            network: null,
            id: type === "sign" ? id.toHex() : Array.from(id.toU8a()),
          },
        },
      },
    };
  }

  const accountKey =
    destChain.type === ChainType.EvmSubstrate ? "AccountKey20" : "AccountId32";

  return {
    parents: 1,
    interior: {
      X2: [
        {
          Parachain: parachainId,
        },
        {
          [accountKey]: {
            network: null,
            id: type === "sign" ? id.toHex() : Array.from(id.toU8a()),
          },
        },
      ],
    },
  };
};
