"use client";

import * as TooltipRadix from "@radix-ui/react-tooltip";
import {
  ComponentPropsWithoutRef,
  ElementRef,
  forwardRef,
  Fragment,
  PropsWithChildren,
} from "react";
import { twMerge } from "tailwind-merge";
import classNames from "classnames";

import { isValidComponent, typeofChildren } from "../helpers";

import { Typography } from "./typography";

const Trigger = forwardRef<
  ElementRef<typeof TooltipRadix.Trigger>,
  ComponentPropsWithoutRef<typeof TooltipRadix.Trigger>
>(({ children, ...props }, ref) => {
  return (
    <TooltipRadix.Trigger ref={ref} {...props}>
      {children}
    </TooltipRadix.Trigger>
  );
});
Trigger.displayName = "Trigger";

const Content = forwardRef<
  ElementRef<typeof TooltipRadix.Content>,
  ComponentPropsWithoutRef<typeof TooltipRadix.Content>
>(({ children, className, sideOffset = 12, ...props }, ref) => {
  const isString = typeofChildren(children);

  return (
    <TooltipRadix.Content
      ref={ref}
      sideOffset={sideOffset}
      className={twMerge(
        classNames(
          "p-2 bg-level-1 rounded-md border border-primary",
          "z-50 overflow-hidden shadow-md animate-in fade-in-0 zoom-in-95 ",
          "data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=open]:zoom-in-95",
          "data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95"
        ),
        className
      )}
      {...props}
    >
      <Fragment>
        {isString ? (
          <Typography.Text size="sm">{children}</Typography.Text>
        ) : (
          children
        )}
      </Fragment>
    </TooltipRadix.Content>
  );
});
Content.displayName = "Content";

const Tooltip = ({
  children,
  delayDuration = 150,
  ...props
}: PropsWithChildren<TooltipRadix.TooltipProps>) => {
  const [TriggerComponent] = isValidComponent(children, Trigger);
  const [ContentComponent] = isValidComponent(children, Content);

  return (
    <TooltipRadix.Provider delayDuration={delayDuration}>
      <TooltipRadix.Root {...props}>
        {TriggerComponent}
        <TooltipRadix.Portal>{ContentComponent}</TooltipRadix.Portal>
      </TooltipRadix.Root>
    </TooltipRadix.Provider>
  );
};

Tooltip.Trigger = Trigger;
Tooltip.Content = Content;

export { Tooltip };
