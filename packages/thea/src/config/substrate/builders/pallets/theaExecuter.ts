import {
  XcmVersion,
  ExtrinsicConfigBuilder,
  ExtrinsicConfig,
} from "@moonbeam-network/xcm-builder";

import { getExtrinsicAccount } from "../ExtrinsicBuilder.utils";

import { toBeneficiary } from "./theaExecuter.utils";

const pallet = "theaExecutor";

const parachainWithdraw = () => {
  const func = "parachainWithdraw";
  return {
    X2: () => ({
      sufficient: (): ExtrinsicConfigBuilder => ({
        build: ({ address, amount, asset, destination }) =>
          new ExtrinsicConfig({
            module: pallet,
            func,
            getArgs: () => {
              const version = XcmVersion.v3;
              const account = getExtrinsicAccount(address);
              return [
                asset,
                amount,
                toBeneficiary(version, destination, account),
                null,
                null,
                true,
                false,
              ];
            },
          }),
      }),
    }),
  };
};

export const theaExecuter = () => {
  return {
    parachainWithdraw,
  };
};
