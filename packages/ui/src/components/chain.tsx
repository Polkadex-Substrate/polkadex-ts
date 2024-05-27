"use client";

import { ComponentProps } from "react";
import { twMerge } from "tailwind-merge";
import classNames from "classnames";

import * as Chains from "../chains";
import { SizesVariants, sizesVariants } from "../helpers";

import { Skeleton } from ".";

interface ChainProps extends ComponentProps<"svg"> {
  name: string;
  size?: SizesVariants;
  loading?: boolean;
  bordered?: boolean;
  rounded?: boolean;
}

export const Chain = ({
  name,
  size = "md",
  loading,
  bordered,
  rounded,
  className,
  ...props
}: ChainProps) => {
  const iconName = (name in Chains ? name : "Unknown") as keyof typeof Chains;
  const IconComponent = Chains[iconName];

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
            "text-textBase",
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
