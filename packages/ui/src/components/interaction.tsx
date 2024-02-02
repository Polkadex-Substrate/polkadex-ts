import {
  ComponentProps,
  Fragment,
  PropsWithChildren,
  PropsWithoutRef,
} from "react";
import classNames from "classnames";
import { ArrowLeftIcon, XMarkIcon } from "@heroicons/react/24/solid";
import { twMerge } from "tailwind-merge";
import { Transition } from "@headlessui/react";

import { isValidComponent, typeofChildren } from "../helpers";

import { Typography, TextProps } from "./typography";
import { Button, ButtonProps } from "./button";

interface TitleProps extends ComponentProps<"div"> {
  onBack?: () => void;
  onClose?: () => void;
  withPadding?: boolean;
  size?: TextProps["size"];
}
const Title = ({
  children,
  withPadding = true,
  onBack,
  onClose,
  className,
  size = "md",
  ...props
}: PropsWithChildren<TitleProps>) => {
  const hasBack = typeof onBack === "function";
  const hasClose = typeof onClose === "function";

  const isString = typeofChildren(children);
  return (
    <div
      className={twMerge(
        classNames(
          hasClose && "justify-between",
          withPadding && "px-7",
          "flex items-center gap-2 flex-1"
        ),
        className
      )}
      {...props}
    >
      {hasBack && (
        <Button.Icon onClick={onBack} variant="ghost" rounded>
          <ArrowLeftIcon className="text-secondary group-hover:text-current" />
        </Button.Icon>
      )}
      {isString ? (
        <Typography.Heading type="h3" size={size}>
          {children}
        </Typography.Heading>
      ) : (
        children
      )}

      {hasClose && (
        <Button.Icon onClick={onClose} variant="ghost" rounded>
          <XMarkIcon className="text-secondary group-hover:text-current" />
        </Button.Icon>
      )}
    </div>
  );
};

interface FooterProps extends ComponentProps<"div"> {
  withPadding?: boolean;
}

const Footer = ({
  children,
  className,
  withPadding = true,
  ...props
}: PropsWithChildren<FooterProps>) => {
  const [ActionComponent] = isValidComponent(children, Action);
  const [CloseComponent] = isValidComponent(children, Close);

  const customClassNames = twMerge(
    classNames(withPadding && "px-7", "flex flex-col gap-3"),
    className
  );

  if (!ActionComponent || (CloseComponent && children))
    return (
      <div className={customClassNames} {...props}>
        {children}
      </div>
    );
  return (
    <div className={customClassNames} {...props}>
      {ActionComponent}
      {CloseComponent}
    </div>
  );
};

type ActionProps = ButtonProps & ButtonProps;

const Action = ({
  children,
  size = "md",
  ...props
}: PropsWithoutRef<ActionProps>) => {
  return (
    <Button.Solid size={size} {...props}>
      {children}
    </Button.Solid>
  );
};

const Close = ({
  children,
  size = "md",
  ...props
}: PropsWithoutRef<ButtonProps>) => {
  return (
    <Button.Ghost size={size} {...props}>
      {children}
    </Button.Ghost>
  );
};

interface ContentProps extends ComponentProps<"div"> {
  onBack?: () => void;
  onClose?: () => void;
  withPadding?: boolean;
}

const Content = ({
  children,
  withPadding = true,
  className,
  ...props
}: PropsWithChildren<ContentProps>) => {
  return (
    <div
      className={twMerge(classNames(withPadding && "px-7"), className)}
      {...props}
    >
      {children}
    </div>
  );
};

export interface InteractionProps extends ComponentProps<"div"> {
  withAnimation?: boolean;
}
const Interaction = ({
  children,
  className,
  ...props
}: PropsWithChildren<InteractionProps>) => {
  const [TitleCompontent] = isValidComponent(children, Title);
  const [ContentCompontent] = isValidComponent(children, Content);
  const [FooterCompontent] = isValidComponent(children, Footer);

  return (
    <Transition
      appear
      show
      enter="transition ease duration-500 transform"
      enterFrom="opacity-0 translate-y-12"
      enterTo="opacity-100 translate-y-0"
      leave="transition ease duration-300 transform"
      leaveFrom="opacity-100 translate-y-0"
      leaveTo="opacity-0 translate-y-12"
      as={Fragment}
    >
      <div
        className={twMerge(
          classNames(
            "flex flex-col gap-5 pt-7 pb-10 w-full",
            "bg-level-3 border border-primary rounded-xl"
          ),
          className
        )}
        {...props}
      >
        {TitleCompontent}
        {ContentCompontent}
        {FooterCompontent}
      </div>
    </Transition>
  );
};

Interaction.Title = Title;
Interaction.Content = Content;
Interaction.Footer = Footer;
Interaction.Action = Action;
Interaction.Close = Close;

export { Interaction };
