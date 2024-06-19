import { Parents, XcmVersion } from "@moonbeam-network/xcm-builder";
import { AnyChain } from "@moonbeam-network/xcm-types";

export const toDest = (version: XcmVersion, destination: AnyChain) => {
  if (destination.key === "polkadot" || destination.key === "kusama") {
    return {
      [version]: {
        parents: 1,
        interior: "Here",
      },
    };
  }

  return {
    [version]: {
      parents: 1,
      interior: {
        X1: { Parachain: destination.parachainId },
      },
    },
  };
};

export const toBeneficiary = (
  version: XcmVersion,
  account: any,
  isDirectTransfer?: boolean
) => {
  if (isDirectTransfer) {
    return {
      [version]: {
        parents: 0,
        interior: {
          X2: [account, { PalletInstance: 0 }],
        },
      },
    };
  }
  return {
    [version]: {
      parents: 0,
      interior: {
        X1: account,
      },
    },
  };
};

export const toAssets = (
  version: XcmVersion,
  parents: Parents,
  interior: any,
  amount: any
) => {
  return {
    [version]: [
      {
        id: {
          Concrete: {
            parents: parents,
            interior: interior,
          },
        },
        fun: {
          Fungible: amount,
        },
      },
    ],
  };
};

export const toAsset = (parents: Parents, interior: any, amount: any) => {
  return {
    id: {
      Concrete: {
        parents: parents,
        interior: interior,
      },
    },
    fun: {
      Fungible: amount,
    },
  };
};
