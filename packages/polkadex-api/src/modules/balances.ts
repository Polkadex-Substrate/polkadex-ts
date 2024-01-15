import { ApiPromise } from "@polkadot/api";
import { SystemAccount } from "@polkadex/types";

import { BaseApi } from "../base-api";

export class Balances extends BaseApi {
  constructor(api: ApiPromise) {
    super(api);
  }

  public getNativeBalance(address: string): Promise<SystemAccount> {
    return this.api.query.system.account<SystemAccount>(address);
  }
}
