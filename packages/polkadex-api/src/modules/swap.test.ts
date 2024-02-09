import { ApiPromise, WsProvider } from "@polkadot/api";

import { apiTypes } from "../types";

import { SwapApi } from "./swap";

const provider = new WsProvider(
  "wss://polkadex.public.curie.radiumblock.co/ws"
);

const api = new ApiPromise({ provider, ...apiTypes });
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

  test("quote exact tokens for tokens", async () => {
    const res = await swapApi.quotePriceExactTokensForTokens(
      "PDEX",
      "95930534000017180603917534864279132680",
      100.2215
    );
    expect(res).toEqual(expect.any(Number));
  });

  test("quote tokens for exact tokens", async () => {
    const res = await swapApi.quotePriceTokensForExactTokens(
      "PDEX",
      "95930534000017180603917534864279132680",
      100
    );
    expect(res).toEqual(expect.any(Number));
  });

  test("swap exact token for tokens transaction", async () => {
    const path = ["PDEX", "95930534000017180603917534864279132680"];
    const tx = await swapApi.swapExactTokensForTokensTx(
      path,
      4,
      2,
      "5DF4nDFCoS9EnU42oz4RjixxiCSse6np98FXXQVyY5J3X551"
    );
    expect(tx).toBeTruthy();
  });

  test("swap token for exact tokens transaction", async () => {
    const path = ["PDEX", "95930534000017180603917534864279132680"];
    const tx = await swapApi.swapExactTokensForTokensTx(
      path,
      4,
      2,
      "5DF4nDFCoS9EnU42oz4RjixxiCSse6np98FXXQVyY5J3X551"
    );
    expect(tx).toBeTruthy();
  });

  test("get reserved for a pools", async () => {
    const res = await swapApi.getReserves(
      "95930534000017180603917534864279132680",
      "PDEX"
    );
    expect(res.base).toEqual(expect.any(Number));
    expect(res.quote).toEqual(expect.any(Number));
  });
});

afterAll(async () => {
  await api.disconnect();
}, 10000);
