"use client";

import {
  Input,
  Interaction,
  Modal,
  Separator,
  Spinner,
  Token,
  TokenAppearance,
  Typography,
} from "@polkadex/ux";
import {
  SetStateAction,
  Dispatch,
  useCallback,
  useState,
  useMemo,
  useEffect,
} from "react";

import { Position, useCoreProvider } from "@/core";
import { useRemoveLiquidity } from "@/hooks";

const slippage = 0.5;
export const RemoveLiquidity = ({
  open,
  onOpenChange,
  tempPosition,
}: {
  open: boolean;
  onOpenChange: Dispatch<SetStateAction<boolean>>;
  tempPosition: Position | null;
}) => {
  const { onRemoveLiquidity, removeLiquidityLoading } = useRemoveLiquidity();
  const { isLogged } = useCoreProvider();
  const handleClose = useCallback(() => onOpenChange(false), [onOpenChange]);
  const [range, setRange] = useState(0);

  const calculateAmount = useCallback((value: number, range: number) => {
    const amountToDeduct = (value * (100 - range)) / 100;
    return value - amountToDeduct;
  }, []);

  const removePooledBase = useMemo(() => {
    const value = tempPosition?.base.amount ?? 0;
    const amount = value * (1 - (slippage || 0) / 100);
    return range ? calculateAmount(amount, range) : value;
  }, [tempPosition?.base.amount, range, calculateAmount]);

  const removePooledQuote = useMemo(() => {
    const value = tempPosition?.quote.amount ?? 0;
    const amount = value * (1 - (slippage || 0) / 100);
    return range ? calculateAmount(amount, range) : value;
  }, [tempPosition?.quote.amount, range, calculateAmount]);

  const removePooledLpToken = useMemo(() => {
    const amount = tempPosition?.lpToken ?? 0;
    return range ? calculateAmount(amount, range) : amount;
  }, [tempPosition?.lpToken, range, calculateAmount]);

  const disabled = useMemo(
    () =>
      !tempPosition ||
      !tempPosition?.quote.amount ||
      !tempPosition?.base.amount ||
      removeLiquidityLoading ||
      !isLogged ||
      !range,
    [tempPosition, removeLiquidityLoading, isLogged, range]
  );

  const handleRemoveLiquidity = useCallback(async () => {
    await onRemoveLiquidity({
      baseId: tempPosition?.base?.id ?? "",
      quoteId: tempPosition?.quote?.id ?? "",
      lpTokenBurnAmount: removePooledLpToken.toString(),
      baseMinAmount: removePooledBase.toString(),
      quoteMinAmount: removePooledQuote.toString(),
    });
    onOpenChange(false);
  }, [
    onOpenChange,
    onRemoveLiquidity,
    removePooledBase,
    removePooledLpToken,
    removePooledQuote,
    tempPosition?.base?.id,
    tempPosition?.quote?.id,
  ]);

  useEffect(() => {
    if (!open && range) setRange(0);
  }, [setRange, open, range]);

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
            Remove liquidity
          </Interaction.Title>
          <Interaction.Content className="flex flex-col gap-5">
            <div className="flex items-center gap-2">
              <div className="flex items-end">
                <Token
                  name={tempPosition?.base.ticker as string}
                  size="sm"
                  className="rounded-full border border-secondary"
                />
                <Token
                  name={tempPosition?.quote.ticker as string}
                  size="sm"
                  className="rounded-full -ml-2"
                  appearance={tempPosition?.quote.ticker as TokenAppearance}
                />
              </div>
              <Typography.Text size="md" className="font-medium">
                {tempPosition?.base.ticker} / {tempPosition?.quote.ticker}
              </Typography.Text>
            </div>
            <div className="flex-1 flex flex-col gap-2 p-3 border border-primary">
              <Input.Vertical
                placeholder="0.00"
                className="w-full text-xl"
                id="amount"
                value={`${range}%`}
              >
                <Input.Label size="sm" htmlFor="amount">
                  Amount
                </Input.Label>
                <Input.Action
                  appearance="secondary"
                  onClick={() => setRange(100)}
                >
                  Max
                </Input.Action>
              </Input.Vertical>
              <input
                type="range"
                min="0"
                max="100"
                value={range}
                onChange={(e) => setRange(Number(e.currentTarget.value))}
              />
            </div>
            <div></div>
            <div className="flex-1 flex flex-col gap-3 p-3 border border-primary bg-level-0">
              <div className="flex items-center justify-between gap-2">
                <Typography.Text appearance="primary">
                  LP Tokens
                </Typography.Text>
                <Typography.Text>
                  {removePooledLpToken.toFixed(5)}
                </Typography.Text>
              </div>
              <Separator.Horizontal />
              <div className="flex items-center justify-between gap-2">
                <div className="flex items-center gap-1">
                  <Token
                    name={tempPosition?.base.ticker as string}
                    size="2xs"
                    className="rounded-full border border-secondary"
                  />
                  <Typography.Text appearance="primary">
                    Pooled {tempPosition?.base.ticker}
                  </Typography.Text>
                </div>
                <Typography.Text>{removePooledBase.toFixed(5)}</Typography.Text>
              </div>
              <div className="flex items-center justify-between gap-2">
                <div className="flex items-center gap-1">
                  <Token
                    name={tempPosition?.quote.ticker as string}
                    size="2xs"
                    className="rounded-full border border-secondary"
                    appearance={tempPosition?.quote.ticker as TokenAppearance}
                  />
                  <Typography.Text appearance="primary">
                    Pooled {tempPosition?.quote.ticker}
                  </Typography.Text>
                </div>
                <Typography.Text>
                  {removePooledQuote.toFixed(5)}
                </Typography.Text>
              </div>
            </div>
          </Interaction.Content>
          <Interaction.Footer>
            <Interaction.Action
              disabled={disabled}
              onClick={handleRemoveLiquidity}
            >
              {removeLiquidityLoading ? (
                <Spinner.Keyboard className="w-5 h-5" />
              ) : (
                "Remove Liquidity"
              )}
            </Interaction.Action>
            <Interaction.Close onClick={handleClose}>Cancel</Interaction.Close>
          </Interaction.Footer>
        </Interaction>
      </Modal.Content>
    </Modal>
  );
};
