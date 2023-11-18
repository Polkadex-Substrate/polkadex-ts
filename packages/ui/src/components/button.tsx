import { ComponentProps, ElementType, PropsWithChildren } from "react";
import classNames from "classnames";
import { twMerge } from "tailwind-merge";
import { Slot } from "@radix-ui/react-slot";

export interface ButtonProps extends ComponentProps<"button"> {
  asChild?: boolean;
  size?: keyof (typeof variants)["size"];
  variant?: keyof (typeof variants)["variant"];
  withIcon?: boolean;
  rounded?: boolean;
}

const variants = {
  size: {
    xs: "h-3 px-1 py-2 text-xs rounded-sm",
    sm: "h-6 px-1 py-2 text-xs rounded-sm",
    default: "h6 px-4 py-2 text-sm rounded-md",
    md: "h-10 px-4 py-2 text-sm rounded-md",
    lg: "h-14 px-8 py-4 text-md rounded-md",
  },
  variant: {
    primary: "bg-primary-base hover:bg-primary-hover active:bg-primary-pressed",
    secondary:
      "bg-secondary-base hover:bg-secondary-hover active:bg-secondary-pressed",
    ghost:
      "bg-transparent hover:bg-secondary-pressed active:bg-secondary-hover text-primary hover:text-textBase",
    outline:
      "border border-secondary-base hover:bg-secondary-pressed active:bg-secondary-hover ",
  },
  iconSize: {
    xs: "h-4 w-4 p-1 rounded-md",
    sm: "h-6 w-6 p-1 rounded-md",
    default: "h-8 w-8 p-1.5 rounded-md",
    md: "h-10 w-10 p-3 rounded-md",
    lg: "h-12 w-12 p-3 rounded-md",
  },
};

const Base = ({
  className,
  asChild = false,
  size = "default",
  variant = "primary",
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
          "flex items-center justify-center",
          "disabled:cursor-not-allowed disabled:opacity-50 disabled:bg-disabled",
          withIcon ? variants.iconSize[size] : variants.size[size],
          variants.variant[variant],
          rounded && "rounded-full",
          withIcon && "group"
        ),
        className
      )}
      {...props}
    >
      {children}
    </Rendercomponent>
  );
};

const Primary = (props: PropsWithChildren<Omit<ButtonProps, "variant">>) => (
  <Base variant="primary" {...props} />
);

const Secondary = (
  props: PropsWithChildren<Omit<ButtonProps, "variant" | "withIcon">>
) => <Base variant="secondary" {...props} />;

const Ghost = (
  props: PropsWithChildren<Omit<ButtonProps, "variant" | "withIcon">>
) => <Base variant="ghost" {...props} />;

const Outline = (
  props: PropsWithChildren<Omit<ButtonProps, "variant" | "withIcon">>
) => <Base variant="outline" {...props} />;

const Icon = ({
  variant = "secondary",
  ...props
}: PropsWithChildren<Omit<ButtonProps, "withIcon">>) => (
  <Base variant={variant} withIcon {...props} />
);

export const Button = {
  Primary,
  Secondary,
  Ghost,
  Outline,
  Icon,
};
