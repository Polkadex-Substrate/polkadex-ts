"use client";

import {
  Button,
  Dropdown,
  Input,
  Interaction,
  Modal,
  Spinner,
  Token,
  TokenAppearance,
  Typography,
} from "@polkadex/ux";
import {
  SetStateAction,
  Dispatch,
  useCallback,
  useMemo,
  useEffect,
} from "react";
import { parseScientific, trimFloat } from "@polkadex/numericals";

import { Position, useCoreProvider } from "@/core";
import { useAddLiquidity, useGetPrice } from "@/hooks";
import { EXISTENTIAL_OTHERS, EXISTENTIAL_PDEX } from "@/constants";
export const AddLiquidity = ({
  open,
  onOpenChange,
  tempPosition,
}: {
  open: boolean;
  onOpenChange: Dispatch<SetStateAction<boolean>>;
  tempPosition: Position | null;
}) => {
  const { balances, assets, isLogged } = useCoreProvider();
  const {
    handleChangeAmount,
    handleChangePrice,
    baseAsset,
    quoteAsset,
    setQuoteAsset,
    baseValue,
    quoteValue,
    setQuoteValue,
    slippage,
    setBaseValue,
  } = useGetPrice();

  const { onAddLiquidity, addLiquidityLoading } = useAddLiquidity();

  const baseBalance = useMemo(
    () => balances?.find(({ id }) => id === baseAsset?.id),
    [balances, baseAsset?.id]
  );

  const quoteBalance = useMemo(
    () => balances?.find(({ id }) => id === quoteAsset?.id),
    [balances, quoteAsset?.id]
  );

  const receiveWithSlippage = useMemo(
    () => Number(quoteValue) * (1 - (slippage || 0) / 100),
    [quoteValue, slippage]
  );
  const handleClose = useCallback(() => onOpenChange(false), [onOpenChange]);

  const enoughtBalance = useMemo(() => {
    const baseBal = Number(baseBalance?.balance) ?? 0;
    const quoteBal = Number(quoteBalance?.balance) ?? 0;

    const enoughtBaseBalance = Number(baseValue) <= baseBal - EXISTENTIAL_PDEX;

    const enoughtQuoteBalance =
      Number(quoteValue) < quoteBal - EXISTENTIAL_OTHERS;

    return enoughtBaseBalance && enoughtQuoteBalance;
  }, [quoteBalance?.balance, baseBalance?.balance, baseValue, quoteValue]);

  const buttonText = useMemo(() => {
    const AddLiquidityText =
      !!quoteValue && !!baseValue && !enoughtBalance
        ? "Insufficient balance"
        : "Add Liquidity";

    return !!quoteAsset && !!baseAsset ? AddLiquidityText : "Select a token";
  }, [baseAsset, quoteAsset, enoughtBalance, quoteValue, baseValue]);

  const disabled = useMemo(
    () =>
      !baseValue ||
      !quoteValue ||
      !quoteAsset ||
      !baseAsset ||
      !isLogged ||
      addLiquidityLoading ||
      !enoughtBalance,

    [
      baseValue,
      quoteAsset,
      quoteValue,
      isLogged,
      baseAsset,
      enoughtBalance,
      addLiquidityLoading,
    ]
  );

  const handleMax = useCallback(
    async (
      balance: number,
      existential: number,
      callback: (e: string) => Promise<void>
    ) => {
      const value = balance - existential;
      const trimmedBalance = trimFloat({ value });
      const formattedBalance = parseScientific(trimmedBalance.toString());
      await callback(formattedBalance);
    },
    []
  );

  const handleAddLiquidity = useCallback(async () => {
    await onAddLiquidity({
      baseId: baseAsset?.id ?? "",
      quoteId: quoteAsset?.id ?? "",
      baseMaxAmount: Number(baseValue) * 1.01,
      quoteMaxAmount: Number(quoteValue) * 1.01,
      baseMinAmount: Number(baseValue),
      quoteMinAmount: Number(receiveWithSlippage),
    });
    onOpenChange(false);
  }, [
    onAddLiquidity,
    quoteValue,
    baseAsset?.id,
    baseValue,
    quoteAsset?.id,
    receiveWithSlippage,
    onOpenChange,
  ]);

  useEffect(() => {
    if (!open && (quoteAsset || quoteValue || baseValue)) {
      setQuoteAsset(null);
      setQuoteValue("");
      setBaseValue("");
    }
  }, [
    quoteAsset,
    open,
    quoteValue,
    baseValue,
    setQuoteAsset,
    setQuoteValue,
    setBaseValue,
  ]);

  useEffect(() => {
    if (tempPosition && !quoteAsset) {
      const { id, name, ticker } = tempPosition.quote ?? {};
      setQuoteAsset({
        id,
        name,
        ticker,
        decimals: 12,
      });
    }
  }, [setQuoteAsset, quoteAsset, tempPosition]);

  return (
    <Modal
      open={open}
      onOpenChange={onOpenChange}
      closeOnClickOutside
      placement="center left"
      className="top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
    >
      <Modal.Content>
        <Interaction className="w-full sm:min-w-[24rem] sm:max-w-[24rem] rounded-md">
          <Interaction.Title onClose={{ onClick: () => onOpenChange(false) }}>
            Add liquidity
          </Interaction.Title>
          <Interaction.Content className="flex flex-col gap-5">
            <div className="flex flex-col gap-4">
              <Typography.Text appearance="secondary" size="xs">
                1. Amounts
              </Typography.Text>
              <div className="flex flex-col gap-3">
                <div className="flex flex-col gap-2 border border-primary bg-level-0 rounded-sm p-4">
                  <div className="flex items-center justify-between gap-2">
                    <Input.Vertical
                      className="w-full text-xl"
                      placeholder="0.00"
                      type="number"
                      autoComplete="off"
                      value={baseValue}
                      onChange={(e) => handleChangePrice(e.target.value)}
                    />
                    <div className="flex items-center gap-2 rounded-md bg-backgroundBase border border-primary pr-4">
                      <Token
                        name={baseAsset?.ticker as string}
                        appearance={baseAsset?.ticker as TokenAppearance}
                        size="md"
                        className="border-r border-primary"
                      />
                      <Typography.Text>{baseAsset?.ticker}</Typography.Text>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Typography.Text appearance="primary" size="xs">
                      Balance: {baseBalance?.balance.toFixed(5)}{" "}
                      {baseAsset?.ticker}
                    </Typography.Text>
                    <Button.Light
                      appearance="tertiary"
                      size="2xs"
                      onClick={async (e) => {
                        const balance = baseBalance?.balance ?? 0;
                        e.preventDefault();
                        await handleMax(
                          balance,
                          EXISTENTIAL_PDEX,
                          handleChangePrice
                        );
                      }}
                    >
                      MAX
                    </Button.Light>
                  </div>
                </div>
                <div className="flex flex-col gap-2 border border-primary bg-level-0 rounded-sm p-4">
                  <div className="flex items-center justify-between gap-2">
                    <Input.Vertical
                      className="w-full text-xl"
                      placeholder="0.00"
                      onChange={(e) => handleChangeAmount(e.target.value)}
                      value={receiveWithSlippage || ""}
                      type="number"
                      autoComplete="off"
                    />
                    <Dropdown>
                      <Dropdown.Trigger className="rounded-md bg-backgroundBase border border-primary pr-1">
                        {quoteAsset ? (
                          <div className="flex items-center gap-2">
                            <Token
                              name={quoteAsset.ticker}
                              appearance={quoteAsset.ticker as TokenAppearance}
                              size="md"
                              className="border-r border-primary"
                            />
                            <Typography.Text className="whitespace-nowrap">
                              {quoteAsset.ticker}
                            </Typography.Text>
                          </div>
                        ) : (
                          <Typography.Text className="whitespace-nowrap pl-2 py-2">
                            Select token
                          </Typography.Text>
                        )}

                        <Dropdown.Icon />
                      </Dropdown.Trigger>
                      <Dropdown.Content className="overflow-auto max-h-52 scrollbar-hide">
                        {assets?.map((e) => {
                          if (e.id === baseAsset?.id) return null;
                          const data = balances?.find((val) => val.id === e.id);
                          const trimmedBalance = trimFloat({
                            value: data?.balance ?? "",
                          });
                          const formattedBalance = parseScientific(
                            trimmedBalance.toString()
                          );

                          return (
                            <Dropdown.Item
                              key={e.id}
                              className="flex justify-between items-center gap-8"
                              onSelect={() => {
                                if (quoteValue) setQuoteValue("");
                                setQuoteAsset(e);
                              }}
                              disabled={!data?.balance}
                            >
                              <div className="flex items-center gap-3">
                                <Token
                                  name={e.ticker}
                                  appearance={e.ticker as TokenAppearance}
                                  className="border border-primary"
                                  size="xs"
                                />
                                <Typography.Text size="xs">
                                  {e.ticker}
                                </Typography.Text>
                              </div>
                              <Typography.Text size="xs" appearance="primary">
                                {formattedBalance}
                              </Typography.Text>
                            </Dropdown.Item>
                          );
                        })}
                      </Dropdown.Content>
                    </Dropdown>
                  </div>
                  {quoteAsset && (
                    <div className="flex items-center gap-2">
                      <Typography.Text appearance="primary" size="xs">
                        Balance: {quoteBalance?.balance.toFixed(5)}{" "}
                        {quoteAsset?.ticker}
                      </Typography.Text>
                      <Button.Light
                        appearance="tertiary"
                        size="2xs"
                        onClick={async (e) => {
                          const balance = quoteBalance?.balance ?? 0;
                          e.preventDefault();
                          await handleMax(
                            balance,
                            EXISTENTIAL_OTHERS,
                            handleChangeAmount
                          );
                        }}
                      >
                        MAX
                      </Button.Light>
                    </div>
                  )}
                </div>
              </div>
            </div>
            {/* <div className="flex flex-col gap-4">
              <Typography.Text appearance="secondary" size="xs">
                2. Range
              </Typography.Text>
              <Dropdown>
                <Dropdown.Trigger className="p-4 border border-primary rounded-sm ">
                  <div className="flex flex-col gap-1">
                    <Typography.Text bold>Beginner</Typography.Text>
                    <Typography.Text appearance="primary" size="xs">
                      ~0.5% APR
                    </Typography.Text>
                  </div>
                  <Dropdown.Icon />
                </Dropdown.Trigger>
              </Dropdown>
            </div> */}
          </Interaction.Content>
          <Interaction.Footer className="border-t border-primary">
            <Interaction.Action
              disabled={disabled}
              onClick={handleAddLiquidity}
            >
              {addLiquidityLoading ? (
                <Spinner.Keyboard className="w-5 h-5" />
              ) : (
                buttonText
              )}
            </Interaction.Action>
            <Interaction.Close onClick={handleClose}>Cancel</Interaction.Close>
          </Interaction.Footer>
        </Interaction>
      </Modal.Content>
    </Modal>
  );
};
