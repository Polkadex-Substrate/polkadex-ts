"use client";

import { ComponentProps, PropsWithChildren } from "react";
import { twMerge } from "tailwind-merge";
import classNames from "classnames";

import * as Icons from "../icons";
import {
  AppearanceBackgroundVariants,
  SizesVariants,
  sizesVariants,
} from "../helpers";

import { Skeleton } from "./skeleton";

export type IconsProps = keyof typeof Icons;

interface Props extends ComponentProps<"div"> {
  name?: IconsProps;
  appearance?: AppearanceBackgroundVariants;
  size?: SizesVariants;
  bordered?: boolean;
  rounded?: boolean;
  loading?: boolean;
}

export const Icon = ({
  name,
  size = "md",
  className,
  appearance,
  loading,
  bordered,
  rounded,
  children,
  ...props
}: PropsWithChildren<Props>) => {
  const initialName = name ?? "Unknown";
  const IconComponent = Icons[initialName];

  return (
    <Skeleton
      loading={loading}
      className={classNames(
        "flex-none",
        sizesVariants[size],
        rounded && "rounded-full"
      )}
    >
      <div
        className={twMerge(
          classNames(
            "flex items-center justify-center",
            sizesVariants[size],
            appearance && `bg-${appearance}`,
            bordered && "border border-secondary",
            rounded && "rounded-full"
          ),
          className
        )}
        {...props}
      >
        {children || <IconComponent className="w-full h-full" />}
      </div>
    </Skeleton>
  );
};
