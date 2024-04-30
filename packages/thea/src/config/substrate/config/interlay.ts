import { AssetConfig, ChainConfig } from "@moonbeam-network/xcm-config";
import { BalanceBuilder } from "@moonbeam-network/xcm-builder";

import { ExtrinsicBuilderV2 } from "../builders";
import { interlay, polkadex } from "../chains";
import { ibtc, intr } from "../assets";

const toPolkadex: AssetConfig[] = [
  new AssetConfig({
    asset: ibtc,
    balance: BalanceBuilder().substrate().tokens().accounts(),
    destination: polkadex,
    destinationFee: {
      amount: 0,
      asset: ibtc,
      balance: BalanceBuilder().substrate().tokens().accounts(),
    },
    extrinsic: ExtrinsicBuilderV2().xTokens().transfer().X2(),
    fee: {
      asset: intr,
      balance: BalanceBuilder().substrate().tokens().accounts(),
    },
  }),
];

export const interlayConfig = new ChainConfig({
  assets: [...toPolkadex],
  chain: interlay,
});