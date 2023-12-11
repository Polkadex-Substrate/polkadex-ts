import {
  Children,
  ComponentProps,
  ElementType,
  PropsWithChildren,
  ReactElement,
  cloneElement,
} from "react";
import classNames from "classnames";
import { twMerge } from "tailwind-merge";

import { componentIsTypeof } from "../helpers";
interface TextProps extends ParagraphProps {
  type?: "span" | "small" | "strong";
  bold?: boolean;
}

const Text = ({
  children,
  className,
  variant = "base",
  size = "sm",
  type = "span",
  bold,
  ...props
}: PropsWithChildren<TextProps>) => {
  const ElementRender = type;

  return (
    <ElementRender
      className={twMerge(
        classNames(bold && "font-semibold"),
        paragraphVariants[variant],
        paragraphSize[size],
        className
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
  base: "text-current",
  primary: "text-primary",
  secondary: "text-secondary",
  danger: "text-danger-base",
  success: "text-success-base",
  attention: "text-attention-base",
  info: "text-info-base",
};

const paragraphSize = {
  xs: "text-xs",
  sm: "text-sm",
  base: "text-base",
  md: "text-md",
  lg: "text-lg",
  xl: "text-xl",
};

const Paragraph = ({
  children,
  className,
  variant = "base",
  size = "base",
  ...props
}: PropsWithChildren<ParagraphProps>) => {
  const isChildrenParagraph = Children.toArray(children).some((child) =>
    componentIsTypeof(child, "p")
  );
  const customClassNames = twMerge(
    paragraphVariants[variant],
    paragraphSize[size],
    classNames("leading-5"),
    className
  );
  if (isChildrenParagraph) {
    const childElement = Children.only(children) as ReactElement;
    return cloneElement(childElement, {
      className: customClassNames,
      ...props,
    });
  }
  return (
    <p className={customClassNames} {...props}>
      {children}
    </p>
  );
};

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
      className={
        (twMerge(classNames("font-semibold"), headingSizes[size]), className)
      }
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
