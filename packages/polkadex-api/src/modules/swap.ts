import { cleanNumberLike } from "@polkadex/numericals";

import { BaseApi } from "../base-api";

export type SwapPool = {
  base: string;
  quote: string;
  lpToken: string;
};
export class SwapApi extends BaseApi {
  public async queryPools(): Promise<SwapPool[]> {
    await this.initApi();
    const poolsMap = await this.api.query.assetConversion.pools.entries();
    const promises = poolsMap.map(async ([key, value]) => {
      const poolKeys = key.args.map((i) => i.toJSON());
      const pair = poolKeys[0] as Record<string, null>[];
      const base = this.parseAsset(pair[0]);
      const quote = this.parseAsset(pair[1]);
      const valueJson: { lpToken: string } = value.toJSON();
      return {
        base,
        quote,
        lpToken: cleanNumberLike(valueJson.lpToken).toString(),
      };
    });
    return await Promise.all(promises);
  }

  parseAsset(asset: unknown): string {
    if (typeof asset !== "object") {
      throw new Error(`cannot parse asset ${asset}`);
    }
    if (!!asset && "polkadex" in asset) {
      return "polkadex";
    }

    if (!!asset && "asset" in asset) {
      return cleanNumberLike(asset.asset as string).toFixed();
    }
    console.log(typeof asset);
    throw new Error(`cannot parse asset ${asset}`);
  }
}
