"use client";

import * as TooltipRadix from "@radix-ui/react-tooltip";
import { PropsWithChildren } from "react";
import { twMerge } from "tailwind-merge";
import classNames from "classnames";

import { isValidComponent } from "../helpers";

const Trigger = ({
  children,
  ...props
}: PropsWithChildren<TooltipRadix.TooltipTriggerProps>) => {
  return <TooltipRadix.Trigger {...props}>{children}</TooltipRadix.Trigger>;
};

const Content = ({
  children,
  className,
  sideOffset = 12,
  ...props
}: PropsWithChildren<TooltipRadix.TooltipContentProps>) => {
  return (
    <TooltipRadix.Content
      sideOffset={sideOffset}
      className={twMerge(
        classNames(
          "p-2 bg-level-1 rounded-md border border-primary text-sm",
          "z-50 overflow-hidden shadow-md animate-in fade-in-0 zoom-in-95 ",
          "data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=open]:zoom-in-95",
          "data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95"
        ),
        className
      )}
      {...props}
    >
      {children}
    </TooltipRadix.Content>
  );
};

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
