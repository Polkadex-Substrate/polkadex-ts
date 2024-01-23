import { ComponentProps, PropsWithChildren } from "react";
import classNames from "classnames";
import { twMerge } from "tailwind-merge";

import { appearanceVariants, fontSizes } from "../helpers";

export interface LabelProps extends ComponentProps<"label"> {
  appearance?: keyof typeof appearanceVariants;
  size?: keyof typeof fontSizes;
}

export const Label = ({
  children,
  className,
  appearance = "primary",
  size = "sm",
  ...props
}: PropsWithChildren<LabelProps>) => (
  <label
    className={twMerge(
      classNames(
        "cursor-pointer",
        appearanceVariants[appearance],
        fontSizes[size]
      ),
      className
    )}
    {...props}
  >
    {children}
  </label>
);
