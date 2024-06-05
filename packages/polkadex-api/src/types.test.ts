import { ApiPromise, WsProvider } from "@polkadot/api";
import { afterAll, describe, expect, test } from "vitest";

import { apiTypes } from "./types";

const provider = new WsProvider(
  "wss://polkadex.public.curie.radiumblock.co/ws"
);

const api = new ApiPromise({ provider, ...apiTypes });

describe("check if encoding", () => {
  afterAll(async () => {
    await api.disconnect();
  });
  test("withdrawal encoding", async () => {
    const withdraw = api.createType("WithdrawPayload", {
      asset_id: { polkadex: null },
      amount: "10",
      timestamp: 123456,
      destination_network: null,
    });
    const encoded = withdraw.toHex();
    expect(encoded).equals("0x0108313040e201000000000000");
  });
});
