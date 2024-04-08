import { SubmittableExtrinsic } from "@polkadot/api/promise/types";
import { Parachain } from "@moonbeam-network/xcm-types";
import { ApiPromise } from "@polkadot/api";
import Utils from "@polkadot/util";

import { assetHub, chains } from "../chains";
import { ForeignChain } from "../../types";
import { chainsConfigMap, configBuilder, configService } from "../config";

export class AssetHub implements ForeignChain<SubmittableExtrinsic> {
  private readonly genesis = assetHub.genesisHash;
  private readonly chainConfig: Parachain;
  private readonly api: ApiPromise;

  constructor(api: ApiPromise) {
    const chain = chains.find((chain) => chain.genesisHash === this.genesis);
    if (!chain) {
      throw new Error("AssetHub chain not found");
    } else {
      this.chainConfig = chain;
      this.api = api;
    }
  }

  async getBalance(address: string, assetId: string): Promise<number> {
    const asset = configService.getAsset(assetId);
    const assetDecimal = this.chainConfig.getAssetDecimals(asset);

    const { source } = configBuilder
      .assets()
      .asset(asset)
      .source(this.chainConfig)
      .destination(this.chainConfig)
      .build();

    chainsConfigMap.get(this.chainConfig.key)?.getAssetConfigs(asset);

    const balanceBuilder = source.config.balance.build({
      address,
      asset: assetId,
    });

    const balance = await this.api.query?.[balanceBuilder.module]?.[
      balanceBuilder.func
    ]?.(...balanceBuilder.args);

    if (!balance) {
      throw new Error("Invalid query to read balance");
    }

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    if (balance.isSome) {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      const raw = balance.toJSON()?.balance;
      return Number(Utils.formatBalance(raw, { decimals: assetDecimal }));
    } else return 0;

    console.log(balance.toJSON());

    return 0;
  }
}
