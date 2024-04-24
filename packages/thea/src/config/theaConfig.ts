import { changeSubstrateToBaseChain } from "./substrate/helpers";
import { Chain, ITheaConfig } from "./types";
import { substrateChains } from "./substrate";
import { evmChains } from "./evm";

export class Thea implements ITheaConfig {
  getAllChains(): Chain[] {
    const processedSubstrateChains = substrateChains.map((chain) => {
      return changeSubstrateToBaseChain(chain);
    });

    return [...processedSubstrateChains, ...evmChains];
  }
}
