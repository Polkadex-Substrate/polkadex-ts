"use client";

import { useQuery } from "@tanstack/react-query";
import { useCallback, useEffect, useMemo, useState } from "react";
import { SwapApi } from "@polkadex/polkadex-api";

import { Asset, useCoreProvider } from "@/core";
import {
  EXISTENTIAL_OTHERS,
  EXISTENTIAL_PDEX,
  parseScientific,
  trimFloat,
} from "@/constants";
import { polkadexAsset } from "@/core/utils";
export const slippageValues = [0.5, 1, 1.5, 2, 3, 4, 5, 10];

export function useGetPrice() {
  const [slippage, setSlippage] = useState(slippageValues[0]);
  const { balances, swapApi } = useCoreProvider();

  const [baseAsset, setBaseAsset] = useState<Asset | null>(polkadexAsset);
  const [baseValue, setBaseValue] = useState("");
  const [quoteValue, setQuoteValue] = useState("");
  const [quoteAsset, setQuoteAsset] = useState<Asset | null>(null);

  const isPDEx = useMemo(() => baseAsset?.id === "POLKADEX", [baseAsset?.id]);
  const existential = useMemo(
    () => (isPDEx ? EXISTENTIAL_PDEX : EXISTENTIAL_OTHERS),
    [isPDEx]
  );

  const enoughtBalance = useMemo(() => {
    const selectedTokenBalance = balances?.find(
      (e) => e.id === baseAsset?.id
    )?.balance;

    return (
      Number(baseValue) <= Number(selectedTokenBalance) - Number(existential)
    );
  }, [balances, existential, baseValue, baseAsset?.id]);

  const enabled = useMemo(
    () => !!swapApi && !!quoteAsset && !!baseAsset,
    [swapApi, quoteAsset, baseAsset]
  );

  const handleChangePrice = useCallback(
    async (value: string, swap = false) => {
      if (!swapApi) return;

      const payId = baseAsset?.id;
      const receiveId = quoteAsset?.id;

      const valueNumber = parseFloat(value);
      const isValidNumber = !isNaN(valueNumber);

      setBaseValue(value);
      if (payId && receiveId && isValidNumber && !!valueNumber) {
        const result = await swapApi.quotePriceExactTokensForTokens(
          swap ? receiveId : payId,
          swap ? payId : receiveId,
          valueNumber
        );
        const trimmedBalance = trimFloat({ value: result });
        const formattedBalance = parseScientific(trimmedBalance.toString());
        setQuoteValue(formattedBalance);
      } else if (quoteValue) setQuoteValue("");
    },
    [baseAsset?.id, quoteAsset?.id, swapApi, quoteValue]
  );

  const handleChangeAmount = useCallback(
    async (value: string, swap = false) => {
      if (!swapApi) return;
      const payId = baseAsset?.id;
      const receiveId = quoteAsset?.id;
      const valueNumber = parseFloat(value);
      const isValidNumber = !isNaN(valueNumber);

      setQuoteValue(value);

      if (payId && receiveId && isValidNumber && !!valueNumber) {
        const result = await swapApi.quotePriceTokensForExactTokens(
          swap ? receiveId : payId,
          swap ? payId : receiveId,
          valueNumber
        );

        const trimmedBalance = trimFloat({ value: result });
        const formattedBalance = parseScientific(trimmedBalance.toString());
        setBaseValue(formattedBalance);
      } else if (baseValue) setBaseValue("");
    },
    [baseAsset?.id, quoteAsset?.id, swapApi, baseValue]
  );

  const {
    data: unitPrice,
    isSuccess: unitPriceSuccess,
    isLoading: unitPriceLoading,
  } = useQuery({
    queryKey: ["getBalance", baseAsset?.id, quoteAsset?.id, !!swapApi],
    enabled,
    queryFn: async () => {
      if (!baseAsset || !quoteAsset) return;
      return await (swapApi as SwapApi).quotePriceExactTokensForTokens(
        baseAsset.id,
        quoteAsset.id,
        1
      );
    },
  });

  useEffect(() => {
    if (parseFloat(baseValue) > 0 && !quoteValue && !!baseAsset)
      handleChangePrice(baseValue);
  }, [handleChangePrice, baseValue, quoteValue, baseAsset]);

  useEffect(() => {
    if (!baseValue && parseFloat(quoteValue) > 0 && !!quoteAsset)
      handleChangeAmount(quoteValue);
  }, [handleChangeAmount, baseValue, quoteValue, quoteAsset]);

  return {
    unitPrice: unitPrice?.toFixed(unitPrice > 0 ? 4 : 2),
    unitPriceLoading,
    unitPriceSuccess,
    handleChangeAmount,
    handleChangePrice,
    enoughtBalance,
    baseAsset,
    setBaseAsset,
    quoteAsset,
    setQuoteAsset,
    baseValue,
    setBaseValue,
    quoteValue,
    setQuoteValue,
    existential,
    slippage,
    setSlippage,
  };
}
