import { Asset, Chain } from "../config";

export type AssetAmount = {
  ticker: string;
  amount: number;
};

export type TransferConfig = {
  sourceChain: Chain;
  destinationChain: Chain;
  min: AssetAmount;
  max: AssetAmount;
  sourceFee: AssetAmount;
  sourceFeeBalance: AssetAmount;
  sourceFeeExistential: AssetAmount;
  destinationFee: AssetAmount;
  destinationFeeBalance: AssetAmount;
  destinationNativeExistential: AssetAmount;

  // Do the actual transfer
  transfer<T>(amount: number): Promise<T>;
};

export interface BaseChainAdapter {
  // Get current chain
  getChain(): Chain;

  // Get all supported assets
  getAllAssets: () => Asset[];

  // Get supported assets for given destination chain
  getSupportedAssets: (destChain: Chain) => Asset[];

  // Get all available destination chains
  getDestinationChains(): Chain[];

  // Get transfer configuration
  getTransferConfig(
    destChain: Chain,
    assetId: Asset,
    fromAddress: string,
    toAddress: string
  ): Promise<TransferConfig>;

  // Returns array of balances of all supported assets for given chain
  getBalances(address: string, assets: Asset[]): Promise<AssetAmount[]>;
}

export interface EVMChainAdapter extends BaseChainAdapter {
  approveTokenTransfer<T>(
    amount: number,
    address: string,
    assetId: string
  ): Promise<T>;

  claimWithdrawal<T>(address: string, nonce: number, index: number): Promise<T>;
}
