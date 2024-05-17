"use client";

import classNames from "classnames";

import { Skeleton, Typography, Token } from "../components";

export const TokenCard = ({
  icon,
  ticker,
  tokenName,
  disabled,
  loading,
  balance = "0.00",
}: {
  icon: string;
  ticker: string;
  tokenName: string;
  disabled?: boolean;
  balance?: number | string;
  loading?: boolean;
}) => {
  return (
    <div
      className={classNames(
        "flex-1 flex item-center justify-between gap-2",
        disabled && "opacity-50"
      )}
    >
      <div className="flex items-center gap-3">
        <Token name={icon} rounded appearance={icon} />
        <div className="flex flex-col gap-0.5">
          <Typography.Text>{ticker}</Typography.Text>
          <Typography.Text
            appearance="primary"
            size="xs"
            className="whitespace-nowrap lowercase first-letter:uppercase max-sm:hidden"
          >
            {tokenName}
          </Typography.Text>
        </div>
      </div>
      <Skeleton loading={loading} className="max-w-20 max-h-5">
        <Typography.Text size="xs" appearance="primary" className="self-center">
          {balance} {ticker}
        </Typography.Text>
      </Skeleton>
    </div>
  );
};
