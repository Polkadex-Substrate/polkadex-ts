import * as PopoverRadix from "@radix-ui/react-popover";
import { ComponentProps, Fragment, PropsWithChildren } from "react";
import { twMerge } from "tailwind-merge";
import classNames from "classnames";

import { typeofChildren } from "../helpers";

const Close = ({
  children,
  ...props
}: PropsWithChildren<PopoverRadix.PopoverCloseProps>) => {
  return <PopoverRadix.Close {...props}>{children}</PopoverRadix.Close>;
};

export type PopoverTriggerProps =
  PropsWithChildren<PopoverRadix.PopoverTriggerProps>;
const Trigger = ({ children, className, ...props }: PopoverTriggerProps) => {
  const isString = typeofChildren(children);
  return (
    <PopoverRadix.Trigger
      className={twMerge(classNames(isString && "text-sm"), className)}
      {...props}
    >
      {children}
    </PopoverRadix.Trigger>
  );
};

export interface PopoverContentProps
  extends PropsWithChildren<PopoverRadix.PopoverContentProps> {
  withArrow?: boolean;
  arrowProps?: PopoverRadix.PopoverArrowProps;
  withOverlay?: boolean;
  overlayProps?: ComponentProps<"div">;
}

const Content = ({
  children,
  className,
  withArrow = false,
  arrowProps,
  withOverlay,
  overlayProps,
  ...props
}: PopoverContentProps) => {
  const { className: arrowClassname, ...restProps } = arrowProps || {};
  const { className: overlayClassName, ...restOverlayProps } =
    overlayProps ?? {};

  return (
    <PopoverRadix.Portal>
      <Fragment>
        {withOverlay && (
          <div
            className={twMerge(
              classNames(
                "w-screen h-screen bg-overlay-3 inset-0 fixed animate-in"
              ),
              overlayClassName
            )}
            {...restOverlayProps}
          />
        )}
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
          <Fragment>
            {children}
            {withArrow && (
              <PopoverRadix.Arrow
                className={twMerge(classNames("fill-level-1"), arrowClassname)}
                {...restProps}
              />
            )}
          </Fragment>
        </PopoverRadix.Content>
      </Fragment>
    </PopoverRadix.Portal>
  );
};
export type PopoverProps = PropsWithChildren<PopoverRadix.PopoverProps>;

const Popover = ({ children, ...props }: PopoverProps) => {
  return <PopoverRadix.Root {...props}>{children}</PopoverRadix.Root>;
};

Popover.Trigger = Trigger;
Popover.Content = Content;
Popover.Close = Close;

export { Popover };
