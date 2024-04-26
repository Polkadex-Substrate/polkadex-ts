import { ChainConfig } from "@moonbeam-network/xcm-config";

import { assetHubConfig } from "./assetHub";
import { polkadexConfig } from "./polkadex";
import { polkadotConfig } from "./polkadot";

export const chainsConfig: ChainConfig[] = [
  assetHubConfig,
  polkadexConfig,
  polkadotConfig,
];

export const chainsConfigMap = new Map<string, ChainConfig>(
  chainsConfig.map((config) => [config.chain.key, config])
);
