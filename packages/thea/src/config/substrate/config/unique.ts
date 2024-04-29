import { AssetConfig, ChainConfig } from "@moonbeam-network/xcm-config";
import { BalanceBuilder } from "@moonbeam-network/xcm-builder";

import { ExtrinsicBuilderV2 } from "../builders";
import { unique, polkadex } from "../chains";
import { unq } from "../assets";

const toPolkadex: AssetConfig[] = [
  new AssetConfig({
    asset: unq,
    balance: BalanceBuilder().substrate().system().account(),
    destination: polkadex,
    destinationFee: {
      amount: 0,
      asset: unq,
      balance: BalanceBuilder().substrate().system().account(),
    },
    extrinsic: ExtrinsicBuilderV2()
      .polkadotXcm()
      .limitedReserveTransferAssets()
      .X3(),
    fee: {
      asset: unq,
      balance: BalanceBuilder().substrate().system().account(),
    },
  }),
];

export const uniqueConfig = new ChainConfig({
  assets: [...toPolkadex],
  chain: unique,
});
