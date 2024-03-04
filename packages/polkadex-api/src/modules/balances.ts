import { SystemAccount } from "@polkadex/types";
import { toUnit } from "@polkadex/numericals";

import { AssetsApi } from "./assets";

export class BalancesApi extends AssetsApi {
  public async getNativeBalance(address: string): Promise<number> {
    await this.initApi();
    const result = await this.api.query.system.account<SystemAccount>(address);
    return toUnit(result.data.free.toString(), this.chainDecimals).toNumber();
  }
}
