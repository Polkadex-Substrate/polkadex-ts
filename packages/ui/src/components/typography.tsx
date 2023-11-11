import { ComponentProps, ElementType, PropsWithChildren } from "react";
import classNames from "classnames";
import { twMerge } from "tailwind-merge";

interface TextProps extends ParagraphProps {
  type?: "span" | "small" | "strong";
}

const Text = ({
  children,
  className,
  variant = "base",
  size = "base",
  type = "span",
  ...props
}: PropsWithChildren<TextProps>) => {
  const ElementRender = type;

  return (
    <ElementRender
      className={twMerge(
        classNames(paragraphVariants[variant], paragraphSize[size], className)
      )}
      {...props}
    >
      {children}
    </ElementRender>
  );
};

interface ParagraphProps extends ComponentProps<"p"> {
  variant?: keyof typeof paragraphVariants;
  size?: keyof typeof paragraphSize;
}

const paragraphVariants = {
  base: "text-textBase",
  primary: "text-primary",
  secondary: "text-secondary",
};

const paragraphSize = {
  xs: "text-xs",
  sm: "text-sm",
  base: "text-base",
  md: "text-md",
  lg: "text-lg",
};

const Paragraph = ({
  children,
  className,
  variant = "base",
  size = "base",
  ...props
}: PropsWithChildren<ParagraphProps>) => (
  <p
    className={twMerge(
      classNames(paragraphVariants[variant], paragraphSize[size], className)
    )}
    {...props}
  >
    {children}
  </p>
);

interface HeadingProps extends ComponentProps<"h1"> {
  type?: (typeof headingTypes)[number];
  size?: keyof typeof headingSizes;
}

const headingTypes = ["h1", "h2", "h3", "h4", "h5", "h6"] as const;
const headingSizes = {
  "2xl": "text-[2rem] leading-[2.25rem]",
  xl: "text-[1.75rem] leading-[2rem]",
  lg: "text-[1.5rem] leading-[1.75rem]",
  md: "text-[1.25rem] leading-[1.5rem]",
  sm: "text-[1.125rem] leading-[1.75rem]",
  xs: "text-[1rem] leading-[1.25rem]",
};

const Heading = ({
  children,
  className,
  type = "h1",
  size = "xl",
  ...props
}: PropsWithChildren<HeadingProps>) => {
  const ElementRender = type as ElementType;
  return (
    <ElementRender
      className={twMerge(
        classNames("font-semibold", headingSizes[size], className)
      )}
      {...props}
    >
      {children}
    </ElementRender>
  );
};

export const Typography = {
  Paragraph,
  Text,
  Heading,
};
