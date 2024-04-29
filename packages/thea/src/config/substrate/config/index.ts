import { ChainConfig } from "@moonbeam-network/xcm-config";

import { assetHubConfig } from "./assetHub";
import { polkadexConfig } from "./polkadex";
import { polkadotConfig } from "./polkadot";
import { astarConfig } from "./astar";

export const chainsConfig: ChainConfig[] = [
  assetHubConfig,
  polkadexConfig,
  polkadotConfig,
  astarConfig,
];

export const chainsConfigMap = new Map<string, ChainConfig>(
  chainsConfig.map((config) => [config.chain.key, config])
);
