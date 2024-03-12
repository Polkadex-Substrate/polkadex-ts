import { ApiPromise } from "@polkadot/api";
import { u32 } from "@polkadot/types";

export abstract class BaseApi {
  protected api: ApiPromise;

  constructor(api: ApiPromise) {
    this.api = api;
  }

  public get chainDecimals() {
    return this.api.registry.chainDecimals[0];
  }

  public async initApi() {
    this.api = await this.api.isReadyOrError;
  }

  public async getLatestBlockNumber(): Promise<number> {
    await this.initApi();
    const res = await this.api.query.system.number<u32>();
    return res.toNumber();
  }

  public async getFinalizedBlockNumber(): Promise<number> {
    await this.initApi();
    const res = await this.api.rpc.chain.getFinalizedHead();
    const block = await this.api.rpc.chain.getBlock(res);
    return block.block.header.number.toNumber();
  }
}
