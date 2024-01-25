import * as PopoverRadix from "@radix-ui/react-popover";
import { Fragment, PropsWithChildren } from "react";
import { twMerge } from "tailwind-merge";
import classNames from "classnames";
import { Slot } from "@radix-ui/react-slot";

import { isValidComponent, typeofChildren } from "../helpers";

const Close = ({
  children,
  asChild,
  ...props
}: PropsWithChildren<PopoverRadix.PopoverCloseProps>) => {
  return (
    <PopoverRadix.Close asChild={asChild} {...props}>
      {asChild ? <Slot className="flex-1">{children}</Slot> : children}
    </PopoverRadix.Close>
  );
};

const Trigger = ({
  children,
  asChild,
  className,
  ...props
}: PropsWithChildren<PopoverRadix.PopoverTriggerProps>) => {
  const isString = typeofChildren(children);
  return (
    <PopoverRadix.Trigger
      asChild={asChild}
      className={twMerge(classNames(isString && "text-sm"), className)}
      {...props}
    >
      {asChild ? <Slot>{children}</Slot> : children}
    </PopoverRadix.Trigger>
  );
};

const Content = ({
  children,
  className,
  ...props
}: PropsWithChildren<PopoverRadix.PopoverContentProps>) => {
  return (
    <PopoverRadix.Content
      className={twMerge(
        classNames(
          "z-50 shadow-md bg-level-1 rounded-md border border-primary min-w-[8rem]",
          "data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=open]:zoom-in-95",
          "data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95"
        ),
        className
      )}
      {...props}
    >
      {children}
    </PopoverRadix.Content>
  );
};

interface PopoverProps extends PopoverRadix.PopoverProps {
  withOverlay?: boolean;
}
const Popover = ({
  children,
  withOverlay,
  ...props
}: PropsWithChildren<PopoverProps>) => {
  const [TriggerComponent] = isValidComponent(children, Trigger);
  const [ContentComponent] = isValidComponent(children, Content);

  return (
    <PopoverRadix.Root {...props}>
      {TriggerComponent}
      <PopoverRadix.Portal>
        <Fragment>
          {withOverlay && (
            <div className="w-screen h-screen bg-overlay-3 inset-0 fixed animate-in" />
          )}
          {ContentComponent}
        </Fragment>
      </PopoverRadix.Portal>
    </PopoverRadix.Root>
  );
};

Popover.Trigger = Trigger;
Popover.Content = Content;
Popover.Close = Close;

export { Popover };
