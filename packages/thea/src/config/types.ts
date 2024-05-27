export enum ChainType {
  Substrate,
  EvmSubstrate,
  Evm,
}

export type Asset = {
  id?: string;
  ticker: string;
  logo: string;
  decimal: number;
};

export type Chain = {
  name: string;
  logo: string;
  genesis: string;
  type: ChainType;
  isTestnet: boolean;
};

export interface ITheaConfig {
  // Returns all chains
  getAllChains(): Chain[];
}
