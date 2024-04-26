import { Parachain, Ecosystem, AnyChain } from "@moonbeam-network/xcm-types";
import { ASSET_ID } from "@polkadex/polkadex-api";

import {
  ASSETHUB_GENESIS,
  POLKADEX_GENESIS,
  POLKADOT_GENESIS,
} from "../genesis";

import { pdex, dot, usdt, usdc, ded, pink } from "./assets";

export const assetHub = new Parachain({
  assetsData: [
    {
      asset: dot,
      decimals: 10,
    },
    {
      asset: usdt,
      decimals: 6,
      id: 1984,
      palletInstance: 50,
    },
    {
      asset: usdc,
      decimals: 6,
      id: 1337,
      palletInstance: 50,
    },
    {
      asset: ded,
      decimals: 10,
      id: 30,
      palletInstance: 50,
    },
    {
      asset: pink,
      decimals: 10,
      id: 23,
      palletInstance: 50,
    },
  ],
  ecosystem: Ecosystem.Polkadot,
  genesisHash: ASSETHUB_GENESIS,
  key: "assethub",
  name: "AssetHub",
  parachainId: 1000,
  ss58Format: 42,
  ws: "wss://polkadot-asset-hub-rpc.polkadot.io",
});

export const polkadot = new Parachain({
  assetsData: [
    {
      asset: dot,
      decimals: 10,
    },
  ],
  ecosystem: Ecosystem.Polkadot,
  genesisHash: POLKADOT_GENESIS,
  key: "polkadot",
  name: "Polkadot",
  parachainId: -1,
  ss58Format: 0,
  ws: "wss://rpc.polkadot.io",
});

export const polkadex = new Parachain({
  assetsData: [
    {
      asset: pdex,
      decimals: 12,
    },
    {
      asset: dot,
      decimals: 12,
      id: ASSET_ID.DOT,
    },
    {
      asset: usdt,
      decimals: 12,
      id: ASSET_ID.USDT,
    },
    {
      asset: usdc,
      decimals: 12,
      id: ASSET_ID.USDC,
    },
    {
      asset: ded,
      decimals: 12,
      id: ASSET_ID.DED,
    },
    {
      asset: pink,
      decimals: 12,
      id: ASSET_ID.PINK,
    },
  ],
  ecosystem: Ecosystem.Polkadot,
  genesisHash: POLKADEX_GENESIS,
  key: "polkadex",
  name: "Polkadex",
  parachainId: 2040,
  ss58Format: 88,
  ws: "wss://polkadex.api.onfinality.io/public-ws",
});

export const substrateChains = [polkadex, assetHub, polkadot];

export const chainsMap = new Map<string, AnyChain>(
  substrateChains.map((chain) => [chain.key, chain])
);
