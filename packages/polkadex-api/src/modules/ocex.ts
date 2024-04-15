import { SubmittableExtrinsic } from "@polkadot/api/promise/types";
import { PolkadexPrimitivesOcexAccountInfo } from "@polkadex/types";
import { toPlanck } from "@polkadex/numericals";

import { BalancesApi } from "./balances";

export class OcexApi extends BalancesApi {
  // Get proxy address linked to a main address
  public async getProxies(mainAccount: string): Promise<string[]> {
    await this.initApi();
    const info = (await this.api.query.ocex.accounts(mainAccount))?.toJSON();
    if (!info) return [];
    return (info as unknown as PolkadexPrimitivesOcexAccountInfo).proxies.map(
      (a) => a.toString()
    );
  }

  // Create a new trading/proxy account
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

  // Remove a proxy account
  public async removeProxyAccount(
    proxyAddress: string
  ): Promise<SubmittableExtrinsic> {
    await this.initApi();
    return this.api.tx.ocex.removeProxyAccount(proxyAddress);
  }

  // Transfer from funding to trading account
  public async deposit(
    amount: number | string,
    asset: string
  ): Promise<SubmittableExtrinsic> {
    await this.initApi();
    // transform amount decimals into usable form
    const decimals = this.chainDecimals;
    const amt = toPlanck(amount, decimals);
    return this.api.tx.ocex.deposit(asset, amt.toFixed(0));
  }
}
