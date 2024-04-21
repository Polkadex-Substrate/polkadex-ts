// TODO: Improve animation Fix focus - should be onChange
// TODO: Integrate Formik
"use client";

import {
  Button,
  Dropdown,
  Icons,
  Skeleton,
  Spinner,
  Typography,
} from "@polkadex/ux";
import { AnimatePresence, motion } from "framer-motion";
import { Fragment, MouseEvent, useCallback, useMemo, useState } from "react";

import {
  SwapCard,
  SwapTransactionInfo,
  SelectPayAsset,
  SelectReceiveAsset,
} from "@/components";
import { useGetPrice, useSwap } from "@/hooks";
import { useCoreProvider } from "@/core";

const slippageValues = [0.5, 1, 1.5, 2, 3, 4, 5, 10];
export function Swap() {
  const [slippage, setSlippage] = useState(slippageValues[0]);
  const [payFocus, setPayFocus] = useState(true);

  const [showPayAssetPopup, setShowPayAssetPopup] = useState(false);
  const [showReceiveAssetPopup, setShowReceiveAssetPopup] = useState(false);

  const {
    api,
    setShowConnectAccount,
    account,
    isLogged,
    balancesLoading,
    pools,
  } = useCoreProvider();
  const { swapLoading, onSwap } = useSwap();

  const {
    unitPrice,
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
  } = useGetPrice();

  const onHandleSwap = async (e: MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    e.preventDefault();
    if (payFocus) await handleChangeAmount(baseValue, true);
    else await handleChangePrice(quoteValue, true);
    setBaseAsset(() => quoteAsset ?? null);
    setQuoteAsset(() => baseAsset ?? null);
    setPayFocus(!payFocus);
  };

  const receiveWithSlippage = useMemo(
    () => Number(quoteValue) * (1 - (slippage || 0) / 100),
    [quoteValue, slippage]
  );

  const handleSwap = useCallback(async () => {
    await onSwap({
      payId: baseAsset?.id ?? "",
      payAmount: Number(baseValue),
      receiveId: quoteAsset?.id ?? "",
      receiveAmount: receiveWithSlippage,
    });
    setBaseValue("");
    setQuoteValue("");
  }, [
    onSwap,
    quoteAsset?.id,
    baseAsset?.id,
    baseValue,
    receiveWithSlippage,
    setBaseValue,
    setQuoteValue,
  ]);

  const balancesIsLoading = useMemo(
    () => (isLogged ? balancesLoading : false),
    [balancesLoading, isLogged]
  );

  const enableAction = useMemo(
    () =>
      !!baseAsset?.id &&
      !!quoteAsset?.id &&
      !!baseValue &&
      !!quoteValue &&
      !!api &&
      !!enoughtBalance &&
      !swapLoading,
    [
      baseAsset?.id,
      quoteAsset?.id,
      baseValue,
      quoteValue,
      api,
      enoughtBalance,
      swapLoading,
    ]
  );

  const loading = useMemo(
    () => balancesIsLoading || swapLoading || !api,
    [balancesIsLoading, swapLoading, api]
  );

  const swapButtonText = enoughtBalance
    ? "Swap"
    : `Insufficient ${baseAsset?.ticker} balance`;
  const buttonText =
    !!quoteAsset && !!baseAsset ? swapButtonText : "Select a token";

  return (
    <Fragment>
      <SelectPayAsset
        onSelectToken={(e) => {
          if (quoteAsset) {
            const existsPool = pools?.find((v) => v.base.id === e.id);
            const hasReserve = pools?.find((a) => a.quote.id === quoteAsset.id)
              ?.base.reserve;

            if (!hasReserve || !existsPool) setQuoteAsset(null);
          }
          setBaseAsset(e);
          setShowPayAssetPopup(false);
        }}
        open={showPayAssetPopup}
        onOpenChange={setShowPayAssetPopup}
        baseId={baseAsset?.id ?? ""}
      />
      <SelectReceiveAsset
        onSelectToken={(e) => {
          setQuoteAsset(e);
          setShowReceiveAssetPopup(false);
        }}
        open={showReceiveAssetPopup}
        onOpenChange={setShowReceiveAssetPopup}
        baseId={baseAsset?.id ?? ""}
        quoteId={quoteAsset?.id ?? ""}
      />
      <motion.div className="max-w-[550px] transition-transform flex flex-col w-full mb-6">
        <div className="relative bg-level-0 w-full flex flex-col gap-8 border border-primary rounded-md max-sm:p-2 sm:p-5">
          <div className="flex flex-col gap-3">
            <div className="flex flex-col">
              <SwapCard
                assetId={baseAsset?.id ?? ""}
                tokenTicker={baseAsset?.ticker ?? "Select token"}
                label="You pay"
                id="pay"
                action={(e) => handleChangePrice(e)}
                actionDisabled={!account}
                openInteraction={() => setShowPayAssetPopup(true)}
                onChange={(e) => handleChangePrice(e.target.value)}
                value={baseValue}
                type="number"
                autoComplete="off"
                onFocus={() => !payFocus && setPayFocus(true)}
                existential={existential}
              />
              <Button.Icon
                onClick={onHandleSwap}
                variant="solid"
                appearance="secondary"
                rounded
                className="z-10 flex items-center justify-center w-10 h-10 self-center bg-level-1 border-x border-primary -mt-[21px] -mb-[21px]"
              >
                <Icons.Trading className=" rotate-90 w-4 h-4" />
              </Button.Icon>
              <SwapCard
                assetId={quoteAsset?.id ?? ""}
                tokenTicker={quoteAsset?.ticker ?? "Select token"}
                label="You receive"
                id="receive"
                openInteraction={() => setShowReceiveAssetPopup(true)}
                onChange={(e) => handleChangeAmount(e.target.value)}
                value={receiveWithSlippage || ""}
                type="number"
                autoComplete="off"
                onFocus={() => payFocus && setPayFocus(false)}
              />
            </div>
            <div className="flex items-center justify-between gap-2">
              {unitPriceLoading || unitPriceSuccess ? (
                <Skeleton
                  loading={unitPriceLoading}
                  className="max-w-20 min-h-5"
                >
                  <Typography.Text size="xs" appearance="primary">
                    1 {baseAsset?.ticker} = {unitPrice} {quoteAsset?.ticker}
                  </Typography.Text>
                </Skeleton>
              ) : (
                <div />
              )}
              <div>
                <Dropdown>
                  <Dropdown.Trigger className="gap-1">
                    <Typography.Text size="xs" appearance="primary">
                      Max. slippage: {slippage}%
                    </Typography.Text>
                    <Dropdown.Icon />
                  </Dropdown.Trigger>
                  <Dropdown.Content className="max-h-52 overflow-auto scrollbar-hide">
                    {slippageValues.map((e) => (
                      <Dropdown.Item key={e} onSelect={() => setSlippage(e)}>
                        <Typography.Text size="xs">{e}%</Typography.Text>
                      </Dropdown.Item>
                    ))}
                  </Dropdown.Content>
                </Dropdown>
              </div>
            </div>
          </div>
          {isLogged ? (
            <Button.Solid
              onClick={enableAction ? handleSwap : undefined}
              className="w-full"
              disabled={!enableAction}
            >
              {loading ? <Spinner.Keyboard className="w-5 h-5" /> : buttonText}
            </Button.Solid>
          ) : (
            <Button.Solid
              onClick={() => setShowConnectAccount(true)}
              className="w-full"
            >
              Connect wallet
            </Button.Solid>
          )}
        </div>
        <AnimatePresence>
          {enableAction && (
            <SwapTransactionInfo
              payId={baseAsset?.id ?? ""}
              payAmount={parseFloat(baseValue)}
              receiveId={quoteAsset?.id ?? ""}
              receiveAmount={parseFloat(quoteValue)}
              receiveWithSlippage={receiveWithSlippage}
              receiveTicker={quoteAsset?.ticker ?? ""}
            />
          )}
        </AnimatePresence>
      </motion.div>
    </Fragment>
  );
}
