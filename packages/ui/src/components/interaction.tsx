"use client";

import {
  ComponentProps,
  PropsWithChildren,
  PropsWithoutRef,
  ReactNode,
} from "react";
import classNames from "classnames";
import { twMerge } from "tailwind-merge";
import { RiArrowLeftLine, RiCloseLine } from "@remixicon/react";

import { typeofChildren } from "../helpers";

import { Typography, TextProps } from "./typography";
import { Button, ButtonProps } from "./button";
interface GenericAction extends Omit<ButtonProps, "ref"> {
  icon?: ReactNode;
}
interface TitleProps extends ComponentProps<"div"> {
  onBack?: GenericAction;
  onClose?: GenericAction;
  withPadding?: boolean;
  size?: TextProps["size"];
}
const Title = ({
  children,
  withPadding = true,
  onBack,
  onClose,
  className,
  size = "base",
  ...props
}: PropsWithChildren<TitleProps>) => {
  const hasBack = !!Object.keys(onBack ?? {}).length;
  const hasClose = !!Object.keys(onClose ?? {}).length;

  const isString = typeofChildren(children);
  const { icon: backIcon, ...onBackProps } = onBack ?? {};
  const { icon: closeIcon, ...onCloseProps } = onClose ?? {};

  return (
    <div
      className={twMerge(
        classNames(
          hasClose && "justify-between",
          withPadding && hasClose && "pl-7 pr-4",
          withPadding && hasBack && "pr-7 pl-4",
          "flex items-center gap-2 flex-1"
        ),
        className
      )}
      {...props}
    >
      {hasBack && (
        <Button.Icon variant="ghost" rounded {...onBackProps}>
          {backIcon ?? (
            <RiArrowLeftLine className="w-full h-full text-secondary group-hover:text-white" />
          )}
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
        <Button.Icon size="md" variant="ghost" rounded {...onCloseProps}>
          {closeIcon ?? (
            <RiCloseLine className="w-full h-full text-secondary group-hover:text-white" />
          )}
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
  return (
    <div
      className={twMerge(
        classNames(withPadding && "px-7", "flex flex-col gap-3"),
        className
      )}
      {...props}
    >
      {children}
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
  appearance = "secondary",
  ...props
}: PropsWithoutRef<ButtonProps>) => {
  return (
    <Button.Ghost appearance={appearance} size={size} {...props}>
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

export type InteractionProps = ComponentProps<"div">;

const Interaction = ({ children, className, ...props }: InteractionProps) => {
  return (
    <div
      className={twMerge(
        classNames(
          "flex flex-col gap-5 pt-7 pb-10 w-full",
          "bg-backgroundBase border border-primary rounded-sm w-[22rem] max-sm:w-screen"
        ),
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
};

Interaction.Title = Title;
Interaction.Content = Content;
Interaction.Footer = Footer;
Interaction.Action = Action;
Interaction.Close = Close;

export { Interaction };
