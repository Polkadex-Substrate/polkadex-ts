import { Parachain, Ecosystem, AnyChain } from "@moonbeam-network/xcm-types";
import { dot, polkadot, usdt, usdc } from "@moonbeam-network/xcm-config";

import { pdex } from "./assets";

export { polkadot };

export const assetHub = new Parachain({
  assetsData: [
    {
      asset: dot,
      decimals: 10,
      id: 0,
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
      palletInstance: 30,
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
      asset: usdc,
      decimals: 12,
      id: "304494718746685751324769169435167367843",
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

export const bifrost = new Parachain({
  assetsData: [
    {
      asset: dot,
      id: { Token2: 0 },
      metadataId: { Token2: 0 },
      decimals: 10,
    },
    {
      asset: usdt,
      balanceId: { Token2: 2 },
      id: 1984,
      metadataId: { Token2: 2 },
      decimals: 6,
      palletInstance: 50,
    },
  ],
  ecosystem: Ecosystem.Polkadot,
  genesisHash:
    "0x262e1b2ad728475fd6fe88e62d34c200abe6fd693931ddad144059b1eb884e5b",
  key: "bifrost",
  name: "Bifrost",
  parachainId: 2030,
  ss58Format: 6,
  ws: "wss://bifrost-polkadot-rpc.dwellir.com",
});
export const chains = [polkadex, polkadot, assetHub];

export const chainsMap = new Map<string, AnyChain>(
  chains.map((chain) => [chain.key, chain])
);
