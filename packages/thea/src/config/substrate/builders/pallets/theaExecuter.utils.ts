import { XcmVersion } from "@moonbeam-network/xcm-builder";
import { AnyChain } from "@moonbeam-network/xcm-types";

export const toBeneficiary = (
  version: XcmVersion,
  destination: AnyChain,
  account: any
) => {
  return {
    [version]: {
      parents: 1,
      interior: {
        X2: [
          {
            Parachain: destination.parachainId,
          },
          account,
        ],
      },
    },
  };
};
