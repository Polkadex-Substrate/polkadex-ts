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

export type IconsProps = keyof typeof Icons;

interface Props extends ComponentProps<"div"> {
  name?: IconsProps;
  appearance?: AppearanceBackgroundVariants;
  size?: SizesVariants;
}

export const Icon = ({
  name,
  size = "md",
  className,
  appearance,
  children,
  ...props
}: PropsWithChildren<Props>) => {
  const initialName = name ?? "Unknown";
  const IconComponent = Icons[initialName];

  return (
    <div
      className={twMerge(
        classNames(
          "flex items-center justify-center",
          sizesVariants[size],
          appearance && `bg-${appearance}`
        ),
        className
      )}
      {...props}
    >
      {children || <IconComponent className="w-full h-full" />}
    </div>
  );
};
