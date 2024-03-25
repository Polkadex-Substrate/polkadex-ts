import { SubmittableExtrinsic } from "@polkadot/api/promise/types";
import { cleanNumberLike, toPlanck, toUnit } from "@polkadex/numericals";
import { Option, u128 } from "@polkadot/types";

import { BaseApi } from "../base-api";

import { assetIdEnumFromString, parseAsset } from "./helpers";

export type SwapPool = {
  base: string;
  quote: string;
  lpToken: string;
};
export class SwapApi extends BaseApi {
  public async queryPools(): Promise<SwapPool[]> {
    await this.initApi();
    const poolsMap = await this.api.query.assetConversion.pools.entries();
    const promises = poolsMap.map(async ([key, value]) => {
      const poolKeys = key.args.map((i) => i.toJSON());
      const pair = poolKeys[0] as Record<string, null>[];
      const base = parseAsset(pair[0]);
      const quote = parseAsset(pair[1]);
      const valueJson = value.toJSON() as { lpToken: string };
      return {
        base,
        quote,
        lpToken: cleanNumberLike(valueJson.lpToken).toString(),
      };
    });
    return await Promise.all(promises);
  }

  public async quotePriceExactTokensForTokens(
    base: string,
    quote: string,
    amount: number,
    includeFee = false
  ): Promise<number> {
    await this.initApi();
    if (base.toUpperCase() === "POLKADEX") base = "PDEX";
    if (quote.toUpperCase() === "POLKADEX") quote = "PDEX";
    const amt = Number(toPlanck(amount, this.chainDecimals).toFixed());
    const result: Option<u128> =
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      await this.api.rpc.tx.quotePriceExactTokensForTokens<Option<u128>>(
        base,
        quote,
        amt,
        includeFee
      );
    return toUnit(result.unwrap().toString(), this.chainDecimals).toNumber();
  }

  public async quotePriceTokensForExactTokens(
    base: string,
    quote: string,
    amount: number,
    includeFee = false
  ): Promise<number> {
    await this.initApi();
    if (base.toUpperCase() === "POLKADEX") base = "PDEX";
    if (quote.toUpperCase() === "POLKADEX") quote = "PDEX";
    const amt = toPlanck(amount, this.chainDecimals).toFixed();
    const result: Option<u128> =
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      await this.api.rpc.tx.quotePriceTokensForExactTokens(
        base,
        quote,
        amt,
        includeFee
      );
    return toUnit(result.unwrap().toString(), this.chainDecimals).toNumber();
  }

  public async addLiquidityTx(
    base: string,
    quote: string,
    amountBaseDesired: number,
    amountQuoteDesired: number,
    amountBaseMin: number,
    amountQuoteMin: number,
    mintToAddress: string
  ): Promise<SubmittableExtrinsic> {
    const asset1 = assetIdEnumFromString(base);
    const asset2 = assetIdEnumFromString(quote);
    const amount1Desired = toPlanck(
      amountBaseDesired,
      this.chainDecimals
    ).toFixed();
    const amount2Desired = toPlanck(
      amountQuoteDesired,
      this.chainDecimals
    ).toFixed();
    const amount1Min = toPlanck(amountBaseMin, this.chainDecimals).toFixed();
    const amount2Min = toPlanck(amountQuoteMin, this.chainDecimals).toFixed();
    return this.api.tx.assetConversion.addLiquidity(
      asset1,
      asset2,
      amount1Desired,
      amount2Desired,
      amount1Min,
      amount2Min,
      mintToAddress
    );
  }

  public async createPoolTx(
    base: string,
    quote: string
  ): Promise<SubmittableExtrinsic> {
    const asset1 = assetIdEnumFromString(base);
    const asset2 = assetIdEnumFromString(quote);
    return this.api.tx.assetConversion.createPool(asset1, asset2);
  }

  public async removeLiquidityTx(
    base: string,
    quote: string,
    lpTokenBurnAmount: string,
    amountBaseMinReceive: string,
    amountQuoteMinReceive: string,
    withdrawTo: string
  ): Promise<SubmittableExtrinsic> {
    const asset1 = assetIdEnumFromString(base);
    const asset2 = assetIdEnumFromString(quote);
    const lpTokenBurn = toPlanck(
      lpTokenBurnAmount,
      this.chainDecimals
    ).toFixed();
    const amount1Min = toPlanck(
      amountBaseMinReceive,
      this.chainDecimals
    ).toFixed();
    const amount2Min = toPlanck(
      amountQuoteMinReceive,
      this.chainDecimals
    ).toFixed();
    return this.api.tx.assetConversion.removeLiquidity(
      asset1,
      asset2,
      lpTokenBurn,
      amount1Min,
      amount2Min,
      withdrawTo
    );
  }

  public async swapExactTokensForTokensTx(
    path: string[],
    amountIn: number,
    amountOutMin: number,
    toAddress: string,
    keepAlive = true
  ): Promise<SubmittableExtrinsic> {
    const assetPath = path.map((asset) => assetIdEnumFromString(asset));
    const amtIn = toPlanck(amountIn, this.chainDecimals).toFixed();
    const amtOut = toPlanck(amountOutMin, this.chainDecimals).toFixed();
    return this.api.tx.assetConversion.swapExactTokensForTokens(
      assetPath,
      amtIn,
      amtOut,
      toAddress,
      keepAlive
    );
  }

  public async swapTokensForExactTokens(
    path: string[],
    amountOut: number,
    amountInMax: number,
    toAddress: string,
    keepAlive = true
  ): Promise<SubmittableExtrinsic> {
    const assetPath = path.map((asset) => assetIdEnumFromString(asset));
    const amtOut = toPlanck(amountOut, this.chainDecimals).toFixed();
    const amtIn = toPlanck(amountInMax, this.chainDecimals).toFixed();
    return this.api.tx.assetConversion.swapTokensForExactTokens(
      assetPath,
      amtOut,
      amtIn,
      toAddress,
      keepAlive
    );
  }

  public async getReserves(
    base: string,
    quote: string
  ): Promise<{ base: number; quote: number }> {
    const asset1 = assetIdEnumFromString(base);
    const asset2 = assetIdEnumFromString(quote);
    const out = await this.api.call.assetConversionApi.getReserves(
      asset1,
      asset2
    );
    const result = out.toJSON() as Array<string> | null;
    return {
      base: toUnit(result?.[0] ?? 0, this.chainDecimals).toNumber(),
      quote: toUnit(result?.[1] ?? 0, this.chainDecimals).toNumber(),
    };
  }
}
