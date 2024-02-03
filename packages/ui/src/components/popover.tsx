import * as PopoverRadix from "@radix-ui/react-popover";
import {
  ComponentPropsWithRef,
  ComponentPropsWithoutRef,
  Fragment,
  PropsWithChildren,
  forwardRef,
} from "react";
import { twMerge } from "tailwind-merge";
import classNames from "classnames";
import { ChevronDownIcon } from "@heroicons/react/24/solid";
import { Transition } from "@headlessui/react";

import { isValidComponentWithoutTarget, typeofChildren } from "../helpers";
import { getRemainingComponents } from "../helpers/getRemainingComponents";

import { Typography } from "./typography";

const Overlay = forwardRef<
  HTMLDivElement,
  PropsWithChildren<ComponentPropsWithRef<"div">>
>(({ className, ...props }, ref) => {
  return (
    <Transition
      show
      enter="duration-300 ease-out"
      enter-from="opacity-0"
      enter-to="opacity-100"
      leave="duration-200 ease-in"
      leave-from="opacity-100"
      leave-to="opacity-0"
    >
      <div
        ref={ref}
        className={twMerge(
          classNames("w-screen h-screen bg-overlay-3 inset-0 fixed animate-in"),
          className
        )}
        {...props}
      />
    </Transition>
  );
});
Overlay.displayName = "Overlay";

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

const Close = forwardRef<
  HTMLButtonElement,
  PropsWithChildren<PopoverRadix.PopoverCloseProps>
>(({ children, ...props }, ref) => {
  return (
    <PopoverRadix.Close ref={ref} {...props}>
      {children}
    </PopoverRadix.Close>
  );
});
Close.displayName = "Close";

export interface PopoverTriggerProps
  extends PropsWithChildren<PopoverRadix.PopoverTriggerProps> {
  superpositionTrigger?: boolean;
  iconRotationAnimation?: boolean;
}

const Trigger = forwardRef<HTMLButtonElement, PopoverTriggerProps>(
  (
    {
      children,
      className,
      iconRotationAnimation = true,
      superpositionTrigger,
      asChild,
      ...props
    },
    ref
  ) => {
    const [IconComponent, RemaininigComponents] = isValidComponentWithoutTarget(
      children,
      Icon
    );

    const isString = typeofChildren(RemaininigComponents);

    return (
      <PopoverRadix.Trigger
        ref={ref}
        asChild={asChild}
        className={twMerge(
          classNames(
            "flex items-center gap-3 focus:outline-none",
            isString && "text-sm",
            !!IconComponent?.length && "justify-between",
            !!IconComponent?.length &&
              iconRotationAnimation &&
              "[&[data-state=open]>svg]:rotate-180",
            superpositionTrigger && "data-[state=open]:z-20"
          ),
          className
        )}
        {...props}
      >
        {asChild ? (
          children
        ) : (
          <Fragment>
            {isString ? (
              <Typography.Text>{RemaininigComponents}</Typography.Text>
            ) : (
              RemaininigComponents
            )}
            {IconComponent}
          </Fragment>
        )}
      </PopoverRadix.Trigger>
    );
  }
);
Trigger.displayName = "Trigger";

export interface PopoverContentProps
  extends PropsWithChildren<PopoverRadix.PopoverContentProps> {
  withArrow?: boolean;
  arrowProps?: PopoverRadix.PopoverArrowProps;
}

const Content = forwardRef<HTMLDivElement, PopoverContentProps>(
  ({ children, className, withArrow = false, arrowProps, ...props }, ref) => {
    const { className: arrowClassname, ...restProps } = arrowProps || {};

    return (
      <PopoverRadix.Content
        ref={ref}
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
    );
  }
);
Content.displayName = "Content";

export type PopoverProps = PropsWithChildren<PopoverRadix.PopoverProps>;

const Popover = ({ children, ...props }: PopoverProps) => {
  const [TriggerComponent, RemaininigComponents] =
    isValidComponentWithoutTarget(children, Trigger);

  const renderComponent = getRemainingComponents(RemaininigComponents);

  return (
    <PopoverRadix.Root {...props}>
      {TriggerComponent}
      <PopoverRadix.Portal>
        <Fragment>{renderComponent}</Fragment>
      </PopoverRadix.Portal>
    </PopoverRadix.Root>
  );
};

Popover.Trigger = Trigger;
Popover.Content = Content;
Popover.Close = Close;
Popover.Icon = Icon;
Popover.Overlay = Overlay;

export { Popover };
