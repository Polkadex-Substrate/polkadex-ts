"use client";

import { ComponentProps } from "react";
import classNames from "classnames";
import { twMerge } from "tailwind-merge";

import { appearanceVariantsClasses, fontSizeClasses } from "../helpers";

export interface LabelProps extends ComponentProps<"label"> {
  appearance?: keyof typeof appearanceVariantsClasses;
  size?: keyof typeof fontSizeClasses;
}

export const Label = ({
  children,
  className,
  appearance = "primary",
  size = "sm",
  ...props
}: LabelProps) => (
  <label
    className={twMerge(
      classNames(
        "cursor-pointer",
        appearanceVariantsClasses[appearance],
        fontSizeClasses[size]
      ),
      className
    )}
    {...props}
  >
    {children}
  </label>
);
