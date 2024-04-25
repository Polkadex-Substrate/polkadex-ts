import { Parachain, Ecosystem, AnyChain } from "@moonbeam-network/xcm-types";
import { ASSET_ID } from "@polkadex/polkadex-api";

import { ASSETHUB_GENESIS, POLKADEX_GENESIS } from "../genesis";

import { pdex, dot, usdt, usdc, ded } from "./assets";

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
  ],
  ecosystem: Ecosystem.Polkadot,
  genesisHash: ASSETHUB_GENESIS,
  key: "assethub",
  name: "AssetHub",
  parachainId: 1000,
  ss58Format: 42,
  ws: "wss://polkadot-asset-hub-rpc.polkadot.io",
});

export const polkadex = new Parachain({
  assetsData: [
    {
      asset: pdex,
      decimals: 12,
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
  ],
  ecosystem: Ecosystem.Polkadot,
  genesisHash: POLKADEX_GENESIS,
  key: "polkadex",
  name: "Polkadex",
  parachainId: 2040,
  ss58Format: 88,
  ws: "wss://polkadex.public.curie.radiumblock.co/ws",
});

export const substrateChains = [polkadex, assetHub];

export const chainsMap = new Map<string, AnyChain>(
  substrateChains.map((chain) => [chain.key, chain])
);
