import { useQuery } from "@tanstack/react-query";
import { useMemo } from "react";
import { formatBalance } from "@polkadot/util";
import { SubmittableExtrinsic } from "@polkadot/api/types";
import { ISubmittableResult } from "@polkadot/types/types";

import { useCoreProvider } from "@/core";

type Result = SubmittableExtrinsic<"promise", ISubmittableResult>;
export interface TransactionFeeProps {
  extrinsicFn: () => Promise<Result>;
}

export function useTransactionFee({ extrinsicFn }: TransactionFeeProps) {
  const { api, account } = useCoreProvider();

  const enabled = useMemo(
    () =>
      !!api &&
      !!extrinsicFn &&
      typeof extrinsicFn === "function" &&
      !!account?.address,
    [api, account?.address, extrinsicFn]
  );

  const { data, isLoading, isFetching, isSuccess } = useQuery({
    enabled,
    queryKey: [!!extrinsicFn, account?.address],
    queryFn: async () => {
      if (!extrinsicFn) throw new Error("No Extrinsic");
      if (!api) throw new Error("You are not connected to blockchain");
      const extrinsic = await extrinsicFn();
      const res = await extrinsic.paymentInfo(account?.address ?? "");
      return formatBalance(res.partialFee.toNumber(), {
        decimals: 12,
        withSi: false,
        forceUnit: "-",
      });
    },
  });

  return {
    fee: data ?? 0,
    feeSuccess: isSuccess,
    feeLoading: isLoading || isFetching,
  };
}
