"use client";

import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { SubmittableExtrinsic } from "@polkadot/api/types";
import { ISubmittableResult } from "@polkadot/types/types";

import { signAndSend } from "@/helpers";
import { useCoreProvider } from "@/core";

export type RemoveLiquidityProps = {
  baseId: string;
  quoteId: string;
  lpTokenBurnAmount: string;
  baseMinAmount: string;
  quoteMinAmount: string;
};

export function useRemoveLiquidity() {
  const { swapApi, api, account, onBalancesRefetch, onRefetchPositions } =
    useCoreProvider();

  const {
    data: removeLiquidityData,
    status,
    mutateAsync: onRemoveLiquidity,
  } = useMutation({
    mutationFn: async ({
      baseId,
      quoteId,
      lpTokenBurnAmount,
      baseMinAmount,
      quoteMinAmount,
    }: RemoveLiquidityProps) => {
      if (!account || !api || !swapApi) return;

      const extrinsic = (await swapApi.removeLiquidityTx(
        baseId,
        quoteId,
        lpTokenBurnAmount,
        baseMinAmount,
        quoteMinAmount,
        account.address
      )) as unknown as SubmittableExtrinsic<"promise", ISubmittableResult>;

      const res = await signAndSend({
        api,
        account,
        extrinsic,
        waitForFinalization: true,
      });
      await onBalancesRefetch?.();
      toast.success("Liquidity removed successFull");
      await onRefetchPositions?.();
      return res;
    },
    onError: (error) => {
      console.log("Error", error);
      toast.error("Remove Liquidity Error");
    },
  });

  return {
    removeLiquidityData,
    onRemoveLiquidity,
    removeLiquiditySuccess: status === "success",
    removeLiquidityLoading: status === "pending",
  };
}
