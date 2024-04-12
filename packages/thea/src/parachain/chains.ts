import { Parachain, Ecosystem, AnyChain } from "@moonbeam-network/xcm-types";

import { pdex, dot, usdt } from "./assets";

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
  ],
  ecosystem: Ecosystem.Polkadot,
  genesisHash:
    "0x68d56f15f85d3136970ec16946040bc1752654e906147f7e43e9d539d7c3de2f",
  key: "assethub",
  name: "AssetHub",
  parachainId: 1000,
  ss58Format: 42,
  ws: "wss://polkadot-asset-hub-rpc.polkadot.io",
});

export const polkadex = new Parachain({
  assetsData: [
    {
      asset: usdt,
      decimals: 12,
      id: "3496813586714279103986568049643838918",
    },
    {
      asset: pdex,
      decimals: 12,
    },
  ],
  ecosystem: Ecosystem.Polkadot,
  genesisHash:
    "0x3920bcb4960a1eef5580cd5367ff3f430eef052774f78468852f7b9cb39f8a3c",
  key: "polkadex",
  name: "Polkadex",
  parachainId: 2040,
  ss58Format: 88,
  ws: "wss://polkadex.public.curie.radiumblock.co/ws",
});

export const chains = [polkadex, assetHub];

export const chainsMap = new Map<string, AnyChain>(
  chains.map((chain) => [chain.key, chain])
);