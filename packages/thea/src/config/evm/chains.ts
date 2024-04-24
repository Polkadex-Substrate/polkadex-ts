import { sepolia as sepoliaChain } from "viem/chains";

import { Chain, ChainType } from "../types";

export const sepolia: Chain = {
  name: sepoliaChain.name,
  logo: "ETH",
  type: ChainType.Evm,
  genesis: "0x25a5cc106eea7138acab33231d7160d69cb777ee0c2c553fcddf5138993e6dd9",
  isTestnet: true,
};

export const evmChains = [sepolia];
