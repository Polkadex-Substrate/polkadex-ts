"use client";

import classNames from "classnames";
import { ComponentProps, Fragment, PropsWithChildren } from "react";
import { twMerge } from "tailwind-merge";

interface SkeletonProps extends ComponentProps<"div"> {
  loading?: boolean;
}

export const Skeleton = ({
  children,
  loading,
  className,
  ...props
}: PropsWithChildren<SkeletonProps>) => {
  if (!loading) return <Fragment>{children}</Fragment>;

  return (
    <div
      className={twMerge(
        classNames("flex-1 w-auto h-auto bg-level-3 rounded-sm animate-pulse"),
        className
      )}
      {...props}
    />
  );
};
