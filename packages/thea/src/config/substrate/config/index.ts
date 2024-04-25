import { ChainConfig } from "@moonbeam-network/xcm-config";

import { assetHubConfig } from "./assetHub";
import { polkadexConfig } from "./polkadex";

export const chainsConfig: ChainConfig[] = [assetHubConfig, polkadexConfig];

export const chainsConfigMap = new Map<string, ChainConfig>(
  chainsConfig.map((config) => [config.chain.key, config])
);
