import { AnyJson } from "@polkadex/utils";
import { Option, StorageKey } from "@polkadot/types";
import { rmCommas, toUnit } from "@polkadex/numericals";
import { PalletAssetsAssetAccount } from "@polkadex/types";

import { BaseApi } from "../base-api";

type Asset = {
  id: string;
  name: string;
  ticker: string;
  decimals: number;
};
export class AssetsApi extends BaseApi {
  public async queryAllAssets(): Promise<Asset[]> {
    const [metadata] = await Promise.all([
      this.api.query.assets.metadata.entries(),
    ]);
    const result: Asset[] = [];
    for (const [key, codec] of metadata) {
      const decoded = codec.toHuman() as {
        decimals?: number;
        symbol?: string;
        name?: string;
      };
      result.push({
        decimals: Number(decoded?.decimals ?? 12),
        name: decoded?.name?.toUpperCase() ?? "UNKNOWN",
        ticker: decoded?.symbol?.toUpperCase() ?? "UNKNOWN",
        id: this.convertStorageKeyToAssetId(key),
      });
    }
    return result;
  }

  public async queryBalance(account: string, assetId: string): Promise<number> {
    const balances = await this.api.query.assets.account<
      Option<PalletAssetsAssetAccount>
    >(assetId, account);
    const balance = balances.unwrapOrDefault();
    return toUnit(balance.balance.toString(), this.chainDecimals).toNumber();
  }

  convertStorageKeyToAssetId(key: StorageKey<AnyJson>): string {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    return rmCommas(key.toHuman()[0]);
  }
}
