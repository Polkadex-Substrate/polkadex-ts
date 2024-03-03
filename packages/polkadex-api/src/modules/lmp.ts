import { LMPEpochConfig } from "@polkadex/types";
import { Option } from "@polkadot/types";

import { BalancesApi } from "./balances";
import { parseAsset } from "./helpers";

type Market = { base: string; quote: string };

type Reward = {
  marketMaking: string;
  trading: string;
  isClaimable: boolean;
};
export class LmpApi extends BalancesApi {
  public async queryAllMarkets(epoch: number): Promise<Market[]> {
    await this.initApi();
    const response =
      await this.api.query.ocex.lmpConfig<Option<LMPEpochConfig>>(epoch);
    const result = response.unwrapOrDefault();
    const markets = Array<Market>();
    const configs = result.config;
    // all keys of weights map gives are the markets
    for (const item of configs.entries()) {
      const pair = item[0];
      const { base, quote } = pair;
      markets.push({
        base: parseAsset(base.toJSON()),
        quote: parseAsset(quote.toJSON()),
      });
    }
    return markets;
  }

  public async queryScoreAndFeeForMarket(
    epoch: number,
    market: Market,
    account: string
  ): Promise<{score: string, feePaid: string}> {

  }

  public async getEligibleRewards(
    epoch: number,
    market: Market,
    account: string
  ): Promise<Reward> {}

  public async queryClaimableEpochs(account: string): Promise<number[]> {
    console.log(`${account} logged`);
    return [0];
  }
}
