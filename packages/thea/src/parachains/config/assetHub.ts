import { ChainConfig, AssetConfig } from "@moonbeam-network/xcm-config";
import {
  ExtrinsicConfigBuilder,
  BalanceBuilder,
  AssetMinBuilder,
  ExtrinsicConfig,
} from "@moonbeam-network/xcm-builder";

import { polkadex, assetHub } from "../chains";
import { usdt, dot, pdex } from "../assets";

const getExt = (): ExtrinsicConfigBuilder => {
  const pallet = "polkadotXcm";
  const func = "limitedReserveTransferAssets";

  return {
    build: ({ address, amount, palletInstance, asset }) => {
      return new ExtrinsicConfig({
        module: pallet,
        func,
        getArgs: () => {
          const arg1 = {
            V2: {
              parents: 1,
              interior: { X1: { Parachain: 2040 } },
            },
          };
          const arg2 = {
            V2: {
              parents: 0,
              interior: {
                X1: {
                  AccountId32: { network: { Any: null }, id: address },
                },
              },
            },
          };
          const arg3 = {
            V2: [
              {
                id: {
                  Concrete: {
                    parents: 0,
                    interior: {
                      X2: [
                        { PalletInstance: palletInstance },
                        { GeneralIndex: asset },
                      ],
                    },
                  },
                },
                fun: { Fungible: amount },
              },
            ],
          };
          const arg4 = 0;
          const arg5 = { Unlimited: null };
          return [arg1, arg2, arg3, arg4, arg5];
        },
      });
    },
  };
};

const xcmDeliveryFeeAmount = 0.001;

const toPolkadex: AssetConfig[] = [
  new AssetConfig({
    asset: usdt,
    balance: BalanceBuilder().substrate().assets().account(),
    destination: polkadex,
    destinationFee: {
      amount: 0,
      asset: pdex,
      balance: BalanceBuilder().substrate().assets().account(),
    },
    extrinsic: getExt(),
    fee: {
      asset: dot,
      balance: BalanceBuilder().substrate().system().account(),
      xcmDeliveryFeeAmount,
    },
    min: AssetMinBuilder().assets().asset(),
  }),
];

export const assetHubConfig = new ChainConfig({
  assets: [...toPolkadex],
  chain: assetHub,
});
