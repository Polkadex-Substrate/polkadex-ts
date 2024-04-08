import { ApiPromise, WsProvider } from "@polkadot/api";
import { hexToBigInt } from "@polkadot/util";
import { afterAll, describe, expect, expectTypeOf, test } from "vitest";

import { apiTypes } from "../types";

import { OcexApi } from "./ocex";

const provider = new WsProvider(
  "wss://polkadex.public.curie.radiumblock.co/ws"
);
const api = new ApiPromise({ provider, ...apiTypes });
const ocex = new OcexApi(api);

describe("OCEX modules testing", () => {
  afterAll(async () => {
    await api.disconnect();
  });

  test("Get proxies for a funding account", { timeout: 100000 }, async () => {
    const res = await ocex.getProxies(
      "esq2wFkRsic8WM4nstAtkjqWdCDnTrGHMpFjaGN2rEHnQXUNm"
    );
    expectTypeOf(res).toBeArray();
    expect(res.length).toBe(2);
  });

  test(
    "Get proxies for a funding account which doesn't have any proxies yet",
    { timeout: 100000 },
    async () => {
      const res = await ocex.getProxies(
        "esrJG4KfTSMs6KMW7HDbhRc69FggP5uWaAUhcN2SUcsbapSri"
      );
      expectTypeOf(res).toBeArray();
      expect(res.length).toBe(0);
    }
  );

  test(
    "Get deposit extrinsic for PDEX asset",
    { timeout: 100000 },
    async () => {
      const asset = { polkadex: null };
      const res = await ocex.deposit(0.1, asset as unknown as string);
      expect(res.meta.name.toJSON()).toBe("deposit");
      expect(res.method.toJSON().args.asset).toEqual(asset);
    }
  );

  test(
    "Get deposit extrinsic for USDT asset",
    { timeout: 100000 },
    async () => {
      const asset = { asset: "3496813586714279103986568049643838918" };
      const res = await ocex.deposit(0.1, asset as unknown as string);
      expect(res.meta.name.toJSON()).toBe("deposit");
      expect(hexToBigInt(res.method.toJSON().args.asset.asset), asset.asset);
    }
  );

  test(
    "Add proxy account for a funding account",
    { timeout: 100000 },
    async () => {
      const res = await ocex.createProxyAccount(
        "esrJG4KfTSMs6KMW7HDbhRc69FggP5uWaAUhcN2SUcsbapSri",
        "esofajbxqmo8X6viLFkxGDAsrnaVC923JqsqvEXHxQJuFDmTW"
      );
      expect(res.meta.name.toJSON()).toBe("register_main_account");
    }
  );

  test(
    "Remove proxy account for a funding account",
    { timeout: 100000 },
    async () => {
      const res = await ocex.removeProxyAccount(
        "esofajbxqmo8X6viLFkxGDAsrnaVC923JqsqvEXHxQJuFDmTW"
      );
      expect(res.meta.name.toJSON()).toBe("remove_proxy_account");
    }
  );
});
