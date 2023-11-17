import { ComponentProps } from "react";

import * as Tokens from "../tokens";

interface Props extends ComponentProps<"svg"> {
  name: string;
}
export const Token = ({ name, ...props }: Props) => {
  const tokenUppercase = name.toUpperCase();
  const tokenTicker = (
    tokenUppercase in Tokens ? tokenUppercase : "UNKN"
  ) as keyof typeof Tokens;

  const IconComponent = Tokens[tokenTicker];
  return <IconComponent {...props} />;
};
