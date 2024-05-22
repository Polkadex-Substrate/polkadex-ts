import { Button, Modal as PolkadeModal, Typography } from "@polkadex/ux";
import { Fragment, useState } from "react";

export const Modal = () => {
  const [state, setState] = useState(false);
  return (
    <Fragment>
      <PolkadeModal
        closeOnClickOutside
        className="border-primary border-l w-screen h-screen min-h-webKit md:max-w-md"
        open={state}
        onOpenChange={setState}
        placement="top right"
      >
        <PolkadeModal.Title className="flex justify-between items-center p-4">
          <Typography.Text size="lg" bold>
            Fund Account
          </Typography.Text>
        </PolkadeModal.Title>
        <PolkadeModal.Content className="flex flex-col items-center justify-center flex-1">
          Content
        </PolkadeModal.Content>
        <PolkadeModal.Footer className="flex gap-2 p-4">
          <Button.Solid className="w-full" appearance="secondary">
            Mark all as read
          </Button.Solid>
          <Button.Solid className="w-full" appearance="secondary">
            Remove all
          </Button.Solid>
        </PolkadeModal.Footer>
      </PolkadeModal>
      <Button.Solid onClick={() => setState(true)}>Open modal</Button.Solid>
    </Fragment>
  );
};
