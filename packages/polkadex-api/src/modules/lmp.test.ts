import { ApiPromise, WsProvider } from "@polkadot/api";
import { afterAll, describe, expect, test } from "vitest";

import { apiTypes } from "../types";

import { LmpApi } from "./lmp";

const provider = new WsProvider("wss://test.chain.polkadex.trade");

const api = new ApiPromise({ provider, ...apiTypes });
const lmp = new LmpApi(api);

describe("lmp queries <> check if markets types are correct", () => {
  afterAll(async () => {
    await api.disconnect();
  });

  test("Get market entries for lmp", async () => {
    const res = await lmp.queryAllMarkets(1);
    expect(res.length > 0).toBe(true);
  });

  test("Score and rewards for an account for an epoch", async() => {

  })
  test("Query to get accounts for a given market", async() => {

  })
  test("Query to get a claimable epoch for an account and market", async() => {

  })
});
