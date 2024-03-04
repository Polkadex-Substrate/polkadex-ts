import { LMPEpochConfig } from "@polkadex/types";
import { Option, Vec } from "@polkadot/types";
import { AccountId } from "@polkadot/types/interfaces";

import { BalancesApi } from "./balances";
import { parseAsset } from "./helpers";

type Market = { base: string; quote: string };

type EligibleRewards = {
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

  public async getTopAccounts(
    epoch: number,
    market: string,
    limit = 10,
    sortedByMM = false
  ): Promise<string[]> {
    await this.initApi();
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const res = await this.api.rpc.lmp.accountsSorted<Vec<AccountId>>(
      epoch,
      market,
      sortedByMM,
      limit
    );
    const result = res.toJSON();
    return result as string[];
  }

  public async getEligibleRewards(
    epoch: number,
    market: string,
    account: string
  ): Promise<EligibleRewards> {
    await this.initApi();
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const resp = await this.api.rpc.lmp.eligibleRewards<
      [string, string, boolean]
    >(epoch, market, account);
    const res = resp.toJSON();
    return {
      marketMaking: res[0],
      trading: res[1],
      isClaimable: Boolean(res[2]),
    };
  }

  public async queryClaimableEpochs(account: string): Promise<number[]> {
    console.log(`${account} logged`);
    return [0];
  }
}
