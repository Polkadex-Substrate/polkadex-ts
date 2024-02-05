import { SubmittableExtrinsic } from "@polkadot/api/promise/types";
import { cleanNumberLike, toPlank, toUnit } from "@polkadex/numericals";
import { Option, u128 } from "@polkadot/types";

import { BaseApi } from "../base-api";

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
      const base = this.parseAsset(pair[0]);
      const quote = this.parseAsset(pair[1]);
      const valueJson = value.toJSON() as { lpToken: string };
      return {
        base,
        quote,
        lpToken: cleanNumberLike(valueJson.lpToken).toString(),
      };
    });
    return await Promise.all(promises);
  }

  parseAsset(asset: unknown): string {
    if (typeof asset !== "object") {
      throw new Error(`cannot parse asset ${asset}`);
    }
    if (!!asset && "polkadex" in asset) {
      return "polkadex";
    }

    if (!!asset && "asset" in asset) {
      return cleanNumberLike(asset.asset as string).toFixed();
    }
    console.log(typeof asset);
    throw new Error(`cannot parse asset ${asset}`);
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
    amount = Number(toPlank(amount, this.chainDecimals).toFixed());
    const result: Option<u128> =
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      await this.api.rpc.tx.quotePriceExactTokensForTokens<Option<u128>>(
        base,
        quote,
        Number(amount),
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
    amount = Number(toPlank(amount, this.chainDecimals).toFixed());
    const result: Option<u128> =
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      await this.api.rpc.tx.quotePriceTokensForExactTokens(
        base,
        quote,
        amount,
        includeFee
      );
    return toUnit(result.unwrap().toString(), this.chainDecimals).toNumber();
  }

  createAssetIdEnum(id: string | object): Record<string, null | string> {
    if (!!id && typeof id === "object") {
      return id;
    }
    if (id.toUpperCase() === "POLKADEX" || id.toUpperCase() === "PDEX") {
      return { polkadex: null };
    }
    return { asset: id };
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
    const asset1 = this.createAssetIdEnum(base);
    const asset2 = this.createAssetIdEnum(quote);
    const amount1Desired = toPlank(amountBaseDesired).toFixed();
    const amount2Desired = toPlank(amountQuoteDesired).toFixed();
    const amount1Min = toPlank(amountBaseMin).toFixed();
    const amount2Min = toPlank(amountQuoteMin).toFixed();
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
    const asset1 = this.createAssetIdEnum(base);
    const asset2 = this.createAssetIdEnum(quote);
    return this.api.tx.assetConversion.createPool(asset1, asset2);
  }

  public async removeLiquidityTx(
    base: string,
    quote: string,
    lpTokenBurnAmout: string,
    amountBaseMinRecive: string,
    amountQuoteMinrecive: string,
    withdrawTo: string
  ): Promise<SubmittableExtrinsic> {
    const asset1 = this.createAssetIdEnum(base);
    const asset2 = this.createAssetIdEnum(quote);
    const lpTokenBurn = toPlank(lpTokenBurnAmout).toFixed();
    const amount1Min = toPlank(amountBaseMinRecive).toFixed();
    const amount2Min = toPlank(amountQuoteMinrecive).toFixed();
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
    const assetPath = path.map((asset) => this.createAssetIdEnum(asset));
    const amtIn = toPlank(amountIn, this.chainDecimals).toFixed();
    const amtOut = toPlank(amountOutMin, this.chainDecimals).toFixed();
    return this.api.tx.swapExactTokensForTokens(
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
    const assetPath = path.map((asset) => this.createAssetIdEnum(asset));
    const amtOut = toPlank(amountOut, this.chainDecimals).toFixed();
    const amtIn = toPlank(amountInMax, this.chainDecimals).toFixed();
    return this.api.tx.swapExactTokensForTokens(
      assetPath,
      amtOut,
      amtIn,
      toAddress,
      keepAlive
    );
  }
}
