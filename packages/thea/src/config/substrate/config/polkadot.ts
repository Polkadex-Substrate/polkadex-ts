import { AssetConfig, ChainConfig } from "@moonbeam-network/xcm-config";
import { BalanceBuilder } from "@moonbeam-network/xcm-builder";

import { ExtrinsicBuilderV2 } from "../builders";
import { polkadex, polkadot } from "../chains";
import { dot } from "../assets";

const toPolkadex: AssetConfig[] = [
  new AssetConfig({
    asset: dot,
    balance: BalanceBuilder().substrate().system().account(),
    destination: polkadex,
    destinationFee: {
      amount: 0,
      asset: dot,
      balance: BalanceBuilder().substrate().system().account(),
    },
    extrinsic: ExtrinsicBuilderV2().xcmPallet().reserveTransferAssets(0).here(),
    fee: {
      asset: dot,
      balance: BalanceBuilder().substrate().system().account(),
    },
  }),
];

export const polkadotConfig = new ChainConfig({
  assets: [...toPolkadex],
  chain: polkadot,
});
