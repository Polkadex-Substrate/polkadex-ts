"use client";

import { ComponentProps } from "react";
import { twMerge } from "tailwind-merge";
import classNames from "classnames";

import * as Chains from "../chains";
import { SizesVariants, sizesVariants } from "../helpers";

import { Skeleton } from ".";

interface ChainProps extends ComponentProps<"svg"> {
  name: string | keyof typeof Chains;
  size?: SizesVariants;
  loading?: boolean;
}

export const Chain = ({
  name,
  size = "md",
  loading,
  className,
  ...props
}: ChainProps) => {
  const iconName = (name in Chains ? name : "Unknown") as keyof typeof Chains;
  const IconComponent = Chains[iconName];

  return (
    <Skeleton loading={loading} className={sizesVariants[size]}>
      <IconComponent
        className={twMerge(
          classNames("text-textBase", sizesVariants[size]),
          className
        )}
        {...props}
      />
    </Skeleton>
  );
};
