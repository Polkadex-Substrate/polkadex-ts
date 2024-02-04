import { ComponentProps, PropsWithChildren } from "react";
import { twMerge } from "tailwind-merge";
import classNames from "classnames";

import * as Icons from "../icons";
import { SizesVariants, TokenAppearance, sizesVariants } from "../helpers";

export type IconsProps = keyof typeof Icons;
interface Props extends ComponentProps<"svg"> {
  name?: IconsProps;
  appearance?: TokenAppearance;
  size?: SizesVariants;
}

export const Icon = ({
  name,
  size,
  className,
  children,
  ...props
}: PropsWithChildren<Props>) => {
  const iconUppercase = name?.toUpperCase();
  const iconTicker =
    Object.keys(Icons).find(
      (iconName) => iconName.toUpperCase() === iconUppercase
    ) || "Unknown";

  const IconComponent = Icons[iconTicker as keyof typeof Icons];
  const customProps = twMerge(
    classNames(size && sizesVariants[size]),
    className
  );
  return children ? (
    <div className={customProps}>{children}</div>
  ) : (
    <IconComponent className={customProps} {...props} />
  );
};
