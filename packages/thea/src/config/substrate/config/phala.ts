import { AssetConfig, ChainConfig } from "@moonbeam-network/xcm-config";
import { BalanceBuilder } from "@moonbeam-network/xcm-builder";

import { phala, polkadex } from "../chains";
import { pha } from "../assets";
import { ExtrinsicBuilderV2 } from "../builders";

const toPolkadex: AssetConfig[] = [
  new AssetConfig({
    asset: pha,
    balance: BalanceBuilder().substrate().system().account(),
    destination: polkadex,
    destinationFee: {
      amount: 0,
      asset: pha,
      balance: BalanceBuilder().substrate().system().account(),
    },
    extrinsic: ExtrinsicBuilderV2().xTransfer().transfer().here(),
    fee: {
      asset: pha,
      balance: BalanceBuilder().substrate().system().account(),
    },
  }),
];

export const phalaConfig = new ChainConfig({
  assets: [...toPolkadex],
  chain: phala,
});
