"use client";

import * as SeparatorRadix from "@radix-ui/react-separator";
import classNames from "classnames";
import { ComponentPropsWithoutRef, ElementRef, forwardRef } from "react";
import { twMerge } from "tailwind-merge";

import { themeConfig } from "../../../../themeConfig";

const Horizontal = (props: Omit<SeparatorProps, "orientation">) => {
  return <Base orientation="horizontal" {...props} />;
};

const Vertical = (props: Omit<SeparatorProps, "orientation">) => {
  return <Base orientation="vertical" {...props} />;
};
interface SeparatorProps
  extends ComponentPropsWithoutRef<typeof SeparatorRadix.Root> {
  appearance?: keyof typeof themeConfig.theme.extend.backgroundColor;
}

const Base = forwardRef<ElementRef<typeof SeparatorRadix.Root>, SeparatorProps>(
  ({ orientation, className, appearance = "level-3", ...props }, ref) => {
    const bgColor = `bg-${appearance}`;
    return (
      <SeparatorRadix.Root
        ref={ref}
        className={twMerge(
          classNames(
            bgColor,
            orientation === "horizontal" ? "h-px w-full" : "w-px h-full"
          ),
          className
        )}
        {...props}
      />
    );
  }
);
Base.displayName = "Base";
export const Separator = {
  Horizontal,
  Vertical,
};
