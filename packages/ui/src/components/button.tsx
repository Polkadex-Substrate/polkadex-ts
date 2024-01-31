import {
  ComponentProps,
  ElementType,
  PropsWithChildren,
  PropsWithoutRef,
  forwardRef,
} from "react";
import classNames from "classnames";
import { twMerge } from "tailwind-merge";
import { Slot } from "@radix-ui/react-slot";

export interface ButtonProps extends ComponentProps<"button"> {
  asChild?: boolean;
  size?: keyof (typeof variants)["size"];
  variant?: keyof typeof variants.color;
  appearance?: keyof typeof variants.color.solid;
  withIcon?: boolean;
  rounded?: boolean;
}

const reusableColors = {
  primary: "hover:bg-primary-hover active:bg-primary-pressed",
  secondary:
    "text-current hover:text-current hover:bg-secondary-hover active:bg-secondary-pressed",
  tertiary:
    "text-primary hover:text-current hover:bg-tertiary-hover active:bg-tertiary-pressed",
  danger: "hover:bg-danger-hover active:bg-danger-pressed",
  success: "hover:bg-success-hover active:bg-success-pressed",
  attention: "hover:bg-attention-hover active:bg-attention-pressed",
  info: "hover:bg-info-hover active:bg-info-pressed",
};

const variants = {
  size: {
    "2xs": "h-5 px-1 text-2xs",
    xs: "h-6 px-1.5 text-xs",
    sm: "h-7 px-2 text-sm",
    "2sm": "h-8 px-2 text-sm",
    default: "h-9 px-4 py-2 text-sm",
    md: "h-10 px-4 py-2 text-sm",
    lg: "h-13 px-8 py-4 text-base",
  },
  iconSize: {
    "2xs": "h-4 w-4 p-1",
    xs: "h-5 w-5 p-1",
    sm: "h-6 w-6 p-1.5",
    "2sm": "h-7 w-7 p-1.5",
    default: "h-8 w-8 p-2",
    md: "h-10 w-10 p-2.5",
    lg: "h-12 w-12 p-3",
  },
  color: {
    solid: {
      primary: `bg-primary-base ${reusableColors.primary}`,
      secondary: `bg-secondary-base ${reusableColors.secondary}`,
      tertiary: `bg-tertiary-base ${reusableColors.tertiary}`,
      danger: `bg-danger-base ${reusableColors.danger}`,
      success: `bg-success-base ${reusableColors.success}`,
      attention: `bg-attention-base ${reusableColors.attention}`,
      info: `bg-info-base ${reusableColors.info}`,
    },
    ghost: {
      primary: reusableColors.primary,
      secondary: reusableColors.secondary,
      tertiary: reusableColors.tertiary,
      danger: reusableColors.danger,
      success: reusableColors.success,
      attention: reusableColors.attention,
      info: reusableColors.info,
    },
    outline: {
      primary: `border border-primary-base text-primary-base hover:text-current ${reusableColors.primary}`,
      secondary: `border border-secondary-base text-secondary-base hover:text-current ${reusableColors.secondary}`,
      tertiary: `border border-tertiary-base text-tertiary-base hover:text-current ${reusableColors.tertiary}`,
      danger: `border border-danger-base text-danger-base hover:text-current ${reusableColors.danger}`,
      success: `border border-success-base text-success-base hover:text-current ${reusableColors.success}`,
      attention: `border border-attention-base text-attention-base hover:text-current ${reusableColors.attention}`,
      info: `border border-info-base text-info-base hover:text-current ${reusableColors.info}`,
    },
    underline: {
      primary:
        "hover:underline text-primary-base hover:text-primary-hover active:text-primary-pressed",
      secondary: "hover:underline text-primary active:text-secondary-pressed",
      tertiary: "hover:underline text-primary active:text-tertiary-pressed",
      danger:
        "hover:underline text-danger-base hover:text-danger-hover active:text-danger-pressed",
      success:
        "hover:underline text-success-base hover:text-success-hover active:text-success-pressed",
      attention:
        "hover:underline text-attention-base hover:text-attention-hover active:text-attention-pressed",
      info: "hover:underline text-info-base hover:text-info-hover active:text-info-pressed",
    },
    light: {
      primary:
        "text-primary-base bg-opacity-10 hover:bg-opacity-20 bg-primary-base active:bg-opacity-30",
      secondary:
        "text-primary bg-opacity-10 hover:bg-opacity-30 bg-secondary-base active:bg-opacity-60",
      tertiary:
        "text-primary bg-opacity-10 hover:bg-opacity-30 bg-tertiary-base active:bg-opacity-60",
      danger:
        "text-danger-base bg-opacity-10 hover:bg-opacity-20 bg-danger-base active:bg-opacity-30",
      success:
        "text-success-base bg-opacity-10 hover:bg-opacity-20 bg-success-base active:bg-opacity-30",
      attention:
        "text-attention-base bg-opacity-10 hover:bg-opacity-20 bg-attention-base active:bg-opacity-30",
      info: "text-info-base bg-opacity-10 hover:bg-opacity-20 bg-info-base active:bg-opacity-30",
    },
  },
};

