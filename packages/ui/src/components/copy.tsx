"use client";

import { ComponentProps, MouseEvent, PropsWithChildren, useState } from "react";
import classNames from "classnames";
import { TooltipContentProps } from "@radix-ui/react-tooltip";
import { twMerge } from "tailwind-merge";
import { RiFileCopyLine } from "@remixicon/react";

import { Tooltip } from "./tooltip";

interface CopyProps extends ComponentProps<"div"> {
  value: string | number;
  side?: TooltipContentProps["side"];
}

export const Copy = ({
  value,
  className,
  side = "top",
  children,
}: PropsWithChildren<CopyProps>) => {
  const [open, setOpen] = useState(false);
  const [state, setState] = useState(false);

  const onCopy = async (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    e.stopPropagation();
    if (!value) return;
    try {
      await navigator.clipboard.writeText(value.toString());
      if (!state) setState(true);
    } catch (error) {
      console.error("Error copying to clipboard:", error);
    }
  };

  const onMouseOut = () => state && setState(false);

  return (
    <Tooltip onOpenChange={setOpen} open={open}>
      <Tooltip.Trigger onClick={onCopy} onMouseOut={onMouseOut}>
        {children ?? (
          <RiFileCopyLine
            className={twMerge(classNames("w-3 h-3 text-secondary"), className)}
          />
        )}
      </Tooltip.Trigger>
      <Tooltip.Content
        side={side}
        onPointerDownOutside={(e) => e.preventDefault()}
      >
        {state ? "Copied" : "Copy"}
      </Tooltip.Content>
    </Tooltip>
  );
};
