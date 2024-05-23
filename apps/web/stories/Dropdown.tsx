import { Button, Dropdown as PolkadexDropdown, Typography } from "@polkadex/ux";
import { Fragment, PropsWithChildren } from "react";

export const Dropdown = ({
  children,
  withOverlay,
  withSuperpositionTrigger,
  withIcon,
  asChild = true,
}: PropsWithChildren<{
  withOverlay?: boolean;
  withSuperpositionTrigger?: boolean;
  withIcon?: boolean;
  asChild?: boolean;
}>) => {
  return (
    <PolkadexDropdown>
      <PolkadexDropdown.Trigger
        asChild={asChild}
        superpositionTrigger={withSuperpositionTrigger}
        iconRotationAnimation={true}
      >
        {asChild ? (
          <Button.Outline appearance="secondary" type={undefined}>
            Open dropdown
          </Button.Outline>
        ) : (
          <Fragment>
            <Typography.Text>Open Dropdown</Typography.Text>
            {withIcon && <PolkadexDropdown.Icon />}
          </Fragment>
        )}
      </PolkadexDropdown.Trigger>
      <PolkadexDropdown.Content>{children}</PolkadexDropdown.Content>
      {withOverlay && <PolkadexDropdown.Overlay />}
    </PolkadexDropdown>
  );
};
