import { SubmittableExtrinsic } from "@polkadot/api/promise/types";
import { PolkadexPrimitivesOcexAccountInfo } from "@polkadex/types";
import { toPlanck } from "@polkadex/numericals";

import { BalancesApi } from "./balances";

export class OcexApi extends BalancesApi {
  public async getProxies(mainAccount: string): Promise<string[]> {
    await this.initApi();
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
    await this.initApi();
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
    await this.initApi();
    // transform amount decimals into usable form
    const decimals = this.chainDecimals;
    const amt = toPlanck(amount, decimals);
    return this.api.tx.ocex.deposit(amt.toFixed(0), asset);
  }
}
