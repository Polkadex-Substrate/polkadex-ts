import { ApiPromise, WsProvider } from "@polkadot/api";
import { afterAll, describe, expect, test } from "vitest";

import { apiTypes } from "../types";

import { AssetsApi } from "./assets";

const provider = new WsProvider(
  "wss://polkadex.public.curie.radiumblock.co/ws"
);

const api = new ApiPromise({ provider, ...apiTypes });
const assetApi = new AssetsApi(api);

describe("query all assets", () => {
  afterAll(async () => {
    await api.disconnect();
  });

  test("query asset entries", async () => {
    const res = await assetApi.queryAllAssets();
    expect(res.length > 0).toBe(true);
    expect(res[0].name).toEqual(expect.any(String));
    expect(res[0].ticker).toEqual(expect.any(String));
    expect(res[0].id).toEqual(expect.any(String));
  });
});
