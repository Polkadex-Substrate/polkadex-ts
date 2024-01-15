import { SubmittableExtrinsic } from "@polkadot/api/promise/types";
import { PolkadexPrimitivesOcexAccountInfo } from "@polkadex/types";
import { toPlank } from "@polkadex/numericals";

import { BaseApi } from "../base-api";

export class Ocex extends BaseApi {
  public async getProxies(mainAccount: string): Promise<string[]> {
    const info =
      await this.api.query.ocex.accounts<PolkadexPrimitivesOcexAccountInfo>(
        mainAccount
      );
    return info.proxies.toArray().map((a) => a.toString());
  }

  public async createProxyAccount(
    mainAccount: string,
    proxy: string
  ): Promise<SubmittableExtrinsic> {
    const accounts = await this.getProxies(mainAccount);
    if (accounts.length === 0) {
      return this.api.tx.ocex.registerMainAccount(proxy);
    } else {
      return this.api.tx.ocex.addProxyAccount(proxy);
    }
  }

  public async deposit(
    amount: number | string,
    asset: string
  ): Promise<SubmittableExtrinsic> {
    // transform amount decimals into usable form
    const decimals = this.chainDecimals;
    const amt = toPlank(amount, decimals);
    return this.api.tx.ocex.deposit(amt.toFixed(0), asset);
  }
}
