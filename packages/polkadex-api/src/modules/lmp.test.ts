import { ApiPromise, WsProvider } from "@polkadot/api";

import { apiTypes } from "../types";

import { LmpApi } from "./lmp";

const provider = new WsProvider("wss://test.chain.polkadex.trade");

const api = new ApiPromise({ provider, ...apiTypes });
const lmp = new LmpApi(api);

beforeAll(async () => {
  await lmp.initApi();
}, 15000);

describe("lmp queries <> check if markets types are correct", () => {
  test("Get market entries", async () => {
    const res = await lmp.queryAllMarkets(32);
    expect(res.length > 0).toBe(true);
    expect(res[0]).toEqual(expect.any(String));
  });
});

afterAll(async () => {
  await api.disconnect();
}, 10000);
