"use client";

import { ComponentProps, PropsWithChildren } from "react";
import classNames from "classnames";
import { twMerge } from "tailwind-merge";

import * as Vectors from "../illustrations";

import { Typography } from "./typography";

interface GenericMessageProps extends ComponentProps<"div"> {
  title: string;
  illustration: keyof typeof Vectors;
  inverted?: boolean;
  imageProps?: ComponentProps<"svg">;
}

export const GenericMessage = ({
  title,
  illustration,
  inverted,
  children,
  imageProps,
  className,
  ...props
}: PropsWithChildren<GenericMessageProps>) => {
  const IllustrationComponent = Vectors[illustration];
  return (
    <div
      className={twMerge(
        classNames(
          "flex-1 h-full flex flex-col gap-5 items-center justify-center text-center bg-level-1 px-3 py-10"
        ),
        className
      )}
      {...props}
    >
      <div
        className={classNames(
          inverted ? "flex-col-reverse" : "flex-col",
          "flex gap-3"
        )}
      >
        <IllustrationComponent
          className={twMerge(classNames("w-25"), imageProps?.className)}
        />
        <Typography.Text appearance="primary">{title}</Typography.Text>
      </div>
      {children}
    </div>
  );
};
