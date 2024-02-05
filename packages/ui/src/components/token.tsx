"use client";

import { ComponentProps } from "react";
import { twMerge } from "tailwind-merge";
import classNames from "classnames";

import * as Tokens from "../tokens";
import {
  SizesVariants,
  TokenAppearance,
  sizesVariants,
  tokenAppearance,
} from "../helpers";

export type TokensProps = keyof typeof Tokens;
interface Props extends ComponentProps<"svg"> {
  name: string;
  appearance?: TokenAppearance;
  size?: SizesVariants;
}

export const Token = ({
  name,
  appearance,
  size,
  className,
  ...props
}: Props) => {
  const tokenUppercase = name?.toUpperCase();
  const tokenTicker = (
    tokenUppercase in Tokens ? tokenUppercase : "UNKN"
  ) as keyof typeof Tokens;

  const IconComponent = Tokens[tokenTicker];

  return (
    <IconComponent
      className={twMerge(
        classNames(
          appearance && tokenAppearance[appearance],
          size && sizesVariants[size]
        ),
        className
      )}
      {...props}
    />
  );
};
