import { sepolia as sepoliaChain } from "viem/chains";

import { Chain, ChainType } from "../types";
import { SEPOLIA_GENESIS } from "../genesis";

export const sepolia: Chain = {
  name: sepoliaChain.name,
  logo: "ETH",
  type: ChainType.Evm,
  genesis: SEPOLIA_GENESIS,
  isTestnet: true,
};

export const evmChains = [sepolia];
