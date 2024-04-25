"use client";

import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { SubmittableExtrinsic } from "@polkadot/api/types";
import { ISubmittableResult } from "@polkadot/types/types";

import { signAndSend } from "@/helpers";
import { useCoreProvider } from "@/core";

export type SwapProps = {
  payId: string;
  payAmount: number;
  receiveId: string;
  receiveAmount: number;
};

export function useSwap() {
  const { swapApi, api, account, onBalancesRefetch } = useCoreProvider();

  const {
    data: swapData,
    status,
    mutateAsync: onSwap,
  } = useMutation({
    mutationFn: async ({
      payId,
      payAmount,
      receiveId,
      receiveAmount,
    }: SwapProps) => {
      if (!account || !api || !swapApi) return;

      const extrinsic = (await swapApi.swapExactTokensForTokensTx(
        [payId, receiveId],
        payAmount,
        receiveAmount,
        account.address
      )) as unknown as SubmittableExtrinsic<"promise", ISubmittableResult>;

      const res = await signAndSend({
        api,
        account,
        extrinsic,
        waitForFinalization: true,
      });
      onBalancesRefetch?.();
      toast.success("Swap SuccessFull");
      return res;
    },
    onError: (error) => {
      console.log("Error", error);
      toast.error("Swap Error");
    },
  });

  return {
    swapData,
    onSwap,
    swapSuccess: status === "success",
    swapLoading: status === "pending",
  };
}
