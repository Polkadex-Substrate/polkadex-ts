import { XcmVersion } from "@moonbeam-network/xcm-builder";
import { AnyChain, ChainAssetId } from "@moonbeam-network/xcm-types";

export const toBeneficiary = (
  version: XcmVersion,
  destination: AnyChain,
  account: any
) => {
  if (destination.key === "polkadot") {
    return {
      [version]: {
        parents: 1,
        interior: {
          X1: account,
        },
      },
    };
  }

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

export const toAsset = (asset: ChainAssetId) => {
  return !asset || asset === "PDEX" ? "Polkadex" : { Asset: asset };
};
