import { LMPEpochConfig } from "@polkadex/types";
import { Bool, Option, u16, u32, Vec } from "@polkadot/types";
import { AccountId, Extrinsic } from "@polkadot/types/interfaces";

import { BalancesApi } from "./balances";
import { parseAsset } from "./helpers";
import { TIME_INTERVALS } from "./constants";

type Market = { base: string; quote: string };

type EligibleRewards = {
  marketMaking: number;
  trading: number;
  isClaimable: boolean;
};
export class LmpApi extends BalancesApi {
  /**
   * @summary gets the current epoch
   */
  public async queryCurrentEpoch(): Promise<number> {
    await this.initApi();
    const response = await this.api.query.ocex.lmpEpoch<u16>();
    return response.toNumber();
  }

  /**
   * @summary get number of blocks to start of next epoch
   */
  public async blocksToNextEpoch(): Promise<number> {
    await this.initApi();
    const currBlock = await this.getLatestBlockNumber();
    const startBlock = Math.floor(currBlock / TIME_INTERVALS.blocksInEpoch);
    return startBlock + TIME_INTERVALS.blocksInEpoch;
  }

  /**
   * @summary get block number in which you can claim rewards for an epoch
   */
  public async getClaimBlock(epoch: number): Promise<number> {
    await this.initApi();
    const response = await this.api.query.ocex.lmpClaimBlk<Option<u32>>(epoch);
    return response.unwrapOrDefault().toNumber();
  }

  /**
   * @summary gets all lmp enabled markets for a given epoch
   */
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

  /**
   * @summary gets top accounts for a given market and epoch
   */
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

  /**
   * @summary gets eligible rewards for an account given market and epoch
   * @description returns the marketMaking and trading rewards in PDEX,
   * also returns if these rewards are claimable
   */
  public async getEligibleRewards(
    epoch: number,
    market: string,
    account: string
  ): Promise<EligibleRewards> {
    await this.initApi();
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const resp = await this.api.rpc.lmp.eligibleRewards<[string, string, Bool]>(
      epoch,
      market,
      account
    );
    const res = resp.toJSON();
    return {
      marketMaking: Number(res[0]), // market making rewards in PDEX
      trading: Number(res[1]), // trading rewards in PDEX
      isClaimable: Boolean(res[2]),
    };
  }

  /**
   * @summary gets claimable epochs for an account given market and epoch
   */
  public async listClaimableEpochs(
    market: string,
    account: string,
    untilEpoch: number
  ): Promise<number[]> {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const resp: Vec<u16> = await this.api.rpc.lmp.listClaimableEpochs<Vec<u16>>(
      market,
      account,
      untilEpoch
    );
    return resp.map((item) => item.toNumber());
  }

  /**
   * @summary trading fee paid by an account given market and epoch
   * in quote asset of that market
   */
  public async getFeePaidByUserPerEpoch(
    epoch: number,
    market: string,
    account: string
  ): Promise<number> {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const resp = await this.api.rpc.lmp.feesPaidByUserPerEpoch(
      epoch,
      market,
      account
    );
    return Number(resp.toString());
  }

  /**
   * @summary volume generated by an account given market and epoch
   * in quote asset of that market
   */
  public async getVolumeGeneratedByUserPerEpoch(
    epoch: number,
    market: string,
    account: string
  ): Promise<number> {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const resp = await this.api.rpc.lmp.volumeGeneratedByUserPerEpoch(
      epoch,
      market,
      account
    );

    return Number(resp.toString());
  }

  /**
   * @summary claim rewards for an epoch and market
   */
  public async claimRewardsTx(
    epoch: number,
    market: string
  ): Promise<Extrinsic> {
    await this.initApi();
    return this.api.tx.lmp.claimLmpRewards(epoch, market);
  }

  /**
   * @summary get total score and fee for a market in an epoch
   */
  public async getScoreAndFeeForMarket(
    epoch: number,
    market: string
  ): Promise<{ score: number; totalFee: number }> {
    await this.initApi();
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const resp = await this.api.rpc.lmp.totalScore<[string, string]>(
      epoch,
      market
    );
    return {
      score: Number(resp[0]),
      totalFee: Number(resp[1]),
    };
  }

  /**
   * @summary get trader metrics (market making score and tradingScore)
   * for an account in a market for an epoch
   */
  public async getTraderMetrics(
    epoch: number,
    market: string,
    account: string
  ): Promise<{ mmScore: number; tradingScore: number }> {
    await this.initApi();
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const resp = await this.api.rpc.lmp.traderMetrics<[string, string, Bool]>(
      epoch,
      market,
      account
    );
    return {
      mmScore: Number(resp[0]),
      tradingScore: Number(resp[1]),
    };
  }
}
