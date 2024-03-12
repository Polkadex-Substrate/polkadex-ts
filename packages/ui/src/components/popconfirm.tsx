"use client";

import {
  ComponentPropsWithoutRef,
  ElementRef,
  forwardRef,
  Fragment,
  PropsWithChildren,
  PropsWithoutRef,
} from "react";
import classNames from "classnames";
import { twMerge } from "tailwind-merge";
import { RiInformationLine } from "@remixicon/react";

import {
  isValidComponent,
  isValidComponentWithoutTarget,
  typeofChildren,
} from "../helpers";
import { getRemainingComponents } from "../helpers/getRemainingComponents";

import { Popover, PopoverProps } from "./popover";
import { TextProps, Typography } from "./typography";
import { Base, ButtonProps } from "./button";

const Close = ({
  children,
  variant = "ghost",
  appearance = "secondary",
  className = "px-4",
  size = "2sm",
  ...props
}: PropsWithoutRef<ButtonProps>) => {
  return (
    <Popover.Close asChild>
      <Base
        variant={variant}
        size={size}
        appearance={appearance}
        className={className}
        {...props}
      >
        {children}
      </Base>
    </Popover.Close>
  );
};

const Button = ({
  children,
  variant = "solid",
  appearance = "primary",
  className,
  size = "2sm",
  ...props
}: PropsWithoutRef<ButtonProps>) => {
  return (
    <Base
      variant={variant}
      size={size}
      appearance={appearance}
      className={twMerge(classNames("px-4"), className)}
      {...props}
    >
      {children}
    </Base>
  );
};

const Description = ({
  children,
  size = "sm",
  appearance = "primary",
  ...props
}: PropsWithChildren<TextProps>) => {
  const isString = typeofChildren(children);
  return isString ? (
    <Typography.Text size={size} appearance={appearance} {...props}>
      {children}
    </Typography.Text>
  ) : (
    <Fragment>{children}</Fragment>
  );
};

const Title = ({
  children,
  size = "base",
  bold = true,
  ...props
}: PropsWithChildren<TextProps>) => {
  const isString = typeofChildren(children);
  return isString ? (
    <Typography.Text size={size} bold={bold} {...props}>
      {children}
    </Typography.Text>
  ) : (
    <Fragment>{children}</Fragment>
  );
};

interface ContentProps
  extends ComponentPropsWithoutRef<typeof Popover.Content> {
  withIcon?: boolean;
}

const Content = forwardRef<ElementRef<typeof Popover.Content>, ContentProps>(
  ({ children, withIcon, withArrow = true, className, ...props }, ref) => {
    const [TitleComponent] = isValidComponent(children, Title);
    const [DescriptionComponent] = isValidComponent(children, Description);
    const [ButtonComponent] = isValidComponent(children, Button);
    const [CloseComponent] = isValidComponent(children, Close);

    return (
      <Popover.Content
        ref={ref}
        className={twMerge(classNames("flex gap-2 p-4"), className)}
        withArrow={withArrow}
        {...props}
      >
        {withIcon && (
          <RiInformationLine className="w-4 h-4 mt-1 text-attention-base" />
        )}
        <div className="flex flex-col gap-4">
          <div className="flex flex-col">
            {TitleComponent}
            {DescriptionComponent}
          </div>

          <div className="flex-1 flex items-center justify-end gap-2 w-full">
            {CloseComponent}
            {ButtonComponent}
          </div>
        </div>
      </Popover.Content>
    );
  }
);
Content.displayName = "Content";

const PopConfirm = ({
  children,
  ...props
}: PropsWithChildren<PopoverProps>) => {
  const [TriggerComponent, RemaininigComponents] =
    isValidComponentWithoutTarget(children, Popover.Trigger);
  const renderComponent = getRemainingComponents(RemaininigComponents);

  return (
    <Popover {...props}>
      {TriggerComponent}
      {renderComponent}
    </Popover>
  );
};

PopConfirm.Trigger = Popover.Trigger;
PopConfirm.Content = Content;
PopConfirm.Button = Button;
PopConfirm.Title = Title;
PopConfirm.Description = Description;
PopConfirm.Close = Close;
PopConfirm.Overlay = Popover.Overlay;

export { PopConfirm };
