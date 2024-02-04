"use client";

import classNames from "classnames";
import { ComponentProps, ElementType, PropsWithChildren } from "react";
import { twMerge } from "tailwind-merge";
import { getExtensionIcon } from "@polkadot-cloud/assets/extensions";
import { XMarkIcon } from "@heroicons/react/24/solid";

import { Button, Spinner, Typography } from "../components";

interface ProcessingProps extends ComponentProps<"div"> {
  logo: string;
  errorTitle?: string;
  errorMessage?: string;
  errorButtonTitle?: string;
  onErrorAction?: () => void;
  loadingTitle?: string;
  loadingMessage?: string;
}

export const TransactionLoading = ({
  children,
  logo,
  errorTitle,
  errorMessage,
  errorButtonTitle = "Back",
  onErrorAction,
  loadingTitle = "Processing transaction",
  loadingMessage = "Please wait, your transaction is being processed securely on the blockchain",
  className,
  ...props
}: PropsWithChildren<ProcessingProps>) => {
  const IconComponent = getExtensionIcon(logo) as ElementType;

  return (
    <div
      className={twMerge(
        classNames("flex flex-col gap-5 items-center justify-center flex-1"),
        className
      )}
      {...props}
    >
      {errorMessage ? (
        <div className="flex flex-col gap-5 w-full">
          <div className="flex flex-col gap-5 items-center text-center">
            <div className="h-12 w-12 rounded-full bg-danger-base p-2 shadow-baseShadow">
              <XMarkIcon />
            </div>
            <div className="flex flex-col gap-1">
              <Typography.Text bold size="xl">
                {errorTitle}
              </Typography.Text>
              <Typography.Paragraph appearance="primary">
                {errorMessage}
              </Typography.Paragraph>
            </div>
          </div>
          <Button.Solid onClick={onErrorAction}>
            {errorButtonTitle}
          </Button.Solid>
        </div>
      ) : (
        <div className="flex flex-col gap-5 items-center text-center w-full">
          <div className="h-20 w-20 bg-level-4 rounded-full p-3 relative shadow-baseShadow">
            {logo && <IconComponent />}
            <div className="absolute w-full h-full top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
              <Spinner.Loading />
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <Typography.Text bold size="xl">
              {loadingTitle}
            </Typography.Text>
            <Typography.Text appearance="primary">
              {loadingMessage}
            </Typography.Text>
          </div>
        </div>
      )}
      {children}
    </div>
  );
};
