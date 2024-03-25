import { Extrinsic } from "@polkadot/types/interfaces";

export enum ForeignNetwork {
  PolkadexParachain,
  Ethereum,
}

export interface Transaction<T> {
  tx: T;
  network: ForeignNetwork;
}

export interface TheaConfig {
  getAllSupportedChains(): ForeignChain<Extrinsic>[];
  getAllSupportedTokens(): Token[];
}

export interface TransactionHistory {
  amount: number;
  from: string;
  to: string;
  timestamp: number;
  status: string;
  assetId: string;
  type: string;
}
export interface AccountDetails {
  getTransactionsHistory(address: string): Promise<TransactionHistory[]>;
  getDepositInitiated(
    address: string,
    network: ForeignNetwork
  ): Promise<TransactionHistory[]>;
  getWithdrawals(address: string): Promise<TransactionHistory[]>;
}

export interface ForeignChain<T> {
  id: string;

  // get the balance of the asset for the given address
  getBalance(address: string, assetId: string): Promise<number>;

  // get the native asset id of the chain
  getNativeAssetId(): string;

  // get all supported assets for the chain
  getAllAssets(): string[];

  // returns the maximum amount of the asset that can be deposited
  // (total balance - existential amount)
  getMaxDepositAmount(address: string, assetId: string): Promise<number>;

  // returns the minimum amount of the asset that can be deposited
  getMinDepositAmount(address: string, assetId: string): Promise<number>;

  // returns how much asset will be swapped to give 1.5 PDEX to new account
  getMinAmountTakenForCreation(assetId: string): Promise<number | null>;

  // creates the transaction to transfer asset to polkadex chain
  createDepositTransaction(
    from: string,
    to: string,
    assetId: string,
    amount: number
  ): Promise<Transaction<T>>;

  // get maximum amount of asset that can be withdrawn
  getMaxWithdrawAmount(address: string, assetId: string): Promise<number>;

  // creates the transaction to transfer asset from polkadex chain to foreign chain
  withdrawTransaction(
    to: string,
    assetId: string,
    amount: number
  ): Promise<Extrinsic>;
}

export interface Token {
  assetId: string;
  symbol: string;
  name: string;
  nativeChain: string;
}
