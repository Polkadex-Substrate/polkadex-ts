import {
  Fragment,
  PropsWithChildren,
  ElementType,
  useEffect,
  useState,
} from "react";
import { getExtensionIcon } from "@polkadot-cloud/assets/extensions";
import { Button, Typography } from "@polkadex/ux";
import { XMarkIcon } from "@heroicons/react/24/solid";

import { Spinner as CustomSpinner } from "./spinner";
const Spinner = ({
  children,
  active = true,
}: PropsWithChildren<{ active?: boolean }>) => {
  if (!active) return <Fragment>{children}</Fragment>;

  return (
    <div className="relative flex-1">
      <div className="z-50 flex items-center justify-center absolute w-full h-full bg-overlay-2">
        <CustomSpinner.Keyboard className="w-5 h-5" />
      </div>
      {children}
    </div>
  );
};

export const Processing = ({
  children,
  logo,
  active,
  errorTitle,
  errorMessage,
  errorButtonTitle = "Back",
  loadingTitle = "Processing transaction",
  loadingMessage = "Please wait, your transaction is being processed securely on the blockchain",
}: PropsWithChildren<{
  logo: string;
  active: boolean;
  errorTitle?: string;
  errorMessage?: string;
  errorButtonTitle?: string;
  loadingTitle?: string;
  loadingMessage?: string;
}>) => {
  const [state, setState] = useState(false);

  useEffect(() => {
    if (active) setState(true);
  }, [active]);

  if (!state) return <Fragment>{children}</Fragment>;
  const IconComponent = getExtensionIcon(logo) as ElementType;

  return (
    <div className="w-full h-full flex-1">
      <div className="absolute z-10 bg-level-2 rounded-md p-7 h-full w-full bottom-0 left-0 flex flex-col gap-5 items-center justify-center">
        {errorMessage ? (
          <div className="flex flex-col gap-5 w-full">
            <div className="flex flex-col gap-5 items-center text-center">
              <div className=" h-12 w-12 rounded-full bg-danger-base p-2 shadow-baseShadow">
                <XMarkIcon />
              </div>
              <div className="flex flex-col gap-1">
                <Typography.Text bold size="xl">
                  {errorTitle}
                </Typography.Text>
                <Typography.Paragraph variant="primary">
                  {errorMessage}
                </Typography.Paragraph>
              </div>
            </div>
            <Button.Solid onClick={() => setState(false)}>
              {errorButtonTitle}
            </Button.Solid>
          </div>
        ) : (
          <div className="flex flex-col gap-5 items-center text-center w-full">
            <div className="h-20 w-20 bg-level-2 rounded-full p-3 relative shadow-baseShadow">
              {logo && <IconComponent />}
              <div className="absolute w-full h-full top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                <CustomSpinner.Loading />
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <Typography.Text bold size="xl">
                {loadingTitle}
              </Typography.Text>
              <Typography.Text variant="primary">
                {loadingMessage}
              </Typography.Text>
            </div>
          </div>
        )}
      </div>
      {children}
    </div>
  );
};

export const Loading = {
  Spinner,
};
