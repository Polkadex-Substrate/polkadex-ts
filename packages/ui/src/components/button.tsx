import { ComponentProps, ElementType, PropsWithChildren } from "react";
import classNames from "classnames";
import { twMerge } from "tailwind-merge";
import { Slot } from "@radix-ui/react-slot";

interface ButtonProps extends ComponentProps<"button"> {
  asChild?: boolean;
  size?: keyof (typeof variants)["size"];
  variant?: keyof (typeof variants)["variant"];
}

const variants = {
  size: {
    xs: "h-3 px-0.5 py-2 text-xs rounded-sm",
    sm: "h-6 px-1 py-2 rounded-sm",
    default: "h6 px-4 py-2 rounded-md",
    md: "h-10 px-4 py-2 rounded-md",
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
};

const Base = ({
  className,
  asChild = false,
  size = "default",
  variant = "primary",
  children,
  ...props
}: PropsWithChildren<ButtonProps>) => {
  const Rendercomponent: ElementType = asChild ? Slot : "button";
  return (
    <Rendercomponent
      className={twMerge(
        classNames(
          "transition-colors duration-300 font-medium text-sm",
          "flex items-center justify-center",
          "disabled:pointer-events-none disabled:opacity-50",
          variants.size[size],
          variants.variant[variant]
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

const Secondary = (props: PropsWithChildren<Omit<ButtonProps, "variant">>) => (
  <Base variant="secondary" {...props} />
);

const Ghost = (props: PropsWithChildren<Omit<ButtonProps, "variant">>) => (
  <Base variant="ghost" {...props} />
);

const Outline = (props: PropsWithChildren<Omit<ButtonProps, "variant">>) => (
  <Base variant="outline" {...props} />
);

export const Button = {
  Primary,
  Secondary,
  Ghost,
  Outline,
};
