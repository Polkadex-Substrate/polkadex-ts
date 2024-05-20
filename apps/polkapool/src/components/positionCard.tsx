"use client";

import { Typography, Button, Token, TokenAppearance } from "@polkadex/ux";
import { RiAddLine, RiDeleteBinLine } from "@remixicon/react";

export const PositionCard = ({
  onAddLiquidity,
  onRemoveLiquidity,
  baseTicker,
  quoteTicker,
  baseLiquidity,
  quoteLiquidity,
  LpTokens,
}: {
  onAddLiquidity: () => void;
  onRemoveLiquidity: () => void;
  baseTicker: string;
  quoteTicker: string;
  baseLiquidity: string;
  quoteLiquidity: string;
  LpTokens: string;
}) => {
  return (
    <div className="flex sm:items-center justify-between max-sm:flex-col gap-2 bg-level-0 border border-primary rounded-md px-4 py-5 group overflow-hidden">
      <div className="flex items-center gap-2">
        <div className="flex items-end">
          <Token
            name={quoteTicker}
            size="lg"
            className="rounded-full"
            appearance={quoteTicker as TokenAppearance}
          />
          <Token
            name={baseTicker}
            size="2xs"
            className="rounded-full border bg-level-0 border-secondary -ml-2"
          />
        </div>
        <div className="flex flex-col">
          <Typography.Text size="md" className="font-medium">
            {baseTicker} / {quoteTicker}
          </Typography.Text>
          <div className="flex items-center gap-1">
            <Typography.Text size="xs" appearance="secondary">
              {baseLiquidity} {baseTicker}
            </Typography.Text>
            <Typography.Text size="xs" appearance="secondary">
              /
            </Typography.Text>
            <Typography.Text size="xs" appearance="secondary">
              {quoteLiquidity} {quoteTicker}
            </Typography.Text>
          </div>
        </div>
      </div>
      <div className="flex items-center gap-3">
        <div className="flex items-center gap-2">
          <Typography.Text appearance="primary">LP Tokens:</Typography.Text>
          <Typography.Text>{LpTokens}</Typography.Text>
        </div>
        <div className="flex items-center gap-1 group-hover:visible group-hover:scale-100 group-hover:w-auto invisible scale-0 w-0 transition-transform duration-200">
          <Button.Icon variant="light" rounded onClick={onRemoveLiquidity}>
            <RiDeleteBinLine className="w-full h-full" />
          </Button.Icon>
          <Button.Icon variant="light" rounded onClick={onAddLiquidity}>
            <RiAddLine className="w-full h-full" />
          </Button.Icon>
        </div>
      </div>
    </div>
  );
};
