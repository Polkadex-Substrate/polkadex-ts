"use client";

import * as ToggleGroupRadix from "@radix-ui/react-toggle-group";
import { ComponentPropsWithoutRef, ElementRef, forwardRef } from "react";
import classNames from "classnames";
import { twMerge } from "tailwind-merge";

import { typeofChildren } from "../helpers";

import { Typography } from "./typography";

const Item = forwardRef<
  ElementRef<typeof ToggleGroupRadix.Item>,
  ComponentPropsWithoutRef<typeof ToggleGroupRadix.Item>
>(({ children, className, ...props }, ref) => {
  const isString = typeofChildren(children);
  return (
    <ToggleGroupRadix.Item
      ref={ref}
      className={twMerge(
        classNames(
          "inline-flex items-center justify-center disabled:pointer-events-none disabled:opacity-50shadow-sm duration-300 transition-colors ",
          "px-3 py-1 rounded-sm hover:bg-level-3 text-primary hover:text-white data-[state=on]:bg-level-2 data-[state=on]:text-white"
        ),
        className
      )}
      {...props}
    >
      {isString ? <Typography.Text>{children}</Typography.Text> : children}
    </ToggleGroupRadix.Item>
  );
});
Item.displayName = "Item";

const ToggleGroup = ({
  children,
  className,
  ...props
}: ComponentPropsWithoutRef<typeof ToggleGroupRadix.Root>) => {
  return (
    <ToggleGroupRadix.Root
      className={twMerge(
        classNames(
          "p-1 flex items-center justify-center gap-1 bg-level-1 rounded-md border border-primary"
        ),
        className
      )}
      {...props}
    >
      {children}
    </ToggleGroupRadix.Root>
  );
};

ToggleGroup.Item = Item;

export { ToggleGroup };
