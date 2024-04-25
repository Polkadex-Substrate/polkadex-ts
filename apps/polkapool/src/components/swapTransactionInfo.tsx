"use client";

import { SubmittableExtrinsic } from "@polkadot/api/types";
import { ISubmittableResult } from "@polkadot/types/types";

import { GenericHorizontal } from "./genericHorizontal";

import { useCoreProvider } from "@/core";
import { SwapProps, useCall, useTransactionFee } from "@/hooks";

type Result = SubmittableExtrinsic<"promise", ISubmittableResult>;

interface Props extends SwapProps {
  receiveWithSlippage: number;
  receiveTicker: string;
}
export const SwapTransactionInfo = ({
  payId,
  payAmount,
  receiveId,
  receiveAmount,
  receiveTicker,
  receiveWithSlippage,
}: Props) => {
  const { account } = useCoreProvider();
  const { onSwapExactPayTokens } = useCall();
  const { fee, feeLoading } = useTransactionFee({
    extrinsicFn: () =>
      onSwapExactPayTokens([
        [receiveId, payId],
        receiveAmount,
        payAmount,
        account?.address ?? "",
      ]) as unknown as Promise<Result>,
  });

  return (
    <div className="bg-level-0 w-full border-x border-b border-primary rounded-b-md p-5 -mt-1">
      <GenericHorizontal label="Minimum received">
        {receiveWithSlippage.toFixed(5)} {receiveTicker}
      </GenericHorizontal>
      <GenericHorizontal label="Estimated fee" loading={feeLoading}>
        {fee} PDEX
      </GenericHorizontal>
    </div>
  );
};
