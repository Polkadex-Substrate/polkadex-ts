import { ApiPromise, WsProvider } from "@polkadot/api";
import { afterAll, describe, expect, expectTypeOf, test } from "vitest";
import { hexToBigInt } from "@polkadot/util";

import { apiTypes } from "../types";

import { BalancesApi } from "./balances";

const provider = new WsProvider(
  "wss://polkadex.public.curie.radiumblock.co/ws"
);
const api = new ApiPromise({ provider, ...apiTypes });
const balances = new BalancesApi(api);

describe("Balances modules testing", () => {
  afterAll(async () => {
    await api.disconnect();
  });

  test("Get native balance for an account", { timeout: 100000 }, async () => {
    const res = await balances.getNativeBalance(
      "esq2wFkRsic8WM4nstAtkjqWdCDnTrGHMpFjaGN2rEHnQXUNm"
    );
    expectTypeOf(res).toBeNumber();
  });

  test(
    "Transfer PDEX from one account to another",
    { timeout: 100000 },
    async () => {
      const destAddress = "esq2wFkRsic8WM4nstAtkjqWdCDnTrGHMpFjaGN2rEHnQXUNm";
      const amount = "0.1";
      const res = await balances.transfer(amount, destAddress);
      expect(res.meta.name.toJSON()).equal("transfer");
    }
  );
  test(
    "Transfer USDT from one account to another",
    { timeout: 100000 },
    async () => {
      const destAddress = "esq2wFkRsic8WM4nstAtkjqWdCDnTrGHMpFjaGN2rEHnQXUNm";
      const amount = "0.1";
      const usdtAssetId = "3496813586714279103986568049643838918";
      const res = await balances.transfer(amount, destAddress, usdtAssetId);
      expect(res.meta.name.toJSON()).equal("transfer");
      expect(hexToBigInt(res.method.toJSON().args.id)).equals(
        BigInt(usdtAssetId)
      );
    }
  );
});
