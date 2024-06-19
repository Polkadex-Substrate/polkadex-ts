import { AnyChain } from "@moonbeam-network/xcm-types";

export const toDest = (
  destination: AnyChain,
  account: any,
  isDirectTransfer?: boolean
) => {
  if (isDirectTransfer) {
    return {
      parents: 1,
      interior: {
        X3: [
          {
            Parachain: destination.parachainId,
          },
          account,
          { PalletInstance: 0 },
        ],
      },
    };
  }

  return {
    parents: 1,
    interior: {
      X2: [
        {
          Parachain: destination.parachainId,
        },
        account,
      ],
    },
  };
};
