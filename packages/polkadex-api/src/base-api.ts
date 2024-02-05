import { ApiPromise } from "@polkadot/api";

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
}
