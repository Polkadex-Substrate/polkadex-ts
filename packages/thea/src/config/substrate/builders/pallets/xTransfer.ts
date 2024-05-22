import {
  ExtrinsicConfigBuilder,
  ExtrinsicConfig,
} from "@moonbeam-network/xcm-builder";

import { getExtrinsicAccount } from "../ExtrinsicBuilder.utils";

const pallet = "xTransfer";

const transfer = () => {
  return {
    here: (): ExtrinsicConfigBuilder => ({
      build: ({ address, amount, destination }) =>
        new ExtrinsicConfig({
          module: pallet,
          func: "transfer",
          getArgs: () => {
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
