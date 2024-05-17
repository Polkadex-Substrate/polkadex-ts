// TODO: Remove component validations

"use client";

import {
  ComponentProps,
  ComponentPropsWithoutRef,
  ElementRef,
  PropsWithChildren,
  PropsWithoutRef,
  forwardRef,
  useRef,
  Fragment,
} from "react";
import classNames from "classnames";
import { twMerge } from "tailwind-merge";
import { RiAddLine, RiSearchLine, RiSubtractLine } from "@remixicon/react";

import { isValidComponent } from "../helpers";

import { Button as PolkadexButton } from "./button";
import type { ButtonProps as PolkadexButtonProps } from "./button";
import { TextProps, Typography } from "./typography";
import { LabelProps, Label as LabelPolkadex } from "./label";

const Action = forwardRef<
  HTMLButtonElement,
  PropsWithoutRef<PolkadexButtonProps>
>(({ size = "xs", appearance = "secondary", children, ...props }, ref) => (
  <PolkadexButton.Solid
    ref={ref}
    size={size}
    appearance={appearance}
    {...props}
  >
    {children}
  </PolkadexButton.Solid>
));

Action.displayName = "Action";

const Base = forwardRef<ElementRef<"input">, ComponentPropsWithoutRef<"input">>(
  ({ className, ...props }, ref) => {
    return (
      <input
        ref={ref}
        size={props.placeholder?.length}
        type="text"
        className={twMerge(
          classNames(
            "flex-1 bg-transparent text-white placeholder:text-secondary outline-none max-sm:focus:text-[16px]"
          ),
          className
        )}
        {...props}
      />
    );
  }
);

Base.displayName = "Base";

interface InputWithContainerProps extends ComponentPropsWithoutRef<"input"> {
  containerProps?: ComponentProps<"div">;
}
const Primary = forwardRef<ElementRef<"input">, InputWithContainerProps>(
  ({ children, className, containerProps, ...props }) => {
    const ref = useRef<HTMLInputElement>(null);
    const ButtonComponents = isValidComponent(children, Button);
    const [LabelComponent] = isValidComponent(children, Label);
    const [TickerComponent] = isValidComponent(children, Ticker);

    const { className: containerClassName } = containerProps ?? {};
    return (
      <div
        className={twMerge(
          classNames(
            "flex-1 flex justify-between items-center gap-2 bg-level-1 h-[40px] rounded-sm"
          ),
          containerClassName
        )}
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          ref?.current?.focus();
        }}
        {...containerProps}
      >
        <div className="flex flex-1 items-center justify-between gap-2 pl-3 pr-2">
          <div className="flex items-center gap-2">
            {LabelComponent}
            <Base
              ref={ref}
              className={twMerge(classNames("text-sm"), className)}
              {...props}
            />
          </div>
          {TickerComponent}
        </div>
        {!!ButtonComponents?.length && (
          <div className="flex h-full flex-col gap-0.5">{ButtonComponents}</div>
        )}
      </div>
    );
  }
);

Primary.displayName = "Primary";

interface ButtonProps extends ComponentProps<"button"> {
  variant?: "increase" | "decrease";
}

const Button = ({
  variant,
  children,
  className,
  disabled,
  ...props
}: PropsWithChildren<ButtonProps>) => {
  const isDecrease = variant === "decrease";
  return children ? (
    <Fragment>{children} </Fragment>
  ) : (
    <button
      className={twMerge(
        classNames(
          "flex-auto px-3 bg-level-3 duration-100 transition-colors",
          isDecrease ? "rounded-br rounded-tl" : "rounded-tr rounded-bl",
          disabled ? "opacity-50" : "hover:h-full hover:bg-level-2 ",
          isDecrease && !disabled && "active:bg-danger-base",
          !isDecrease && !disabled && "active:bg-success-base"
        ),
        className
      )}
      {...props}
    >
      {variant === "increase" ? (
        <RiAddLine className="w-3 h-3" />
      ) : (
        <RiSubtractLine className="w-3 h-3" />
      )}
    </button>
  );
};

const Ticker = ({
  children,
  size = "xs",
  ...props
}: PropsWithChildren<TextProps>) => (
  <Typography.Text size={size} {...props}>
    {children}
  </Typography.Text>
);

const Label = ({
  appearance = "primary",
  size = "sm",
  ...props
}: PropsWithChildren<LabelProps>) => (
  <LabelPolkadex appearance={appearance} size={size} {...props} />
);

const Search = forwardRef<ElementRef<"input">, InputWithContainerProps>(
  ({ containerProps, className, ...props }, ref) => {
    const { className: containerClassName } = containerProps ?? {};
    return (
      <div
        className={twMerge(
          classNames("flex flex-1 items-center gap-2"),
          containerClassName
        )}
      >
        <RiSearchLine className="w-4 h-4 text-primary" />
        <Base
          ref={ref}
          className={twMerge(classNames("text-sm"), className)}
          {...props}
        />
      </div>
    );
  }
);
Search.displayName = "Search";

const Vertical = ({
  id,
  children,
  containerProps,
  className,
  ...props
}: InputWithContainerProps) => {
  const LabelComponent = isValidComponent(children, Label);
  const ButtonComponent = isValidComponent(children, Action);

  const { className: containerClassName } = containerProps ?? {};
  return (
    <div
      className={twMerge(
        classNames("flex flex-col gap-2 w-full"),
        containerClassName
      )}
    >
      {LabelComponent}
      <div className="flex items-center justify-between gap-2 flex-1">
        <Base
          id={id}
          className={twMerge(classNames("text-lg font-medium"), className)}
          {...props}
        />
        {ButtonComponent}
      </div>
    </div>
  );
};

export const Input = {
  Primary,
  Search,
  Vertical,
  Button,
  Label,
  Ticker,
  Action,
};
