import { ApiPromise, WsProvider } from "@polkadot/api";

import { SwapApi } from "./swap";

const provider = new WsProvider(
  "wss://polkadex.public.curie.radiumblock.co/ws"
);

const api = new ApiPromise({ provider });
const swapApi = new SwapApi(api);

beforeAll(async () => {
  await swapApi.initApi();
}, 15000);

describe("Swap queries <> check if pool types are correct", () => {
  test("Get pool entries", async () => {
    const res = await swapApi.queryPools();
    expect(res.length > 0).toBe(true);
    expect(res[0].base).toEqual(expect.any(String));
    expect(res[0].quote).toEqual(expect.any(String));
    expect(res[0].lpToken).toEqual(expect.any(String));
  });
});

afterAll(async () => {
  await api.disconnect();
}, 10000);
