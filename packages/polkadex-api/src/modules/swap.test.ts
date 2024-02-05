import { ApiPromise, WsProvider } from "@polkadot/api";

import { rpc } from "../types";

import { SwapApi } from "./swap";

const provider = new WsProvider(
  "wss://polkadex.public.curie.radiumblock.co/ws"
);

const api = new ApiPromise({ provider, rpc });
const swapApi = new SwapApi(api);

beforeAll(async () => {
  await swapApi.initApi();
}, 15000);

describe("Swap queries <> check if pool types are correct", () => {
  // test("Get pool entries", async () => {
  //   const res = await swapApi.queryPools();
  //   expect(res.length > 0).toBe(true);
  //   expect(res[0].base).toEqual(expect.any(String));
  //   expect(res[0].quote).toEqual(expect.any(String));
  //   expect(res[0].lpToken).toEqual(expect.any(String));
  // });

  test("quote exact tokens for tokens", async () => {
    const res = await swapApi.quotePriceExactTokensForTokens(
      "PDEX",
      "95930534000017180603917534864279132680",
      100000000000000
    );
    console.log(res);
    expect(res).toEqual(expect.any(Number));
  });

  test("quote tokens for exact tokens", async () => {
    const res = await swapApi.quotePriceTokensForExactTokens(
      "PDEX",
      "95930534000017180603917534864279132680",
      1000000000000000
    );
    console.log(res);
    expect(res).toEqual(expect.any(Number));
  });
});

afterAll(async () => {
  await api.disconnect();
}, 10000);
