import {
  Parachain,
  EvmParachain,
  Ecosystem,
  AnyChain,
} from "@moonbeam-network/xcm-types";
import { ASSETS_MAP } from "@polkadex/polkadex-api";

import {
  ASSETHUB_GENESIS,
  ASTAR_GENESIS,
  BIFROST_GENESIS,
  INTERLAY_GENESIS,
  MOONBEAM_GENESIS,
  PHALA_GENESIS,
  POLKADEX_GENESIS,
  POLKADOT_GENESIS,
  UNIQUE_GENESIS,
} from "../genesis";

import {
  pdex,
  dot,
  usdt,
  usdc,
  ded,
  pink,
  astr,
  pha,
  glmr,
  unq,
  intr,
  ibtc,
  bnc,
  vdot,
} from "./assets";

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

export const astar = new Parachain({
  assetsData: [
    {
      asset: astr,
      decimals: 18,
    },
    {
      asset: dot,
      decimals: 10,
      id: "340282366920938463463374607431768211455",
    },
    {
      asset: glmr,
      decimals: 18,
      id: "18446744073709551619",
    },
    {
      asset: unq,
      decimals: 18,
      id: "18446744073709551631",
    },
    {
      asset: pha,
      decimals: 12,
      id: "18446744073709551622",
    },
    {
      asset: ibtc,
      decimals: 8,
      id: "18446744073709551620",
    },
    {
      asset: bnc,
      decimals: 12,
      id: "18446744073709551623",
    },
    {
      asset: vdot,
      decimals: 10,
      id: "18446744073709551624",
    },
  ],
  ecosystem: Ecosystem.Polkadot,
  genesisHash: ASTAR_GENESIS,
  key: "astar",
  name: "Astar",
  parachainId: 2006,
  ss58Format: 5,
  ws: "wss://astar-rpc.dwellir.com",
});

export const phala = new Parachain({
  assetsData: [
    {
      asset: pha,
      decimals: 12,
    },
  ],
  ecosystem: Ecosystem.Polkadot,
  genesisHash: PHALA_GENESIS,
  key: "phala",
  name: "Phala",
  parachainId: 2035,
  ss58Format: 30,
  ws: "wss://phala.api.onfinality.io/public-ws",
});

export const unique = new Parachain({
  assetsData: [
    {
      asset: unq,
      decimals: 18,
    },
  ],
  ecosystem: Ecosystem.Polkadot,
  genesisHash: UNIQUE_GENESIS,
  key: "unique",
  name: "Unique",
  parachainId: 2037,
  ss58Format: 7391,
  ws: "wss://unique-rpc.dwellir.com",
});

export const interlay = new Parachain({
  assetsData: [
    {
      asset: intr,
      decimals: 10,
      id: { Token: intr.originSymbol },
      metadataId: 0,
    },
    {
      asset: dot,
      decimals: 10,
      id: { Token: dot.originSymbol },
      metadataId: 0,
    },
    {
      asset: glmr,
      decimals: 18,
      id: { ForeignAsset: 10 },
      metadataId: 0,
    },
    {
      asset: ibtc,
      decimals: 8,
      id: { Token: ibtc.originSymbol },
      metadataId: 0,
    },
    {
      asset: bnc,
      decimals: 12,
      id: { ForeignAsset: 11 },
    },
    {
      asset: vdot,
      decimals: 10,
      id: { ForeignAsset: 3 },
    },
  ],
  ecosystem: Ecosystem.Polkadot,
  genesisHash: INTERLAY_GENESIS,
  key: "interlay",
  name: "Interlay",
  parachainId: 2032,
  ss58Format: 2032,
  ws: "wss://interlay-rpc.dwellir.com",
});

export const moonbeam = new EvmParachain({
  assetsData: [
    {
      asset: glmr,
      decimals: 18,
    },
    {
      asset: pdex,
      decimals: 12,
      id: "90225766094594282577230355136633846906",
    },
  ],
  ecosystem: Ecosystem.Polkadot,
  genesisHash: MOONBEAM_GENESIS,
  key: "moonbeam",
  name: "Moonbeam",
  id: 1284,
  rpc: "https://rpc.api.moonbeam.network",
  parachainId: 2004,
  ss58Format: 1284,
  ws: "wss://moonbeam-rpc.dwellir.com",
  nativeCurrency: { decimals: 18, name: "GLMR", symbol: "GLMR" },
});

export const bifrost = new Parachain({
  assetsData: [
    {
      asset: bnc,
      decimals: 12,
      id: { Native: bnc.originSymbol },
    },
    {
      asset: vdot,
      id: { VToken2: 0 },
      metadataId: { VToken2: 0 },
      decimals: 10,
    },
    {
      asset: astr,
      id: { Token2: 3 },
      metadataId: { Token2: 3 },
      decimals: 18,
    },
  ],
  ecosystem: Ecosystem.Polkadot,
  genesisHash: BIFROST_GENESIS,
  key: "bifrost",
  name: "Bifrost",
  parachainId: 2030,
  ss58Format: 6,
  ws: "wss://bifrost-polkadot-rpc.dwellir.com",
});

export const polkadex = new Parachain({
  assetsData: [
    {
      asset: pdex,
      decimals: 12,
    },
    {
      asset: dot,
      decimals: ASSETS_MAP.get("DOT")?.decimal,
      id: ASSETS_MAP.get("DOT")?.id,
    },
    {
      asset: usdt,
      decimals: ASSETS_MAP.get("USDT")?.decimal,
      id: ASSETS_MAP.get("USDT")?.id,
    },
    {
      asset: usdc,
      decimals: ASSETS_MAP.get("USDC")?.decimal,
      id: ASSETS_MAP.get("USDC")?.id,
    },
    {
      asset: ded,
      decimals: ASSETS_MAP.get("DED")?.decimal,
      id: ASSETS_MAP.get("DED")?.id,
    },
    {
      asset: pink,
      decimals: ASSETS_MAP.get("PINK")?.decimal,
      id: ASSETS_MAP.get("PINK")?.id,
    },
    {
      asset: astr,
      decimals: ASSETS_MAP.get("ASTR")?.decimal,
      id: ASSETS_MAP.get("ASTR")?.id,
    },
    {
      asset: pha,
      decimals: ASSETS_MAP.get("PHA")?.decimal,
      id: ASSETS_MAP.get("PHA")?.id,
    },
    {
      asset: glmr,
      decimals: ASSETS_MAP.get("GLMR")?.decimal,
      id: ASSETS_MAP.get("GLMR")?.id,
    },
    {
      asset: unq,
      decimals: ASSETS_MAP.get("UNQ")?.decimal,
      id: ASSETS_MAP.get("UNQ")?.id,
    },
    {
      asset: ibtc,
      decimals: ASSETS_MAP.get("IBTC")?.decimal,
      id: ASSETS_MAP.get("IBTC")?.id,
    },
    {
      asset: bnc,
      decimals: ASSETS_MAP.get("BNC")?.decimal,
      id: ASSETS_MAP.get("BNC")?.id,
    },
    {
      asset: vdot,
      decimals: ASSETS_MAP.get("VDOT")?.decimal,
      id: ASSETS_MAP.get("VDOT")?.id,
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

export const substrateChains = [
  polkadex,
  assetHub,
  polkadot,
  astar,
  phala,
  moonbeam,
  unique,
  interlay,
  bifrost,
];

export const chainsMap = new Map<string, AnyChain>(
  substrateChains.map((chain) => [chain.key, chain])
);
