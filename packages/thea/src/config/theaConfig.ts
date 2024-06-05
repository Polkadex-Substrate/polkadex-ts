import { changeSubstrateToBaseChain } from "./substrate/helpers";
import { Chain, ITheaConfig } from "./types";
import { substrateChains } from "./substrate";

export class Thea implements ITheaConfig {
  getAllChains(): Chain[] {
    const processedSubstrateChains = substrateChains.map((chain) => {
      return changeSubstrateToBaseChain(chain);
    });

    return [...processedSubstrateChains];
  }
}
