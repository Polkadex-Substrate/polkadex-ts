import { ChainConfig, AssetConfig } from "@moonbeam-network/xcm-config";
import { BalanceBuilder } from "@moonbeam-network/xcm-builder";

import { ExtrinsicBuilderV2 } from "./builders";
import { polkadotAssetHub, polkadot, assetHub } from "./chains";
import { dot, usdt } from "./assets";

const xcmDeliveryFeeAmount = 0.047;
const toAssetHub: AssetConfig[] = [
  new AssetConfig({
    asset: dot,
    balance: BalanceBuilder().substrate().system().account(),
    destination: assetHub,
    destinationFee: {
      amount: 0.00014,
      asset: dot,
      balance: BalanceBuilder().substrate().system().account(),
    },
    extrinsic: ExtrinsicBuilderV2().xcmPallet().limitedTeleportAssets(0).here(),
    fee: {
      asset: dot,
      balance: BalanceBuilder().substrate().system().account(),
      xcmDeliveryFeeAmount,
    },
  }),
];
export const polkadotConfig = new ChainConfig({
  assets: [...toAssetHub],
  chain: polkadot,
});
