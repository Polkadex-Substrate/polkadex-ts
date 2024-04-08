import {
  ChainConfig,
  ConfigService,
  ConfigBuilder,
} from "@moonbeam-network/xcm-config";

import { assetsMap } from "../assets";
import { chainsMap } from "../chains";

import { assetHubConfig } from "./assetHub";
import { polkadexConfig } from "./polkadex";

const polkadotChainsConfig: ChainConfig[] = [assetHubConfig, polkadexConfig];

export const chainsConfig: ChainConfig[] = [...polkadotChainsConfig];

export const chainsConfigMap = new Map<string, ChainConfig>(
  chainsConfig.map((config) => [config.chain.key, config])
);

export const configService = new ConfigService({
  assets: assetsMap,
  chains: chainsMap,
  chainsConfig: chainsConfigMap,
});

export const configBuilder = ConfigBuilder(configService);
