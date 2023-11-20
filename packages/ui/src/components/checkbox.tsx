import { PropsWithChildren } from "react";
import * as CheckboxRadix from "@radix-ui/react-checkbox";
import classNames from "classnames";
import { twMerge } from "tailwind-merge";

import { Check } from "../icons";

import { Typography } from "./typography";

const Base = ({
  className,
  children,
  disabled,
  id,
  ...props
}: PropsWithChildren<CheckboxRadix.CheckboxProps>) => {
  const isChildrenString = typeof children === "string";
  return (
    <label htmlFor={id} className={"flex items-center gap-2 group"}>
      <CheckboxRadix.Root
        id={id}
        disabled={disabled}
        className={twMerge(
          classNames(
            "h-4 w-4 rounded border duration-300 transition-colors",
            "data-[state=unchecked]:group-hover:border-current",
            disabled && "data-[state=unchecked]:cursor-not-allowed"
          ),
          className
        )}
        {...props}
      >
        <CheckboxRadix.Indicator className="flex items-center justify-center">
          <Check className="h-[10px] w-[10px]" />
        </CheckboxRadix.Indicator>
      </CheckboxRadix.Root>
      {children &&
        (isChildrenString ? (
          <Typography.Text bold>{children}</Typography.Text>
        ) : (
          children
        ))}
    </label>
  );
};

const Solid = ({
  className,
  ...props
}: PropsWithChildren<CheckboxRadix.CheckboxProps>) => (
  <Base
    className={twMerge(
      classNames(
        "data-[state=unchecked]:bg-level-4 data-[state=unchecked]:group-hover:bg-level-2 border-none",
        "data-[state=checked]:bg-primary-base data-[state=checked]:text-primary-foreground",
        className
      )
    )}
    {...props}
  />
);

const Outline = ({
  className,
  ...props
}: PropsWithChildren<CheckboxRadix.CheckboxProps>) => (
  <Base
    className={twMerge(
      classNames(
        "border-2 border-primary data-[state=unchecked]:group-hover:border-current",
        "data-[state=checked]:border-primary-base data-[state=checked]:text-primary-base data-[state=checked]:border",
        className
      )
    )}
    {...props}
  />
);
export const Checkbox = {
  Solid,
  Outline,
};
