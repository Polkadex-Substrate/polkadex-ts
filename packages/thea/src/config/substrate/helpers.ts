import { AnyChain, ChainAssetsData } from "@moonbeam-network/xcm-types";

import { Asset, ChainType, Chain } from "../types";

import { substrateAssets, substrateChains } from ".";

export const changeSubstrateToBaseChain = (chain: AnyChain): Chain => ({
  genesis: chain.genesisHash,
  logo: chain.name,
  name: chain.name,
  type: ChainType.Substrate,
  isTestnet: chain.isTestChain,
});

export const changeSubstrateToBaseAsset = (asset: ChainAssetsData): Asset => ({
  decimal: asset.decimals || 12,
  id: asset.id as string,
  logo: asset.asset.originSymbol,
  ticker: asset.asset.originSymbol,
});

export const getSubstrateChain = (chain: Chain) => {
  const substrateChain = substrateChains.find(
    (c) => c.genesisHash === chain.genesis
  );
  return substrateChain;
};

export const getSubstrateAsset = (asset: Asset) => {
  const substrateAsset = substrateAssets.find(
    (a) => a.originSymbol === asset.ticker
  );
  return substrateAsset;
};
