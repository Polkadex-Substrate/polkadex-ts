import { XcmVersion, Parents } from "@moonbeam-network/xcm-builder";
import { AnyChain, ChainAssetId } from "@moonbeam-network/xcm-types";

export const toDest = (
  version: XcmVersion,
  destination: AnyChain,
  account: any
) => {
  if (destination.key === "polkadot" || destination.key === "kusama") {
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

export const toAsset = (interior: any, amount: any, parents?: Parents) => {
  return {
    id: {
      Concrete: {
        parents: parents ?? 1,
        interior: interior,
      },
    },
    fun: {
      Fungible: amount,
    },
  };
};

export const toEvmAsset = (asset: ChainAssetId) => {
  return !asset || asset === "GLMR" ? "SelfReserve" : { ForeignAsset: asset };
};
