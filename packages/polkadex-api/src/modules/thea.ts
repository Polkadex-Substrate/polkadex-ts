import { toPlanck } from "@polkadex/numericals";
import { SubmittableExtrinsic } from "@polkadot/api/promise/types";

import { SwapApi } from "./swap";

export class TheaApi extends SwapApi {
  public async parachainWithdraw(
    to: string,
    assetId: string,
    amount: number,
    payForRemaining = true,
    payWithTokens = false
  ): Promise<SubmittableExtrinsic> {
    const amountFormatted = toPlanck(amount, this.chainDecimals).toFixed();
    const call = this.api.tx.theaExecutor.parachainWithdraw(
      assetId,
      amountFormatted,
      to,
      payForRemaining,
      payWithTokens
    );
    return call;
  }

  public async evmWithdraw(
    to: string,
    assetId: string,
    amount: number,
    network: number,
    payForRemaining = true,
    payWithTokens = false
  ): Promise<SubmittableExtrinsic> {
    const amountFormatted = toPlanck(amount, this.chainDecimals).toFixed();
    const call = this.api.tx.theaExecutor.evmWithdraw(
      assetId,
      amountFormatted,
      to,
      network,
      payForRemaining,
      payWithTokens
    );
    return call;
  }
}
