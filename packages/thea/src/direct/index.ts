import { Asset, Chain, POLKADEX_GENESIS } from "../config";
import { getChainConnector } from "../sdk";
import { Polkadex } from "../sdk/substrate";

export const directDeposit = async (
  srcChain: Chain,
  asset: Asset,
  fromAddress: string,
  toAddress: string
) => {
  if (srcChain.genesis === POLKADEX_GENESIS) {
    throw new Error("Direct deposit is not possible..");
  }

  const destChain = new Polkadex().getChain();
  const srcChainConnector = getChainConnector(srcChain.genesis);

  const isAssetSupported = srcChainConnector
    .getSupportedAssets(destChain)
    .find((a) => a.ticker === asset.ticker);

  if (!isAssetSupported) throw new Error("Asset not supported...");

  const transferConfig = await srcChainConnector.getTransferConfig(
    destChain,
    asset,
    fromAddress,
    toAddress,
    true // Direct deposit flag
  );

  return transferConfig;
};
