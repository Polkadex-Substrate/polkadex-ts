import { SubmittableExtrinsic } from "@polkadot/api/promise/types";
import {
  PolkadexPrimitivesOcexAccountInfo,
  PolkadexPrimitivesAuctionAuctionInfo,
} from "@polkadex/types";
import { toPlanck, toUnit } from "@polkadex/numericals";

import { AuctionInfo } from "../types";

import { BalancesApi } from "./balances";

export class OcexApi extends BalancesApi {
  // Get proxy address linked to a main address
  public async getProxies(mainAccount: string): Promise<string[]> {
    await this.initApi();
    const info = (await this.api.query.ocex.accounts(mainAccount))?.toJSON();
    if (!info) return [];
    return (info as unknown as PolkadexPrimitivesOcexAccountInfo).proxies.map(
      (a) => a.toString()
    );
  }

  // Create a new trading/proxy account
  public async createProxyAccount(
    mainAccount: string,
    proxy: string
  ): Promise<SubmittableExtrinsic> {
    await this.initApi();
    const accounts = await this.getProxies(mainAccount);
    if (accounts.length === 0) {
      return this.api.tx.ocex.registerMainAccount(proxy);
    } else {
      return this.api.tx.ocex.addProxyAccount(proxy);
    }
  }

  // Remove a proxy account
  public async removeProxyAccount(
    proxyAddress: string
  ): Promise<SubmittableExtrinsic> {
    await this.initApi();
    return this.api.tx.ocex.removeProxyAccount(proxyAddress);
  }

  // Transfer from funding to trading account
  public async deposit(
    amount: number | string,
    asset: string
  ): Promise<SubmittableExtrinsic> {
    await this.initApi();
    // transform amount decimals into usable form
    const decimals = this.chainDecimals;
    const amt = toPlanck(amount, decimals);
    return this.api.tx.ocex.deposit(asset, amt.toFixed(0));
  }

  // Fetch current auction info
  public async auctionInfo(): Promise<AuctionInfo> {
    await this.initApi();

    const decimals = this.chainDecimals;
    const auctionInfo = (
      await this.api.query?.ocex?.auction()
    )?.toJSON() as unknown as PolkadexPrimitivesAuctionAuctionInfo;

    if (!auctionInfo) return {} as AuctionInfo;

    const feeInfo: AuctionInfo["feeInfo"] = {};
    for (const itr of Object.entries(auctionInfo.feeInfo)) {
      const amt = toUnit(itr[1], decimals);
      feeInfo[itr[0]] = amt.toNumber();
    }
    return {
      feeInfo,
      highestBid: auctionInfo.highestBid,
      highestBidder: auctionInfo.highestBidder,
    };
  }
}
