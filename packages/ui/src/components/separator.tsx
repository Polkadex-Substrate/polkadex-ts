import * as SeparatorRadix from "@radix-ui/react-separator";
import classNames from "classnames";
import { twMerge } from "tailwind-merge";

import { themeConfig } from "../../../../themeConfig";

const Horizontal = (props: Omit<SeparatorProps, "orientation">) => {
  return <Base orientation="horizontal" {...props} />;
};

const Vertical = (props: Omit<SeparatorProps, "orientation">) => {
  return <Base orientation="vertical" {...props} />;
};
interface SeparatorProps extends SeparatorRadix.SeparatorProps {
  appearance?: keyof typeof themeConfig.theme.extend.backgroundColor;
}

const Base = ({
  orientation,
  className,
  appearance = "level-3",
  ...props
}: SeparatorProps) => {
  const bgColor = `bg-${appearance}`;
  return (
    <SeparatorRadix.Root
      className={twMerge(
        classNames(
          bgColor,
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
