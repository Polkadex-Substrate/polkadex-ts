import { ChainConfig, AssetConfig } from "@moonbeam-network/xcm-config";
import {
  ExtrinsicConfigBuilder,
  BalanceBuilder,
  AssetMinBuilder,
  ExtrinsicConfig,
} from "@moonbeam-network/xcm-builder";

import { polkadex, assetHub } from "./chains";
import { usdt, pdex } from "./assets";

const getExt = (): ExtrinsicConfigBuilder => {
  const pallet = "polkadotXcm";
  const func = "limitedReserveTransferAssets";

  return {
    build: () => {
      return new ExtrinsicConfig({
        module: pallet,
        func,
        getArgs: () => {
          return [];
        },
      });
    },
  };
};

const xcmDeliveryFeeAmount = 1.082;

const toAssethub: AssetConfig[] = [
  new AssetConfig({
    asset: usdt,
    balance: BalanceBuilder().substrate().assets().account(),
    destination: assetHub,
    destinationFee: {
      amount: 0.0022,
      asset: usdt,
      balance: BalanceBuilder().substrate().assets().account(),
    },
    extrinsic: getExt(),
    fee: {
      asset: pdex,
      balance: BalanceBuilder().substrate().system().account(),
      xcmDeliveryFeeAmount,
    },
    min: AssetMinBuilder().assets().asset(),
  }),
];

export const polkadexConfig = new ChainConfig({
  assets: [...toAssethub],
  chain: polkadex,
});
