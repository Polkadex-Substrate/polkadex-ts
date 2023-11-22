import { ComponentProps } from "react";

import * as Icons from "../icons";

export type IconsProps = keyof typeof Icons;
interface Props extends ComponentProps<"svg"> {
  name: keyof typeof Icons;
}

export const Icon = ({ name, ...props }: Props) => {
  const iconUppercase = name.toUpperCase();
  const iconTicker =
    Object.keys(Icons).find(
      (iconName) => iconName.toUpperCase() === iconUppercase
    ) || "Unknown";

  const IconComponent = Icons[iconTicker as keyof typeof Icons];
  return <IconComponent {...props} />;
};
