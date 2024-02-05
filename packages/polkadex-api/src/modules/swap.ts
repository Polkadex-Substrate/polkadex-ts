import { PalletAssetConversionPoolInfoEntries } from "@polkadex/types";

import { BaseApi } from "../base-api";

export class SwapApi extends BaseApi {
  public async queryPools(): Promise<void> {
    await this.initApi()
    const poolsMap =
      await this.api.query.assetConversion.pools.entries<PalletAssetConversionPoolInfoEntries>();
    for (const [key, value] of poolsMap.entries()) {
      console.log(key, value);
    }
  }
}
