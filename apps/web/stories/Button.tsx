import { Base as PolkadexButton, ButtonProps } from "@polkadex/ux";
import { PropsWithoutRef } from "react";

export const Button = ({
  children,
  ...props
}: PropsWithoutRef<ButtonProps>) => {
  return <PolkadexButton {...props}>{children}</PolkadexButton>;
};
