import {
  XcmVersion,
  ExtrinsicConfigBuilder,
  ExtrinsicConfig,
} from "@moonbeam-network/xcm-builder";

import {
  getExtrinsicAccount,
  getExtrinsicArgumentVersion,
} from "../ExtrinsicBuilder.utils";

import { toAsset, toDest } from "./xTokens.utils";

const pallet = "xTokens";

const transfer = (): ExtrinsicConfigBuilder => ({
  build: ({ address, amount, asset, destination }) =>
    new ExtrinsicConfig({
      module: pallet,
      func: "transfer",
      getArgs: (func) => {
        const version = getExtrinsicArgumentVersion(func, 2);
        const account = getExtrinsicAccount(address);
        return [
          asset,
          amount,
          toDest(version, destination, account),
          "Unlimited",
        ];
      },
    }),
});

const transferMultiasset = (originParachainId?: number) => {
  return {
    X3: (): ExtrinsicConfigBuilder => ({
      build: ({ address, amount, asset, destination, palletInstance }) =>
        new ExtrinsicConfig({
          module: pallet,
          func: "transferMultiasset",
          getArgs: () => {
            const version = XcmVersion.v3;
            const account = getExtrinsicAccount(address);
            const assets = toAsset(
              {
                X3: [
                  {
                    Parachain: originParachainId ?? destination.parachainId,
                  },
                  {
                    PalletInstance: palletInstance,
                  },
                  {
                    GeneralIndex: asset,
                  },
                ],
              },
              amount
            );
            return [
              {
                [version]: assets,
              },
              toDest(version, destination, account),
              "Unlimited",
            ];
          },
        }),
    }),
  };
};

const transferMultiassets = (originParachainId?: number) => {
  return {
    here: (): ExtrinsicConfigBuilder => ({
      build: ({ address, amount, asset, destination, palletInstance }) =>
        new ExtrinsicConfig({
          module: pallet,
          func: "transferMultiassets",
          getArgs: () => {
            const version = XcmVersion.v3;
            const account = getExtrinsicAccount(address);
            const assets = [
              toAsset("Here", amount, palletInstance && asset ? 1 : 0),
            ];

            return [
              {
                [version]: assets,
              },
              0,
              toDest(version, destination, account),
              "Unlimited",
            ];
          },
        }),
    }),
    X3: (): ExtrinsicConfigBuilder => ({
      build: ({
        address,
        amount,
        asset,
        destination,
        fee,
        feeAsset,
        palletInstance,
      }) =>
        new ExtrinsicConfig({
          module: pallet,
          func: "transferMultiassets",
          getArgs: () => {
            const version = XcmVersion.v3;
            const account = getExtrinsicAccount(address);
            const isAssetDifferent = !!feeAsset && asset !== feeAsset;
            const assets = [
              toAsset(
                {
                  X3: [
                    {
                      Parachain: originParachainId ?? destination.parachainId,
                    },
                    {
                      PalletInstance: palletInstance,
                    },
                    {
                      GeneralIndex: asset,
                    },
                  ],
                },
                amount,
                1
              ),
            ];

            if (isAssetDifferent) {
              assets.push(
                toAsset(
                  {
                    X3: [
                      {
                        Parachain: originParachainId ?? destination.parachainId,
                      },
                      {
                        PalletInstance: palletInstance,
                      },
                      {
                        GeneralIndex: feeAsset,
                      },
                    ],
                  },
                  fee
                )
              );
            }

            return [
              {
                [version]: assets,
              },
              isAssetDifferent ? 1 : 0,
              toDest(version, destination, account),
              "Unlimited",
            ];
          },
        }),
    }),
  };
};

export const xTokens = () => {
  return {
    transfer,
    transferMultiasset,
    transferMultiassets,
  };
};
