import {
  XcmVersion,
  ExtrinsicConfigBuilder,
  ExtrinsicConfig,
  Parents,
} from "@moonbeam-network/xcm-builder";

import { getExtrinsicAccount } from "../ExtrinsicBuilder.utils";
import { ExtrinsicConfigBuilderParams } from "../..";

import { toAssets, toBeneficiary, toDest } from "./xcmPallet.utils";

const pallet = "xcmPallet";

const limitedReserveTransferAssets = (parent: Parents) => {
  const func = "limitedReserveTransferAssets";
  return {
    here: (): ExtrinsicConfigBuilder => ({
      build: ({ address, amount, destination }) =>
        new ExtrinsicConfig({
          module: pallet,
          func,
          getArgs: () => {
            const version = XcmVersion.v3;
            const account = getExtrinsicAccount(address);
            return [
              toDest(version, destination),
              toBeneficiary(version, account),
              toAssets(version, parent, "Here", amount),
              0,
              "Unlimited",
            ];
          },
        }),
    }),
  };
};

const reserveTransferAssets = (parent: Parents) => {
  const func = "reserveTransferAssets";
  return {
    here: (): ExtrinsicConfigBuilder => ({
      build: (args) =>
        new ExtrinsicConfig({
          module: pallet,
          func,
          getArgs: () => {
            const { address, amount, destination, isDirectTransfer } =
              args as ExtrinsicConfigBuilderParams;
            const version = XcmVersion.v2;
            const account = getExtrinsicAccount(address);
            return [
              toDest(version, destination),
              toBeneficiary(version, account, isDirectTransfer),
              toAssets(version, parent, "Here", amount),
              0,
            ];
          },
        }),
    }),
  };
};

const limitedTeleportAssets = (parent: Parents) => {
  const func = "limitedTeleportAssets";
  return {
    here: (): ExtrinsicConfigBuilder => ({
      build: ({ address, amount, destination }) =>
        new ExtrinsicConfig({
          module: pallet,
          func,
          getArgs: () => {
            const version = XcmVersion.v3;
            const account = getExtrinsicAccount(address);
            return [
              toDest(version, destination),
              toBeneficiary(version, account),
              toAssets(version, parent, "Here", amount),
              0,
              "Unlimited",
            ];
          },
        }),
    }),
  };
};

export const xcmPallet = () => {
  return {
    limitedReserveTransferAssets,
    reserveTransferAssets,
    limitedTeleportAssets,
  };
};
