import { ComponentProps, PropsWithChildren } from "react";
import ClassNames from "classnames";
import { ArrowLeftIcon, XMarkIcon } from "@heroicons/react/24/solid";
import { twMerge } from "tailwind-merge";

import { isValidComponent } from "../helpers/isValidComponent";

import { Typography } from "./typography";
import { Button } from "./button";

const Title = ({
  children,
  onBack,
  onClose,
}: PropsWithChildren<{ onBack?: () => void; onClose?: () => void }>) => {
  const hasBack = typeof onBack === "function";
  const hasClose = typeof onClose === "function";

  return (
    <div
      className={ClassNames(
        hasClose && "justify-between",
        "flex items-center gap-2 flex-1"
      )}
    >
      {hasBack && (
        <button
          className="w-8 h-8 p-1 hover:bg-level-3 rounded-full duration-300 transition-colors group"
          onClick={onBack}
        >
          <ArrowLeftIcon className="text-secondary group-hover:text-textBase duration-300 transition-colors" />
        </button>
      )}
      <Typography.Heading type="h3" size="lg">
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

const Footer = ({
  children,
  className,
  ...props
}: PropsWithChildren<ComponentProps<"div">>) => {
  const [ActionComponent] = isValidComponent(children, Action);
  const [CloseComponent] = isValidComponent(children, Close);

  return (
    <div
      className={twMerge(ClassNames("flex flex-col gap-3", className))}
      {...props}
    >
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

export const Interaction = {
  Title,
  Footer,
  Action,
  Close,
};
