import { Parachain, Ecosystem, AnyChain } from "@moonbeam-network/xcm-types";
import {
  dot,
  polkadot,
  polkadotAssetHub,
  usdc,
  usdt,
} from "@moonbeam-network/xcm-config";

import { pdex } from "./assets";

export { polkadot, polkadotAssetHub };

export const assetHub = new Parachain({
  type: undefined,
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
  type: undefined,
  assetsData: [
    {
      asset: usdt,
      decimals: 12,
      id: "95930534000017180603917534864279132680",
      palletInstance: 50,
    },
    {
      asset: pdex,
      decimals: 12,
      id: 0,
    },
  ],
  ecosystem: Ecosystem.Polkadot,
  genesisHash:
    "0x72f3bba34b1ecd532bccbed46701ad37c4ef329bfe86b7cf014ac06cb92ed47d",
  key: "polkadex",
  name: "Polkadex",
  parachainId: 2040,
  ss58Format: 89,
  ws: "wss://moonbeam-rpc.dwellir.com",
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
