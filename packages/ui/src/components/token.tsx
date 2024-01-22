import { ComponentProps } from "react";
import { twMerge } from "tailwind-merge";
import classNames from "classnames";

import * as Tokens from "../tokens";
import { tokenAppearance } from "../helpers";

export type TokensProps = keyof typeof Tokens;
interface Props extends ComponentProps<"svg"> {
  name: string;
  appearance?: keyof typeof tokenAppearance;
  size?: keyof typeof sizesVariants;
}

const sizesVariants = {
  "2xs": "h-5 w-5 p",
  xs: "h-6 w-6 p-0.5",
  sm: "h-7 w-7 p-1",
  md: "h-8 w-8 p-1",
  lg: "h-10 w-10 p-1",
  xl: "h-12 w-12 p-1",
  "2xl": "h-14 w-14 p-1",
  "3xl": "h-16 w-16 p-2",
};

export const Token = ({
  name,
  appearance,
  size,
  className,
  ...props
}: Props) => {
  const tokenUppercase = name.toUpperCase();
  const tokenTicker = (
    tokenUppercase in Tokens ? tokenUppercase : "UNKN"
  ) as keyof typeof Tokens;

  const IconComponent = Tokens[tokenTicker];

  return (
    <IconComponent
      className={twMerge(
        classNames(
          appearance && tokenAppearance[appearance],
          size && sizesVariants[size]
        ),
        className
      )}
      {...props}
    />
  );
};
