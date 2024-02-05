import { ComponentPropsWithoutRef, ElementRef, forwardRef } from "react";
import * as CheckboxRadix from "@radix-ui/react-checkbox";
import classNames from "classnames";
import { twMerge } from "tailwind-merge";

import { Check } from "../icons";

import { Label as LabelPolkadex } from "./label";

const Base = forwardRef<
  ElementRef<typeof CheckboxRadix.Root>,
  ComponentPropsWithoutRef<typeof CheckboxRadix.Root>
>(({ className, children, disabled, id, ...props }, ref) => (
  <div className={"flex items-center gap-2 group"}>
    <CheckboxRadix.Root
      ref={ref}
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
    {children}
  </div>
));
Base.displayName = "Base";

const Label = forwardRef<
  ElementRef<typeof LabelPolkadex>,
  ComponentPropsWithoutRef<typeof LabelPolkadex>
>(({ appearance = "base", size = "sm", ...props }, ref) => (
  <LabelPolkadex ref={ref} appearance={appearance} size={size} {...props} />
));
Label.displayName = "Label";

const Solid = forwardRef<
  ElementRef<typeof CheckboxRadix.Root>,
  ComponentPropsWithoutRef<typeof CheckboxRadix.Root>
>(({ className, ...props }, ref) => (
  <Base
    ref={ref}
    className={twMerge(
      classNames(
        "data-[state=unchecked]:bg-level-5 data-[state=unchecked]:group-hover:bg-level-2 border-none",
        "data-[state=checked]:bg-primary-base data-[state=checked]:text-primary-foreground"
      ),
      className
    )}
    {...props}
  />
));
Solid.displayName = "Solid";

const Outline = forwardRef<
  ElementRef<typeof CheckboxRadix.Root>,
  ComponentPropsWithoutRef<typeof CheckboxRadix.Root>
>(({ className, ...props }, ref) => (
  <Base
    ref={ref}
    className={twMerge(
      classNames(
        "border-2 border-primary data-[state=unchecked]:group-hover:border-current",
        "data-[state=checked]:border-primary-base data-[state=checked]:text-primary-base data-[state=checked]:border"
      ),
      className
    )}
    {...props}
  />
));
Outline.displayName = "Outline";

export const Checkbox = {
  Solid,
  Outline,
  Label,
};
