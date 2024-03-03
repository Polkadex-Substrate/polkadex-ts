import { ApiPromise } from "@polkadot/api";
export declare abstract class BaseApi {
    protected api: ApiPromise;
    constructor(api: ApiPromise);
    get chainDecimals(): number;
    initApi(): Promise<void>;
}
//# sourceMappingURL=base-api.d.ts.map