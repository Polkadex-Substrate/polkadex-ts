"use client";

import { ElementType, useEffect } from "react";
import { getExtensionIcon } from "@polkadot-cloud/assets/extensions";
import { twMerge } from "tailwind-merge";
import classNames from "classnames";

import {
  Interaction,
  InteractionProps,
  Spinner,
  Typography,
} from "../../components";

interface ProcessingTransactionProps extends InteractionProps {
  logo: string;
  onRedirect: () => void;
  shouldRedirect: boolean;
}

export const ProcessingTransaction = ({
  logo,
  onRedirect,
  shouldRedirect,
  className,
  ...props
}: ProcessingTransactionProps) => {
  const IconComponent = getExtensionIcon(logo) as ElementType;

  useEffect(() => {
    if (shouldRedirect) onRedirect();
  }, [onRedirect, shouldRedirect]);

  return (
    <Interaction
      className={twMerge(
        classNames("w-full md:min-w-[24rem] md:max-w-[24rem]"),
        className
      )}
      {...props}
    >
      <Interaction.Content className="flex flex-col gap-5 items-center text-center">
        <div className="h-20 w-20 bg-level-2 rounded-full p-3 relative shadow-baseShadow">
          <IconComponent />
          <div className="absolute w-full h-full top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
            <Spinner.Loading />
          </div>
        </div>
        <div className="flex flex-col gap-2">
          <Typography.Text bold size="xl">
            Processing transaction
          </Typography.Text>
          <Typography.Text appearance="primary">
            Please wait, your transaction is being processed securely on the
            blockchain
          </Typography.Text>
        </div>
      </Interaction.Content>
    </Interaction>
  );
};
