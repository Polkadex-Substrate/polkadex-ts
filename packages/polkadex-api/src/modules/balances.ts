import { SystemAccount } from "@polkadex/types";

import { BaseApi } from "../base-api";

export class Balances extends BaseApi {
  public getNativeBalance(address: string): Promise<SystemAccount> {
    return this.api.query.system.account<SystemAccount>(address);
  }
}