export const Base = forwardRef<
  HTMLButtonElement | null,
  PropsWithChildren<ButtonProps>
>(
  (
    {
      className,
      asChild = false,
      size = "default",
      appearance = "primary",
      variant = "solid",
      withIcon = false,
      rounded = false,
      children,
      ...props
    },
    ref
  ) => {
    const Rendercomponent: ElementType = asChild ? Slot : "button";
    return (
      <Rendercomponent
        ref={ref}
        className={twMerge(
          classNames(
            "transition-colors duration-300",
            "flex items-center justify-center whitespace-nowrap",
            "disabled:cursor-not-allowed disabled:opacity-50 disabled:bg-disabled",
            withIcon ? variants.iconSize[size] : variants.size[size],
            rounded ? "rounded-full" : "rounded-sm",
            withIcon && "group",
            variants.color[variant][appearance]
          ),
          className
        )}
        {...props}
      >
        {children}
      </Rendercomponent>
    );
  }
);
Base.displayName = "Base";

const Solid = forwardRef<
  HTMLButtonElement,
  PropsWithoutRef<Omit<ButtonProps, "variant">>
>((props, ref) => <Base ref={ref} variant="solid" {...props} />);
Solid.displayName = "Solid";

const Ghost = forwardRef<
  HTMLButtonElement,
  PropsWithoutRef<Omit<ButtonProps, "variant" | "withIcon">>
>(({ appearance = "secondary", ...props }, ref) => (
  <Base ref={ref} appearance={appearance} variant="ghost" {...props} />
));
Ghost.displayName = "Ghost";

const Outline = forwardRef<
  HTMLButtonElement,
  PropsWithoutRef<Omit<ButtonProps, "variant" | "withIcon">>
>((props, ref) => <Base ref={ref} variant="outline" {...props} />);
Outline.displayName = "Outline";

const Underline = forwardRef<
  HTMLButtonElement,
  PropsWithoutRef<Omit<ButtonProps, "variant" | "withIcon">>
>((props, ref) => <Base ref={ref} variant="underline" {...props} />);
Underline.displayName = "Underline";

const Light = forwardRef<
  HTMLButtonElement,
  PropsWithoutRef<Omit<ButtonProps, "variant" | "withIcon">>
>((props, ref) => <Base ref={ref} variant="light" {...props} />);
Light.displayName = "Light";

const Icon = forwardRef<
  HTMLButtonElement,
  PropsWithoutRef<Omit<ButtonProps, "withIcon">>
>(({ variant = "solid", appearance = "secondary", ...props }, ref) => (
  <Base
    ref={ref}
    variant={variant}
    appearance={appearance}
    withIcon
    {...props}
  />
));
Icon.displayName = "Icon";

export const Button = {
  Solid,
  Ghost,
  Outline,
  Underline,
  Light,
  Icon,
};
