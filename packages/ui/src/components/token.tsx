"use client";

import { ComponentProps } from "react";
import { twMerge } from "tailwind-merge";
import classNames from "classnames";

import * as Tokens from "../tokens";
import { SizesVariants, sizesVariants, tokenAppearance } from "../helpers";

import { Skeleton } from "./skeleton";

export type TokensProps = keyof typeof Tokens;
interface Props extends ComponentProps<"svg"> {
  name: string;
  appearance?: string;
  bordered?: boolean;
  rounded?: boolean;
  size?: SizesVariants;
  loading?: boolean;
}

export const Token = ({
  name,
  appearance,
  size = "md",
  loading,
  bordered,
  rounded,
  className,
  ...props
}: Props) => {
  const iconUppercase = name?.toUpperCase();

  const iconName = (
    iconUppercase in Tokens ? iconUppercase : "UNKN"
  ) as keyof typeof Tokens;

  const IconComponent = Tokens[iconName];
  const initialAppearance = appearance ?? "UNKN";
  const iconAppearance = (
    initialAppearance in tokenAppearance ? initialAppearance : "UNKN"
  ) as keyof typeof tokenAppearance;

  return (
    <Skeleton
      loading={loading}
      className={classNames(
        "flex-none",
        sizesVariants[size],
        rounded && "rounded-full"
      )}
    >
      <IconComponent
        className={twMerge(
          classNames(
            tokenAppearance[iconAppearance],
            sizesVariants[size],
            bordered && "border border-secondary",
            rounded && "rounded-full"
          ),
          className
        )}
        {...props}
      />
    </Skeleton>
  );
};
