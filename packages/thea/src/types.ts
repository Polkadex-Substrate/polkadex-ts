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

export type TransactionInput = {
  from: string;
  to: string;
  amount: number;
  assetId: string;
};

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

  // returns true if the deposit conditions are valid
  validateDeposit(args: TransactionInput): Promise<boolean>;

  // return true if the withdrawal conditions are valid
  validateWithdrawal(args: TransactionInput): Promise<boolean>;

  // creates the transaction to transfer asset to polkadex chain
  createDepositTransaction(
    from: string,
    to: string,
    assetId: string,
    amount: number
  ): Promise<Transaction<T>>;
}

export interface Token {
  assetId: string;
  symbol: string;
  name: string;
  nativeChain: string;
}
