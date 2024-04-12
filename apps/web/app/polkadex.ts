import { ChainConfig, AssetConfig } from "@moonbeam-network/xcm-config";
import {
  ExtrinsicConfigBuilder,
  BalanceBuilder,
  AssetMinBuilder,
  ExtrinsicConfig,
  ExtrinsicBuilder,
} from "@moonbeam-network/xcm-builder";

import { assetHub, polkadex } from "./chains";
import { usdt, pdex, usdc } from "./assets";
import { ExtrinsicBuilderV2 } from "./builders";

const xcmDeliveryFeeAmount = 1.082;

const toAssethub: AssetConfig[] = [
  new AssetConfig({
    asset: usdt,
    balance: BalanceBuilder().substrate().assets().account(),
    destination: assetHub,
    destinationFee: {
      amount: 0.0022,
      asset: pdex,
      balance: BalanceBuilder().substrate().system().account(),
    },
    extrinsic: ExtrinsicBuilderV2()
      .polkadotXcm()
      .reserveTransferAssets()
      .here(),
  }),
  new AssetConfig({
    asset: usdc,
    balance: BalanceBuilder().substrate().assets().account(),
    destination: assetHub,
    destinationFee: {
      amount: 0.0022,
      asset: pdex,
      balance: BalanceBuilder().substrate().system().account(),
    },
    extrinsic: ExtrinsicBuilderV2()
      .polkadotXcm()
      .reserveTransferAssets()
      .here(),
  }),
];

export const polkadexConfig = new ChainConfig({
  assets: [...toAssethub],
  chain: polkadex,
});
