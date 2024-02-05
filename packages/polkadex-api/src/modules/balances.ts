import { SystemAccount } from "@polkadex/types";

import { BaseApi } from "../base-api";

export class BalancesApi extends BaseApi {
  public async getNativeBalance(address: string): Promise<SystemAccount> {
    await this.initApi()
    return this.api.query.system.account<SystemAccount>(address);
  }
}
