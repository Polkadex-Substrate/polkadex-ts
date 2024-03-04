import { ApiPromise, WsProvider } from "@polkadot/api";
import { afterAll, describe, test } from "vitest";

import { apiTypes } from "../types";

import { LmpApi } from "./lmp";

const provider = new WsProvider("wss://test.chain.polkadex.trade");

const api = new ApiPromise({ provider, ...apiTypes });
const lmp = new LmpApi(api);

describe("lmp queries <> check if markets types are correct", () => {
  afterAll(async () => {
    await api.disconnect();
  });

  // test("Get market entries for lmp", async () => {
  //   const res = await lmp.queryAllMarkets(1);
  //   console.log(res);
  //   expect(res.length > 0).toBe(true);
  // });
  //
  test("Eligible rewards for an account for an epoch", async () => {
    const rewards = await lmp.getEligibleRewards(
      4,
      "PDEX-3496813586714279103986568049643838918",
      "esooMNcEcTMzLAzbTA1FKpgurqhzRmLro11MLRyLTJ8bewAq1"
    );
    console.log("rewards", rewards);
  });

  test("Query to get accounts for a given market", async () => {
    const res = await lmp.getTopAccounts(
      10,
      "PDEX-3496813586714279103986568049643838918"
    );
    console.log("top accounts", res);
  });
  // test("Query to get a claimable epoch for an account and market", async () => {});
});
