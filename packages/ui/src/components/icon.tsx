import { ComponentProps } from "react";

import * as Icons from "../icons";

interface Props extends ComponentProps<"svg"> {
  name: string;
}
export const Icon = ({ name, ...props }: Props) => {
  const iconUppercase = name.toUpperCase();
  const iconTicker = (
    iconUppercase in Icons ? iconUppercase : "Wallet"
  ) as keyof typeof Icons;

  const IconComponent = Icons[iconTicker];
  return <IconComponent {...props} />;
};
