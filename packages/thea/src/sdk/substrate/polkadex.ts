import _ from "lodash";
import { Sdk } from "@moonbeam-network/xcm-sdk";
import { ConfigService, ConfigBuilder } from "@moonbeam-network/xcm-config";
import { AnyChain, ChainType } from "@moonbeam-network/xcm-types";
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
  getSubstrateChain,
} from "../../config";
import { AssetAmount, BaseChainAdapter, TransferConfig } from "../types";

export class Polkadex implements BaseChainAdapter {
  private readonly chain: AnyChain;
  private readonly configService;
  private readonly sdk;

  constructor() {
    const configService = new ConfigService({
      assets: assetsMap,
      chains: chainsMap,
      chainsConfig: chainsConfigMap,
    });
    this.configService = configService;
    this.chain = configService.getChain("polkadex");
    this.sdk = Sdk({ configService });
  }

  getChain(): Chain {
    return changeSubstrateToBaseChain(this.chain);
  }

  getSupportedAssets(destinationChain: Chain): Asset[] {
    const substrate_assets: Asset[] = [];

    const supportedAssets = Array.from(this.chain.assetsData.values());
    supportedAssets.forEach((asset) => {
      const destChains = this.sdk
        .assets()
        .asset(asset.asset)
        .source(this.chain).destinationChains;
      if (destChains.find((c) => c.genesisHash === destinationChain.genesis)) {
        substrate_assets.push(changeSubstrateToBaseAsset(asset));
      }
    });

    return [...substrate_assets];
  }

  getDestinationChains(): Chain[] {
    let substrateDestChains: Chain[] = [];

    const supportedAssets = this.sdk.assets().assets;

    supportedAssets.forEach((asset) => {
      const destChains = this.sdk
        .assets()
        .asset(asset)
        .source(this.chain).destinationChains;
      substrateDestChains = [
        ...substrateDestChains,
        ...destChains.map((c) => changeSubstrateToBaseChain(c)),
      ];
    });

    return [..._.uniqBy(substrateDestChains, "genesis")];
  }

  async getTransferConfig(
    destChain: Chain,
    asset: Asset,
    fromAddress: string,
    toAddress: string
  ): Promise<TransferConfig> {
    const subDestChain = getSubstrateChain(destChain);
    const subAsset = getSubstrateAsset(asset);

    if (!subDestChain || !subAsset)
      throw new Error("Invalid destination chain or asset");

    const transferConfig = await this.sdk.getTransferData({
      sourceKeyOrChain: this.chain,
      sourceAddress: fromAddress,
      destinationKeyOrChain: subDestChain,
      destinationAddress: toAddress,
      keyOrAsset: subAsset,
    });

    const min: AssetAmount = {
      ticker: transferConfig.source.min.originSymbol,
      amount: +Utils.formatUnits(
        transferConfig.source.min.amount,
        transferConfig.source.min.decimals
      ),
    };

    const max: AssetAmount = {
      ticker: transferConfig.source.max.originSymbol,
      amount: +Utils.formatUnits(
        transferConfig.source.max.amount,
        transferConfig.source.max.decimals
      ),
    };

    const sourceFee: AssetAmount = {
      ticker: transferConfig.source.fee.originSymbol,
      amount: +Utils.formatUnits(
        transferConfig.source.fee.amount,
        transferConfig.source.fee.decimals
      ),
    };

    const sourceFeeBalance: AssetAmount = {
      ticker: transferConfig.source.feeBalance.originSymbol,
      amount: +Utils.formatUnits(
        transferConfig.source.feeBalance.amount,
        transferConfig.source.feeBalance.decimals
      ),
    };

    const destinationFee: AssetAmount = {
      ticker: transferConfig.destination.fee.originSymbol,
      amount: +Utils.formatUnits(
        transferConfig.destination.fee.amount,
        transferConfig.destination.fee.decimals
      ),
    };

    const destinationFeeBalance: AssetAmount = {
      ticker: transferConfig.source.destinationFeeBalance.originSymbol,
      amount: +Utils.formatUnits(
        transferConfig.destination.balance.amount,
        transferConfig.destination.balance.decimals
      ),
    };

    return {
      sourceChain: this.getChain(),
      destinationChain: destChain,
      min,
      max,
      sourceFee,
      destinationFee,
      sourceFeeBalance,
      destinationFeeBalance,

      transfer: async <T>(amount: number): Promise<T> => {
        const api = await getPolkadotApi(this.chain.ws);
        const { source } = ConfigBuilder(this.configService)
          .assets()
          .asset(subAsset)
          .source(this.chain)
          .destination(subDestChain)
          .build();

        const destAccountId =
          subDestChain.type === ChainType.EvmParachain
            ? toAddress
            : api.createType("AccountId32", toAddress).toHex();

        const amountFormatted = BigInt(
          Utils.parseUnits(amount.toString(), asset.decimal)
        );

        const palletInstance = this.chain.getAssetPalletInstance(
          source.config.asset
        );

        const extrinsicBuilder = source.config.extrinsic?.build({
          address: destAccountId,
          amount: amountFormatted,
          asset: asset.id as string,
          destination: subDestChain,
          fee: BigInt(0),
          feeAsset: "",
          palletInstance: palletInstance,
          source: this.chain,
        });

        if (!extrinsicBuilder)
          throw new Error("Could not create extrinsic builder..");

        const call = api.tx?.[extrinsicBuilder.module]?.[extrinsicBuilder.func];

        if (!call) throw new Error("Invalid call..");

        return call(...extrinsicBuilder.getArgs()) as T;
      },
    };
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
