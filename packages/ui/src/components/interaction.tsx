import { ComponentProps, PropsWithChildren } from "react";
import classNames from "classnames";
import { ArrowLeftIcon, XMarkIcon } from "@heroicons/react/24/solid";
import { twMerge } from "tailwind-merge";

import { isValidComponent } from "../helpers";

import { Typography } from "./typography";
import { Button } from "./button";

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
        <button
          className="w-8 h-8 p-1 hover:bg-level-3 rounded-full duration-300 transition-colors group"
          onClick={onBack}
        >
          <ArrowLeftIcon className="text-secondary group-hover:text-textBase duration-300 transition-colors" />
        </button>
      )}
      <Typography.Heading type="h3" size="md">
        {children}
      </Typography.Heading>
      {hasClose && (
        <button
          className="w-8 h-8 p-1 hover:bg-level-3 rounded-full duration-300 transition-colors group"
          onClick={onClose}
        >
          <XMarkIcon className="text-secondary group-hover:text-textBase duration-300 transition-colors" />
        </button>
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

const Action = ({
  children,
  ...props
}: PropsWithChildren<ComponentProps<"button">>) => {
  return (
    <Button.Primary size="md" {...props}>
      {children}
    </Button.Primary>
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
const Interaction = ({
  children,
  className,
  ...props
}: PropsWithChildren<ComponentProps<"div">>) => {
  const [TitleCompontent] = isValidComponent(children, Title);
  const [ContentCompontent] = isValidComponent(children, Content);
  const [FooterCompontent] = isValidComponent(children, Footer);

  return (
    <div
      className={twMerge(
        classNames(
          "flex flex-col gap-5 pt-7 pb-10 max-w-sm w-full",
          "bg-level-1 border border-primary rounded-lg"
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