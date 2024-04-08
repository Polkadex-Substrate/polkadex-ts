import { SystemAccount } from "@polkadex/types";
import { toPlanck, toUnit } from "@polkadex/numericals";
import { SubmittableExtrinsic } from "@polkadot/api/promise/types";

import { AssetsApi } from "./assets";

export class BalancesApi extends AssetsApi {
  public async getNativeBalance(address: string): Promise<number> {
    await this.initApi();
    const result = await this.api.query.system.account<SystemAccount>(address);
    return toUnit(result.data.free.toString(), this.chainDecimals).toNumber();
  }

  public async transfer(
    amount: string,
    destination: string,
    asset?: string
  ): Promise<SubmittableExtrinsic> {
    await this.initApi();

    const decimals = this.chainDecimals;
    const amountFormatted = toPlanck(amount, decimals).toString();

    const tx = asset
      ? this.api.tx.assets.transfer(asset, destination, amountFormatted)
      : this.api.tx.balances.transfer(destination, amountFormatted);

    return tx;
  }
}
