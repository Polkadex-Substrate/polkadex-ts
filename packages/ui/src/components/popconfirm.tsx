import { Fragment, PropsWithChildren, PropsWithoutRef } from "react";
import { InformationCircleIcon } from "@heroicons/react/24/solid";
import classNames from "classnames";
import { twMerge } from "tailwind-merge";
import * as PopoverRadix from "@radix-ui/react-popover";

import {
  isValidComponent,
  isValidComponentWithoutTarget,
  typeofChildren,
} from "../helpers";
import { getRemainingComponents } from "../helpers/getRemainingComponents";

import { Popover, PopoverContentProps, PopoverProps } from "./popover";
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
    children
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
    children
  );
};

interface ContentProps extends PopoverContentProps {
  withIcon?: boolean;
}

const Content = ({
  children,
  withIcon,
  withArrow = true,
  className,
  ...props
}: ContentProps) => {
  const [TitleComponent] = isValidComponent(children, Title);
  const [DescriptionComponent] = isValidComponent(children, Description);
  const [ButtonComponent] = isValidComponent(children, Button);
  const [CloseComponent] = isValidComponent(children, Close);

  return (
    <Popover.Content
      className={twMerge(classNames("flex gap-2 p-4"), className)}
      withArrow={withArrow}
      {...props}
    >
      {withIcon && (
        <InformationCircleIcon className="w-4 h-4 mt-1 text-attention-base" />
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
};

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
