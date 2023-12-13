import { ComponentProps, ElementType, PropsWithChildren } from "react";
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
    "text-primary hover:text-current hover:bg-secondary-hover active:bg-secondary-pressed",
  tertiary:
    "text-primary hover:text-current hover:bg-tertiary-hover active:bg-tertiary-pressed",
  danger: "hover:bg-danger-hover active:bg-danger-pressed",
  success: "hover:bg-success-hover active:bg-success-pressed",
  attention: "hover:bg-attention-hover active:bg-attention-pressed",
  info: "hover:bg-info-hover active:bg-info-pressed",
};

const variants = {
  size: {
    xs: "h-3 px-1 py-2 text-xs rounded-sm",
    sm: "h-6 px-2 py-1 text-xs rounded-sm",
    default: "h-9 px-4 py-2 text-base rounded-md",
    md: "h-10 px-4 py-2 text-sm rounded-md",
    lg: "h-14 px-8 py-4 text-md rounded-md",
  },
  iconSize: {
    xs: "h-4 w-4 p-1 rounded-md",
    sm: "h-6 w-6 p-1 rounded-md",
    default: "h-8 w-8 p-2 rounded-md",
    md: "h-10 w-10 p-3 rounded-md",
    lg: "h-12 w-12 p-3 rounded-md",
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
      primary: `border border-primary-base ${reusableColors.primary}`,
      secondary: `border border-secondary-base ${reusableColors.secondary}`,
      tertiary: `border border-tertiary-base ${reusableColors.tertiary}`,
      danger: `border border-danger-base ${reusableColors.danger}`,
      success: `border border-success-base ${reusableColors.success}`,
      attention: `border border-attention-base ${reusableColors.attention}`,
      info: `border border-info-base ${reusableColors.info}`,
    },
    light: {
      primary: `text-primary-base hover:bg-opacity-20 active:bg-opacity-60 ${reusableColors.primary}`,
      secondary: `hover:bg-opacity-20 active:bg-opacity-60 ${reusableColors.secondary}`,
      tertiary: `hover:bg-opacity-20 active:bg-opacity-60 ${reusableColors.tertiary}`,
      danger: `text-danger-base hover:bg-opacity-20 active:bg-opacity-60 ${reusableColors.danger}`,
      success: `text-success-base hover:bg-opacity-20 active:bg-opacity-60 ${reusableColors.success}`,
      attention: `text-attention-base hover:bg-opacity-20 active:bg-opacity-60 ${reusableColors.attention}`,
      info: `text-info-base hover:bg-opacity-20 active:bg-opacity-60 ${reusableColors.info}`,
    },
  },
};

const Base = ({
  className,
  asChild = false,
  size = "default",
  appearance = "primary",
  variant = "solid",
  withIcon = false,
  rounded = false,
  children,
  ...props
}: PropsWithChildren<ButtonProps>) => {
  const Rendercomponent: ElementType = asChild ? Slot : "button";
  return (
    <Rendercomponent
      className={twMerge(
        classNames(
          "transition-colors duration-300 font-medium",
          "flex items-center justify-center whitespace-nowrap",
          "disabled:cursor-not-allowed disabled:opacity-50 disabled:bg-disabled",
          withIcon ? variants.iconSize[size] : variants.size[size],
          rounded && "rounded-full",
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
};

const Solid = (props: PropsWithChildren<Omit<ButtonProps, "variant">>) => (
  <Base variant="solid" {...props} />
);

const Ghost = ({
  appearance = "secondary",
  ...props
}: PropsWithChildren<Omit<ButtonProps, "variant" | "withIcon">>) => (
  <Base appearance={appearance} variant="ghost" {...props} />
);

const Outline = (
  props: PropsWithChildren<Omit<ButtonProps, "variant" | "withIcon">>
) => <Base variant="outline" {...props} />;

const Light = (
  props: PropsWithChildren<Omit<ButtonProps, "variant" | "withIcon">>
) => <Base variant="light" {...props} />;

const Icon = ({
  variant = "solid",
  appearance = "secondary",
  ...props
}: PropsWithChildren<Omit<ButtonProps, "withIcon">>) => (
  <Base variant={variant} appearance={appearance} withIcon {...props} />
);

export const Button = {
  Solid,
  Ghost,
  Outline,
  Light,
  Icon,
};
