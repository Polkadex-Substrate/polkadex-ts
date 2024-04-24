import { ConfigService } from "@moonbeam-network/xcm-config";
import { Sdk } from "@moonbeam-network/xcm-sdk";

import { changeSubstrateToBaseChain } from "./substrate/helpers";
import { Chain, ITheaConfig } from "./types";
import {
  chainsConfigMap,
  assetsMap,
  chainsMap,
  substrateChains,
} from "./substrate";
import { evmChains } from "./evm";

export class Thea implements ITheaConfig {
  private sdk;

  constructor() {
    const configService = new ConfigService({
      assets: assetsMap,
      chains: chainsMap,
      chainsConfig: chainsConfigMap,
    });
    this.sdk = Sdk({ configService });
  }

  getAllChains(): Chain[] {
    const processedSubstrateChains = substrateChains.map((chain) => {
      return changeSubstrateToBaseChain(chain);
    });

    return [...processedSubstrateChains, ...evmChains];
  }

  // getSupportedAssets(srcChain: Chain): Asset[] {
  //   // Find for substrate ecosystem
  //   let substrate_assets: Asset[] = [];

  //   const substrateChain = substrateChains.find(
  //     (chain) => chain.genesisHash === srcChain.genesis
  //   );

  //   if (substrateChain) {
  //     substrate_assets = Array.from(substrateChain.assetsData.values()).map(
  //       (a) => changeSubstrateToBaseAsset(a)
  //     );
  //   }

  //   // Find for ethereum ecosystem

  //   return [...substrate_assets];
  // }

  // getCrossChainSupportedAssets(srcChain: Chain, destChain: Chain): Asset[] {
  //   // const chain = substrateChains.find(
  //   //   (chain) => chain.genesisHash === srcChain.genesis
  //   // );

  //   // if (!chain) return [];

  //   // // Check if valid destChain
  //   // const destChain1 = substrateChains.find(
  //   //   (chain) => chain.genesisHash === destChain.genesis
  //   // );
  //   // const supported_assets = Array.from(this.chain.assetsData.values());

  //   // ----- Some logic here

  //   return [];
  // }

  // getDestinationChains(srcChain: Chain, asset: Asset): Chain[] {
  //   let substrateDestChains: Chain[] = [];

  //   // Find for substrate ecosystem
  //   const substrateChain = this.getSubstrateChain(srcChain);
  //   const substrateAsset = this.getSubstrateAsset(asset);
  //   if (substrateAsset && substrateChain) {
  //     const destChains = this.sdk
  //       .assets()
  //       .asset(substrateAsset)
  //       .source(substrateChain).destinationChains;
  //     substrateDestChains = destChains.map((c) =>
  //       changeSubstrateToBaseChain(c)
  //     );
  //   }

  //   return [...substrateDestChains];
  // }

  // private getSubstrateChain(chain: Chain) {
  //   const substrateChain = substrateChains.find(
  //     (c) => c.genesisHash === chain.genesis
  //   );
  //   return substrateChain;
  // }

  // private getSubstrateAsset(asset: Asset) {
  //   const substrateAsset = substrateAssets.find(
  //     (a) => a.originSymbol === asset.ticker
  //   );
  //   return substrateAsset;
  // }
}
