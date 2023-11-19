import { ComponentProps, PropsWithChildren } from "react";
import classNames from "classnames";
import { ArrowLeftIcon, XMarkIcon } from "@heroicons/react/24/solid";
import { twMerge } from "tailwind-merge";

import { isValidComponent } from "../helpers";

import { Typography } from "./typography";
import { Button, ButtonProps } from "./button";

interface TitleProps extends ComponentProps<"div"> {
  onBack?: () => void;
  onClose?: () => void;
  withPadding?: boolean;
}
const Title = ({
  children,
  withPadding = true,
  onBack,
  onClose,
  className,
  ...props
}: PropsWithChildren<TitleProps>) => {
  const hasBack = typeof onBack === "function";
  const hasClose = typeof onClose === "function";

  return (
    <div
      className={twMerge(
        classNames(
          hasClose && "justify-between",
          withPadding && "px-7",
          "flex items-center gap-2 flex-1 px-7"
        ),
        className
      )}
      {...props}
    >
      {hasBack && (
        <Button.Icon onClick={onBack} variant="ghost" rounded>
          <ArrowLeftIcon className="text-secondary group-hover:text-textBase duration-300 transition-colors" />
        </Button.Icon>
      )}
      <Typography.Heading type="h3" size="md">
        {children}
      </Typography.Heading>
      {hasClose && (
        <Button.Icon onClick={onClose} variant="ghost" rounded>
          <XMarkIcon className="text-secondary group-hover:text-textBase duration-300 transition-colors" />
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

interface ActionProps extends ButtonProps, ComponentProps<"button"> {}

const Action = ({ children, ...props }: PropsWithChildren<ActionProps>) => {
  return (
    <Button.Solid size="md" {...props}>
      {children}
    </Button.Solid>
  );
};

const Close = ({
  children,
  ...props
}: PropsWithChildren<ComponentProps<"button">>) => {
  return (
    <Button.Ghost size="md" {...props}>
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

interface InteractionProps extends ComponentProps<"div"> {
  withAnimation?: boolean;
}
const Interaction = ({
  children,
  className,
  withAnimation = true,
  ...props
}: PropsWithChildren<InteractionProps>) => {
  const [TitleCompontent] = isValidComponent(children, Title);
  const [ContentCompontent] = isValidComponent(children, Content);
  const [FooterCompontent] = isValidComponent(children, Footer);

  return (
    <div
      className={twMerge(
        classNames(
          "flex flex-col gap-5 pt-7 pb-10 sm:w-full md:w-[23rem]",
          "bg-backgroundBase border border-primary rounded-lg",
          withAnimation && "animate-in slide-in-from-bottom-48 duration-300"
        ),
        className
      )}
      {...props}
    >
      {TitleCompontent}
      {ContentCompontent}
      {FooterCompontent}
    </div>
  );
};

Interaction.Title = Title;
Interaction.Content = Content;
Interaction.Footer = Footer;
Interaction.Action = Action;
Interaction.Close = Close;

export { Interaction };
