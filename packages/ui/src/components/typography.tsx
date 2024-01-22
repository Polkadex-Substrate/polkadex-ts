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

import { appearanceVariants, componentIsTypeof, fontSizes } from "../helpers";

type Props = {
  appearance?: keyof typeof appearanceVariants;
  size?: keyof typeof fontSizes;
};

interface TextProps extends ComponentProps<"span">, Props {
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
