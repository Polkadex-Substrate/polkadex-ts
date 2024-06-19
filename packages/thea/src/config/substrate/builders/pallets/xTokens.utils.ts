import { XcmVersion, Parents } from "@moonbeam-network/xcm-builder";
import { AnyChain, ChainAssetId } from "@moonbeam-network/xcm-types";

export const toDest = (
  version: XcmVersion,
  destination: AnyChain,
  account: any,
  isDirectTransfer?: boolean
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

  if (isDirectTransfer) {
    return {
      [version]: {
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
