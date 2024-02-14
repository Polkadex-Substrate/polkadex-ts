"use client";

import {
  Children,
  ComponentProps,
  ComponentPropsWithoutRef,
  ElementType,
  PropsWithChildren,
  ReactElement,
  cloneElement,
  forwardRef,
} from "react";
import classNames from "classnames";
import { twMerge } from "tailwind-merge";
import { Slot } from "@radix-ui/react-slot";

import type { AppearanceVariants } from "../helpers";
import {
  appearanceVariantsClasses,
  componentIsTypeof,
  fontSizeClasses,
} from "../helpers";

type Props = {
  appearance?: AppearanceVariants;
  size?: keyof typeof fontSizeClasses;
  asChild?: boolean;
};

export interface TextProps extends ComponentPropsWithoutRef<"span">, Props {
  type?: "span" | "small" | "strong";
  bold?: boolean;
}

const Text = forwardRef<HTMLSpanElement, PropsWithChildren<TextProps>>(
  (
    {
      children,
      className,
      appearance = "base",
      size = "sm",
      type = "span",
      bold,
      asChild,
      ...props
    },
    ref
  ) => {
    const ElementRender = asChild ? Slot : type;

    return (
      <ElementRender
        ref={ref}
        className={twMerge(
          classNames(
            "text-white",
            bold && "font-semibold",
            appearanceVariantsClasses[appearance],
            fontSizeClasses[size]
          ),
          className
        )}
        {...props}
      >
        {children}
      </ElementRender>
    );
  }
);
Text.displayName = "Text";

type ParagraphProps = ComponentProps<"p"> & Props;

const Paragraph = forwardRef<
  HTMLParagraphElement,
  PropsWithChildren<ParagraphProps>
>(
  (
    { children, className, appearance = "base", size = "base", ...props },
    ref
  ) => {
    const isChildrenParagraph = Children.toArray(children).some((child) =>
      componentIsTypeof(child, "p")
    );
    const customClassNames = twMerge(
      classNames(
        "leading-5 text-white",
        appearanceVariantsClasses[appearance],
        fontSizeClasses[size]
      ),
      className
    );
    if (isChildrenParagraph) {
      const childElement = Children.only(children) as ReactElement;
      return cloneElement(childElement, {
        className: customClassNames,
        ref,
        ...props,
      });
    }
    return (
      <p ref={ref} className={customClassNames} {...props}>
        {children}
      </p>
    );
  }
);
Paragraph.displayName = "Paragraph";

interface HeadingProps extends ComponentProps<"h1"> {
  type?: (typeof headingTypes)[number];
  size?: keyof typeof fontSizeClasses;
  appearance?: AppearanceVariants;
}

const headingTypes = ["h1", "h2", "h3", "h4", "h5", "h6"] as const;

const Heading = forwardRef<HTMLElement, PropsWithChildren<HeadingProps>>(
  (
    {
      children,
      className,
      type = "h1",
      size = "xl",
      appearance = "base",
      ...props
    },
    ref
  ) => {
    const ElementRender = type as ElementType;
    return (
      <ElementRender
        ref={ref}
        className={twMerge(
          classNames(
            "font-semibold text-white",
            fontSizeClasses[size],
            appearanceVariantsClasses[appearance]
          ),
          className
        )}
        {...props}
      >
        {children}
      </ElementRender>
    );
  }
);
Heading.displayName = "Heading";

export const Typography = {
  Paragraph,
  Text,
  Heading,
};
