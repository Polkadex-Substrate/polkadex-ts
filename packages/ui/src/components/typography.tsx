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

type Props = {
  appearance?: keyof typeof appearanceVariants;
  size?: keyof typeof fontSizes;
};

interface TextProps extends ComponentProps<"p">, Props {
  type?: "span" | "small" | "strong";
  bold?: boolean;
}

const Text = ({
  children,
  className,
  appearance = "base",
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
        appearanceVariants[appearance],
        fontSizes[size],
        className
      )}
      {...props}
    >
      {children}
    </ElementRender>
  );
};

const appearanceVariants = {
  base: "text-current",
  primary: "text-primary",
  secondary: "text-secondary",
  tertiary: "text-tertiary-base",
  placeholder: "text-placeholder",
  actionInput: "text-actionInput",
  disabled: "text-disabled",
  danger: "text-danger-base",
  success: "text-success-base",
  attention: "text-attention-base",
  info: "text-info-base",
};

const fontSizes = {
  "3xs": "text-3xs",
  "2xs": "text-2xs",
  xs: "text-xs",
  sm: "text-sm",
  base: "text-base",
  md: "text-md",
  lg: "text-lg",
  xl: "text-xl",
  "2xl": "text-2xl",
  "3xl": "text-3xl",
  "4xl": "text-4xl",
  "5xl": "text-5xl",
  "6xl": "text-6xl",
  "7xl": "text-7xl",
  "8xl": "text-8xl",
  "9xl": "text-9xl",
  "10xl": "text-10xl",
  "11xl": "text-11xl",
};

type ParagraphProps = ComponentProps<"p"> & Props;

const Paragraph = ({
  children,
  className,
  appearance = "base",
  size = "base",
  ...props
}: PropsWithChildren<ParagraphProps>) => {
  const isChildrenParagraph = Children.toArray(children).some((child) =>
    componentIsTypeof(child, "p")
  );
  const customClassNames = twMerge(
    classNames("leading-5", appearanceVariants[appearance], fontSizes[size]),
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
  size?: keyof typeof fontSizes;
  appearance?: keyof typeof appearanceVariants;
}

const headingTypes = ["h1", "h2", "h3", "h4", "h5", "h6"] as const;

const Heading = ({
  children,
  className,
  type = "h1",
  size = "xl",
  appearance = "base",
  ...props
}: PropsWithChildren<HeadingProps>) => {
  const ElementRender = type as ElementType;
  return (
    <ElementRender
      className={twMerge(
        classNames(
          "font-semibold",
          fontSizes[size],
          appearanceVariants[appearance]
        ),
        className
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
