import { useCallback } from "react";
import { SwapApi } from "@polkadex/polkadex-api";

import { useCoreProvider } from "@/core";

export type Ocex = SwapApi;

export function useCall() {
  const { swapApi } = useCoreProvider();

  const onSwapExactReceiveTokens = useCallback(
    async (props: SwapExactReceiveTokensProps) =>
      await swapExactReceiveTokens(swapApi as SwapApi, props),
    [swapApi]
  );

  const onSwapExactPayTokens = useCallback(
    async (props: SwapExactPayTokensProps) =>
      await swapExactPayTokens(swapApi as SwapApi, props),
    [swapApi]
  );

  return {
    onSwapExactReceiveTokens,
    onSwapExactPayTokens,
  };
}

type SwapExactReceiveTokensProps = Parameters<Ocex["swapTokensForExactTokens"]>;
const swapExactReceiveTokens = async (
  api: Ocex,
  props: SwapExactReceiveTokensProps
) => await api.swapTokensForExactTokens(...props);

type SwapExactPayTokensProps = Parameters<Ocex["swapExactTokensForTokensTx"]>;
const swapExactPayTokens = async (api: Ocex, props: SwapExactPayTokensProps) =>
  await api.swapExactTokensForTokensTx(...props);
