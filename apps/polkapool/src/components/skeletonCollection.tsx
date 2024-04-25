"use client";

import classNames from "classnames";
import { ComponentProps } from "react";
import { Skeleton } from "@polkadex/ux";
import { twMerge } from "tailwind-merge";

interface SkeletonCollectionProps extends ComponentProps<typeof Skeleton> {
  rows?: number;
}

const Assets = ({ className, ...props }: ComponentProps<typeof Skeleton>) => (
  <div className="flex gap-3">
    <Skeleton
      loading
      className={twMerge(
        classNames("h-14 max-w-14 flex-auto rounded-full"),
        className
      )}
      {...props}
    />
    <div className="flex flex-1 justify-between">
      <div className="flex flex-col flex-1 gap-2">
        <Skeleton
          loading
          className={twMerge(classNames("h-14 max-w-32"), className)}
          {...props}
        />
        <Skeleton
          loading
          className={twMerge(classNames("h-14 max-w-20"), className)}
          {...props}
        />
      </div>
      <Skeleton
        loading
        className={twMerge(classNames("h-5 max-w-12 self-center"), className)}
        {...props}
      />
    </div>
  </div>
);
const SkeletonCollection = ({
  rows = 5,
  ...props
}: SkeletonCollectionProps) => {
  return (
    <div className="flex-1 flex flex-col gap-3 p-3">
      {new Array(rows).fill("").map((_, i) => (
        <Assets key={i} {...props} />
      ))}
    </div>
  );
};

SkeletonCollection.Assets = Assets;
export { SkeletonCollection };
