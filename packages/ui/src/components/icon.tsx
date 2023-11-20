import { ComponentProps } from "react";

import * as Icons from "../icons";

interface Props extends ComponentProps<"svg"> {
  name: string;
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
