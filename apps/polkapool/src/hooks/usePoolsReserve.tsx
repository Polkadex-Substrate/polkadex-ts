"use client";

import { useQuery } from "@tanstack/react-query";
import { useMemo } from "react";

import { Asset, useCoreProvider } from "@/core";

export interface PoolReserve extends Asset {
  reserve: number;
}
export function usePoolsReserve({ baseId }: { baseId: string }) {
  const { assetApi, assets, swapApi } = useCoreProvider();

  const enabled = useMemo(
    () => !!assetApi && !!assets && !!baseId,
    [assetApi, baseId, assets]
  );

  const {
    data: poolsReserve,
    isSuccess: poolsReserveSuccess,
    isLoading: poolsReserveLoading,
  } = useQuery({
    queryKey: ["getPoolsReserve", baseId],
    enabled,
    queryFn: async () => {
      if (!assets || !swapApi) return;
      const poolReserves = await Promise.all(
        assets.map(async (e) => {
          if (e.id !== "PDEX") {
            const reserve = await swapApi?.getReserves(baseId, e.id);
            return {
              ...e,
              reserve: reserve.base,
            };
          } else {
            return {
              ...e,
              reserve: 1,
            };
          }
        })
      );

      return poolReserves
        .sort((a, b) => Number(b.ticker) - Number(a.ticker))
        .sort((a, b) => Number(b.reserve) - Number(a.reserve));
    },
  });

  return {
    poolsReserve,
    poolsReserveLoading,
    poolsReserveSuccess,
  };
}
