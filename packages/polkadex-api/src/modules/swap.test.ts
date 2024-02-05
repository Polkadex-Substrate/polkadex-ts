import {ApiPromise, WsProvider} from "@polkadot/api";

import {SwapApi} from "./swap";
import {BalancesApi} from "./balances";

const provider = new WsProvider(
    "wss://polkadex.api.onfinality.io/public-ws"
);
describe("Swap queries", () => {
    test("Get pool entries", async () => {
        const api = new ApiPromise({provider});
        const swapApi = new SwapApi(api);
        const res = await swapApi.queryPools();
    });
});
