import { ChainConfig } from "@moonbeam-network/xcm-config";

import { assetHubConfig } from "./assetHub";
import { polkadexConfig } from "./polkadex";
import { polkadotConfig } from "./polkadot";
import { astarConfig } from "./astar";
import { phalaConfig } from "./phala";
import { moonbeamConfig } from "./moonbeam";

export const chainsConfig: ChainConfig[] = [
  assetHubConfig,
  polkadexConfig,
  polkadotConfig,
  astarConfig,
  phalaConfig,
  moonbeamConfig,
];

export const chainsConfigMap = new Map<string, ChainConfig>(
  chainsConfig.map((config) => [config.chain.key, config])
);
