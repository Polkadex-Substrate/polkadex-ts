import { Sdk } from "@moonbeam-network/xcm-sdk";
import { ConfigService } from "@moonbeam-network/xcm-config";
import { AnyChain } from "@moonbeam-network/xcm-types";
import { getPolkadotApi } from "@moonbeam-network/xcm-utils";
import Utils from "@polkadex/utils";

import {
  Asset,
  Chain,
  chainsConfigMap,
  changeSubstrateToBaseChain,
  changeSubstrateToBaseAsset,
  assetsMap,
  chainsMap,
  getSubstrateAsset,
} from "../../config";
import { AssetAmount, BaseChainAdapter, TransferConfig } from "../types";

export class Polkadex implements BaseChainAdapter {
  private readonly chain: AnyChain;
  private readonly sdk;

  constructor() {
    const configService = new ConfigService({
      assets: assetsMap,
      chains: chainsMap,
      chainsConfig: chainsConfigMap,
    });
    this.chain = configService.getChain("polkadex");
    this.sdk = Sdk({ configService });
  }

  getChain(): Chain {
    return changeSubstrateToBaseChain(this.chain);
  }

  getSupportedAssets(): Asset[] {
    const substrate_assets = Array.from(this.chain.assetsData.values()).map(
      (a) => changeSubstrateToBaseAsset(a)
    );
    return [...substrate_assets];
  }

  getDestinationChains(asset: Asset): Chain[] {
    // Find for substrate ecosystem
    let substrateDestChains: Chain[] = [];
    const substrateAsset = getSubstrateAsset(asset);
    if (substrateAsset) {
      const destChains = this.sdk
        .assets()
        .asset(substrateAsset)
        .source(this.chain).destinationChains;
      substrateDestChains = destChains.map((c) =>
        changeSubstrateToBaseChain(c)
      );
    }
    return [...substrateDestChains];
  }

  getTransferConfig(
    destChain: Chain,
    assetId: Asset,
    fromAddress: string,
    toAddress: string
  ): Promise<TransferConfig> {
    // THEA withdrawal logic goes here
    throw new Error("Method not implemented.");
  }

  async getBalances(address: string, assets: Asset[]): Promise<AssetAmount[]> {
    const api = await getPolkadotApi(this.chain.ws);

    const balances = assets.map(async (a): Promise<AssetAmount> => {
      let amount = 0;

      // Native asset
      if (!a.id) {
        const native = await api.query.system.account(address);
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        const raw = BigInt(native.toJSON()?.data?.free || "0");
        amount = Number(Utils.formatUnits(raw, a.decimal));
      } else {
        // Non-native asset
        const nonNative = await api.query.assets.account(a.id, address);
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        if (nonNative.isSome) {
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          const raw = nonNative.toJSON()?.balance;
          amount = Number(Utils.formatUnits(raw, a.decimal));
        }
      }

      return {
        amount,
        ticker: a.ticker,
      };
    });

    return Promise.all(balances);
  }
}
