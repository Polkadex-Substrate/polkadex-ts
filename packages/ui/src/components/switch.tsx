"use client";

import { PropsWithChildren } from "react";
import classNames from "classnames";
import { twMerge } from "tailwind-merge";
import * as SwitchRadix from "@radix-ui/react-switch";

export const Switch = ({
  children,
  id,
  className,
  disabled,
  ...props
}: PropsWithChildren<SwitchRadix.SwitchProps>) => {
  return (
    <div className="flex items-center gap-2 group">
      <SwitchRadix.Root
        disabled={disabled}
        className={twMerge(
          classNames(
            "h-5 w-8 rounded-full cursor-pointer",
            "border-transparent transition-colors focus-visible:outline-none",
            "data-[state=unchecked]:bg-level-4 data-[state=unchecked]:group-hover:bg-level-2 border-none",
            "data-[state=checked]:bg-primary-base ",
            disabled && "data-[state=unchecked]:cursor-not-allowed "
          ),
          className
        )}
        {...props}
      >
        <SwitchRadix.Thumb
          className={classNames(
            "block h-[14px] w-[14px] rounded-full bg-level-0 data-[state=checked]:bg-white",
            "transition-transform data-[state=checked]:translate-x-[15px] data-[state=unchecked]:translate-x-[3px]"
          )}
          id={id}
        />
      </SwitchRadix.Root>
      {children && (
        <label htmlFor={id} className="font-semibold">
          {children}
        </label>
      )}
    </div>
  );
};
