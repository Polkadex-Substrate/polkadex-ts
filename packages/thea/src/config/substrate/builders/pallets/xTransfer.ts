import {
  ExtrinsicConfigBuilder,
  ExtrinsicConfig,
} from "@moonbeam-network/xcm-builder";

import { getExtrinsicAccount } from "../ExtrinsicBuilder.utils";
import { ExtrinsicConfigBuilderParams } from "../../types";

const pallet = "xTransfer";

const transfer = () => {
  return {
    here: (): ExtrinsicConfigBuilder => ({
      build: (args) =>
        new ExtrinsicConfig({
          module: pallet,
          func: "transfer",
          getArgs: () => {
            const { address, amount, destination } =
              args as ExtrinsicConfigBuilderParams;
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
              {
                parents: 1,
                interior: {
                  X2: [
                    {
                      Parachain: destination.parachainId,
                    },
                    getExtrinsicAccount(address),
                  ],
                },
              },
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
