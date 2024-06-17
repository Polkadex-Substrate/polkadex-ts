import {
  ExtrinsicConfigBuilder,
  ExtrinsicConfig,
} from "@moonbeam-network/xcm-builder";

import { getExtrinsicAccount } from "../ExtrinsicBuilder.utils";
import { ExtrinsicConfigBuilderParams } from "../../types";

import { toDest } from "./xTransfer.utils";

const pallet = "xTransfer";

const transfer = () => {
  return {
    here: (): ExtrinsicConfigBuilder => ({
      build: (args) =>
        new ExtrinsicConfig({
          module: pallet,
          func: "transfer",
          getArgs: () => {
            const { address, amount, destination, isDirectTransfer } =
              args as ExtrinsicConfigBuilderParams;
            const account = getExtrinsicAccount(address);
            return [
              {
                id: {
                  Concrete: {
                    parents: 0,
                    interior: "Here",
                  },
                },
                fun: {
                  Fungible: amount,
                },
              },
              toDest(destination, account, isDirectTransfer),
              {
                refTime: 5_000_000_000,
                proofSize: 2_000_000,
              },
            ];
          },
        }),
    }),
  };
};

export const xTransfer = () => {
  return {
    transfer,
  };
};
