"use client";

import { Typography, Button, Icon } from "@polkadex/ux";
import { RiStackLine } from "@remixicon/react";

import { useCoreProvider } from "@/core";

export const EmptyPosition = ({ showButton = false }) => {
  const { setShowConnectAccount } = useCoreProvider();
  return (
    <div className="flex flex-col items-center gap-4 py-6 px-4 bg-level-0 border border-primary rounded-md">
      <div className="flex flex-col items-center gap-2">
        <Icon size="md">
          <RiStackLine className="w-full h-full text-secondary" />
        </Icon>
        <Typography.Text appearance="primary">
          You have no open positions.
        </Typography.Text>
      </div>
      {showButton && (
        <Button.Light
          onClick={() => setShowConnectAccount(true)}
          appearance="tertiary"
        >
          Connect wallet
        </Button.Light>
      )}
    </div>
  );
};
