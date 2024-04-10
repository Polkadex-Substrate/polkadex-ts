import { AssetConfig, ChainConfig } from "@moonbeam-network/xcm-config";
import { AssetMinBuilder, BalanceBuilder, ExtrinsicBuilder } from "@moonbeam-network/xcm-builder";

import { ExtrinsicBuilderV2 } from "./builders";
import { assetHub, bifrost, polkadex, polkadot } from "./chains";
import { dot, usdt } from "./assets";
import { polkadexConfig } from "./polkadex";
import { polkadotConfig } from "./polkadot";

const xcmDeliveryFeeAmount = 0.001;

const toPolkadex: AssetConfig[] = [
  new AssetConfig({
    asset: usdt,
    balance: BalanceBuilder().substrate().assets().account(),
    destination: polkadex,
    destinationFee: {
      amount: 0.001,
      asset: usdt,
      balance: BalanceBuilder().substrate().assets().account(),
    },
    extrinsic: ExtrinsicBuilderV2()
      .polkadotXcm()
      .limitedReserveTransferAssets()
      .X2(),
    fee: {
      asset: dot,
      balance: BalanceBuilder().substrate().system().account(),
      xcmDeliveryFeeAmount,
    },
    min: AssetMinBuilder().assets().asset(),
  }),
];

const toBifrost: AssetConfig[] = [
  new AssetConfig({
    asset: usdt,
    balance: BalanceBuilder().substrate().assets().account(),
    destination: bifrost,
    destinationFee: {
      amount: 0.03,
      asset: usdt,
      balance: BalanceBuilder().substrate().assets().account(),
    },
    extrinsic: ExtrinsicBuilder()
      .polkadotXcm()
      .limitedReserveTransferAssets()
      .X2(),
    fee: {
      asset: dot,
      balance: BalanceBuilder().substrate().system().account(),
      xcmDeliveryFeeAmount,
    },
    min: AssetMinBuilder().assets().asset(),
  }),
];
const toPolkadot: AssetConfig[] = [
  new AssetConfig({
    asset: dot,
    balance: BalanceBuilder().substrate().system().account(),
    destination: polkadot,
    destinationFee: {
      amount: 0.003,
      asset: dot,
      balance: BalanceBuilder().substrate().system().account(),
    },
    extrinsic: ExtrinsicBuilderV2()
      .polkadotXcm()
      .limitedTeleportAssets(1)
      .here(),
    fee: {
      asset: dot,
      balance: BalanceBuilder().substrate().system().account(),
      xcmDeliveryFeeAmount,
    },
    min: AssetMinBuilder().assets().asset(),
  }),
];

export const assetHubConfig = new ChainConfig({
  assets: [...toPolkadex, ...toPolkadot],
  chain: assetHub,
});

// <-----Different File------->

const polkadotChainsConfig: ChainConfig[] = [
  assetHubConfig,
  polkadexConfig,
  polkadotConfig,
];

export const chainsConfig: ChainConfig[] = [...polkadotChainsConfig];

export const chainsConfigMap = new Map<string, ChainConfig>(
  chainsConfig.map((config) => [config.chain.key, config])
);
