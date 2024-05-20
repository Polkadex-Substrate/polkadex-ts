"use client";

import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { SubmittableExtrinsic } from "@polkadot/api/types";
import { ISubmittableResult } from "@polkadot/types/types";

import { signAndSend } from "@/helpers";
import { useCoreProvider } from "@/core";

export type AddLiquidityProps = {
  baseId: string;
  quoteId: string;
  baseMaxAmount: number;
  quoteMaxAmount: number;
  baseMinAmount: number;
  quoteMinAmount: number;
};

export function useAddLiquidity() {
  const { swapApi, api, account, onBalancesRefetch, onRefetchPositions } =
    useCoreProvider();

  const {
    data: addLiquidityData,
    status,
    mutateAsync: onAddLiquidity,
  } = useMutation({
    mutationFn: async ({
      baseId,
      quoteId,
      baseMaxAmount,
      quoteMaxAmount,
      baseMinAmount,
      quoteMinAmount,
    }: AddLiquidityProps) => {
      if (!account || !api || !swapApi) return;

      const extrinsic = (await swapApi.addLiquidityTx(
        baseId,
        quoteId,
        baseMaxAmount,
        quoteMaxAmount,
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
      toast.success("Liquidity added successFull");
      await onRefetchPositions?.();
      return res;
    },
    onError: (error) => {
      console.log("Error", error);
      toast.error("Add Liquidity Error");
    },
  });

  return {
    addLiquidityData,
    onAddLiquidity,
    addLiquiditySuccess: status === "success",
    addLiquidityLoading: status === "pending",
  };
}
