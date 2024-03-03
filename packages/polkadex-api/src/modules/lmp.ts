import { LMPEpochConfig } from "@polkadex/types";

import { BalancesApi } from "./balances";
export class LmpApi extends BalancesApi {
  public async queryAllMarkets(epoch: number): Promise<string[]> {
    const res = await this.api.query.ocex.lmpConfig<LMPEpochConfig>(epoch);
    const weights = res.market_weightage;
    const markets = Array<string>();
    // all keys of weights map gives are the markets
    for (const item of weights.entries()) {
      console.log("tradingPair", item);
    }
    return markets;
  }

  public async queryScoreAndRewards(account: string, epoch: number) {}

  public async queryClaimableEpochs(account: string): Promise<number[]> {
    return [0];
  }
}
