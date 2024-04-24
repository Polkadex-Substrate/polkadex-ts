"use client";

import {
  Button,
  Input,
  Skeleton,
  Token,
  Typography,
  tokenAppearance,
} from "@polkadex/ux";
import { RiArrowDropDownFill } from "@remixicon/react";
import { ComponentProps, useMemo } from "react";
import classNames from "classnames";
import { parseScientific, trimFloat } from "@polkadex/numericals";

import { useCoreProvider } from "@/core";
interface Props extends ComponentProps<"input"> {
  action?: (e: string) => void;
  label: string;
  tokenTicker: string;
  openInteraction: () => void;
  assetId: string;
  actionDisabled?: boolean;
  existential?: number;
}
export const SwapCard = ({
  actionDisabled,
  action,
  id,
  tokenTicker,
  label,
  openInteraction,
  assetId,
  existential,
  ...props
}: Props) => {
  const { balancesSuccess, balances, isLogged } = useCoreProvider();

  const asset = useMemo(
    () => balances?.find((e) => e.id === assetId)?.balance,
    [balances, assetId]
  );
  const balance = useMemo(() => {
    const trimmedBalance = trimFloat({ value: asset?.toString() ?? "" });
    return parseScientific(trimmedBalance);
  }, [asset]);

  return (
    <div
      className={classNames(
        action ? "rounded-t-md" : "rounded-b-md",
        "flex-1 flex flex-col border border-primary"
      )}
    >
      <div className="flex items-center justify-between pr-4">
        <div className="p-3 flex-1">
          <Input.Vertical
            placeholder="0.00"
            className="w-full"
            id={id}
            {...props}
          >
            <Input.Label size="sm" htmlFor={id}>
              {label}
            </Input.Label>
          </Input.Vertical>
        </div>
        <div
          className="w-fit h-fit rounded-full bg-level-1 border border-primary hover:bg-level-3 flex items-center gap-2 max-sm:p-1 sm:px-1 transition-colors duration-200 cursor-pointer"
          role="button"
          onClick={openInteraction}
        >
          <Token
            size="lg"
            name={tokenTicker}
            appearance={tokenTicker as keyof typeof tokenAppearance}
            className="border border-primary rounded-full"
          />

          <div className="flex items-center justify-between gap-1 flex-1">
            <div className="flex flex-col">
              <Typography.Text bold className="whitespace-nowrap">
                {tokenTicker}
              </Typography.Text>
            </div>
            <RiArrowDropDownFill className="w-8 h-8 text-secondary-hover" />
          </div>
        </div>
      </div>
      {isLogged && assetId && (
        <div className="flex items-center gap-2 flex-1 pb-4 px-3">
          <Skeleton loading={!balancesSuccess} className="max-w-20 min-h-5">
            <div className="flex items-center gap-1">
              <Typography.Text size="xs" appearance="primary">
                Balance
              </Typography.Text>
              <Typography.Text size="xs">{balance}</Typography.Text>
            </div>
          </Skeleton>
          {balance && assetId && action && (
            <Button.Light
              appearance="tertiary"
              size="2xs"
              onClick={(e) => {
                const balanceNum = Number(balance);
                if (!balanceNum || !existential) {
                  action?.("");
                  return;
                }
                const value = balanceNum - existential;
                e.preventDefault();
                if (balanceNum > value) {
                  const trimmedBalance = trimFloat({ value });
                  const formattedBalance = parseScientific(
                    trimmedBalance.toString()
                  );
                  action?.(formattedBalance);
                }
              }}
              disabled={actionDisabled}
            >
              MAX
            </Button.Light>
          )}
        </div>
      )}
    </div>
  );
};
