import * as PopoverRadix from "@radix-ui/react-popover";
import {
  ComponentPropsWithoutRef,
  Fragment,
  PropsWithChildren,
  forwardRef,
} from "react";
import { twMerge } from "tailwind-merge";
import classNames from "classnames";
import { ChevronDownIcon } from "@heroicons/react/24/solid";

import { isValidComponentWithoutTarget, typeofChildren } from "../helpers";

import { Typography } from "./typography";

const Icon = forwardRef<
  SVGSVGElement,
  PropsWithChildren<ComponentPropsWithoutRef<"svg">>
>(({ className, children, ...props }, ref) => {
  return (
    children ?? (
      <ChevronDownIcon
        ref={ref}
        className={twMerge(
          classNames("h-4 w-4 transition-transform duration-300 text-primary"),
          className
        )}
        {...props}
      />
    )
  );
});
Icon.displayName = "Icon";

const Close = ({
  children,
  ...props
}: PropsWithChildren<PopoverRadix.PopoverCloseProps>) => {
  return <PopoverRadix.Close {...props}>{children}</PopoverRadix.Close>;
};

export interface PopoverTriggerProps
  extends PropsWithChildren<PopoverRadix.PopoverTriggerProps> {
  superpositionTrigger?: boolean;
  iconRotationAnimation?: boolean;
}

const Trigger = ({
  children,
  className,
  iconRotationAnimation = true,
  ...props
}: PopoverTriggerProps) => {
  const [IconComponent, RemaininigComponents] = isValidComponentWithoutTarget(
    children,
    Icon
  );

  const isString = typeofChildren(RemaininigComponents);

  return (
    <PopoverRadix.Trigger
      className={twMerge(
        classNames(
          "flex items-center gap-3 focus:outline-none",
          isString && "text-sm",
          !!IconComponent && "justify-between",
          !!IconComponent &&
            iconRotationAnimation &&
            "[&[data-state=open]>svg]:rotate-180"
        ),
        className
      )}
      {...props}
    >
      <Fragment>
        {isString ? (
          <Typography.Text>{RemaininigComponents}</Typography.Text>
        ) : (
          RemaininigComponents
        )}
        {IconComponent}
      </Fragment>
    </PopoverRadix.Trigger>
  );
};

export interface PopoverContentProps
  extends PropsWithChildren<PopoverRadix.PopoverContentProps> {
  withArrow?: boolean;
  arrowProps?: PopoverRadix.PopoverArrowProps;
}

const Content = ({
  children,
  className,
  withArrow = false,
  arrowProps,
  ...props
}: PopoverContentProps) => {
  const { className: arrowClassname, ...restProps } = arrowProps || {};

  return (
    <PopoverRadix.Portal>
      <Fragment>
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
Popover.Icon = Icon;

export { Popover };
