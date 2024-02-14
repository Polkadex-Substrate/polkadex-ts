"use client";

import classNames from "classnames";

import { Typography, Token, TokensProps } from "../components";
import { tokenAppearance } from "../helpers";

export const ChainCard = ({
  title,
  description,
  icon,
}: {
  title: string;
  description: string;
  icon: TokensProps;
}) => {
  return (
    <div className={classNames("flex items-center gap-3 p-4 rounded-md")}>
      <Token
        appearance={icon as keyof typeof tokenAppearance}
        name={icon}
        size="md"
        className="rounded-full"
      />
      <div className="flex flex-col gap-1">
        <Typography.Text bold>{title}</Typography.Text>
        <Typography.Text appearance="primary">{description}</Typography.Text>
      </div>
    </div>
  );
};
