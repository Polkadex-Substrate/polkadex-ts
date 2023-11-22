import * as SeparatorRadix from "@radix-ui/react-separator";
import classNames from "classnames";
import { twMerge } from "tailwind-merge";

const Horizontal = (
  props: Omit<SeparatorRadix.SeparatorProps, "orientation">
) => {
  return <Base orientation="horizontal" {...props} />;
};

const Vertical = (
  props: Omit<SeparatorRadix.SeparatorProps, "orientation">
) => {
  return <Base orientation="vertical" {...props} />;
};

const Base = ({
  orientation,
  className,
  ...props
}: SeparatorRadix.SeparatorProps) => {
  return (
    <SeparatorRadix.Root
      className={twMerge(
        classNames(
          "flex-1 bg-level-3",
          orientation === "horizontal" ? "h-px w-full" : "w-px h-full"
        ),
        className
      )}
      {...props}
    />
  );
};

export const Separator = {
  Horizontal,
  Vertical,
};
