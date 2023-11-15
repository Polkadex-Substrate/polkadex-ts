import { XMarkIcon } from "@heroicons/react/24/solid";

import { Icon, Interaction, Spinner, Typography } from "../../components";

export const Authorization = ({
  logo,
  loadingTitle = "Waiting for authorization",
  loadingDescription = "Please authorize your Polkadot.js wallet extension to connect to Orderbook App",
  loading = true,
  errorTitle = "Wallet permission issue",
  errorDescription = "  Access not granted. Please open the extension, allow access for the Orderbook app, and then try again.",
  error = false,
}: {
  logo: string;
  loadingTitle?: string;
  loadingDescription?: string;
  loading?: boolean;
  errorTitle?: string;
  errorDescription?: string;
  error?: boolean;
}) => {
  return (
    <Interaction className="gap-10">
      <Interaction.Content className="flex flex-col gap-5 items-center text-center">
        {error && !loading ? (
          <>
            <div className="max-w-[13rem]">
              <div className="h-20 w-20 bg-level-2 rounded-full p-3 relative shadow-baseShadow">
                {logo && <Icon name={logo} />}
                <div className="h-6 w-6 p-1 rounded-full bg-danger-base absolute bottom-0 right-0">
                  <XMarkIcon />
                </div>
              </div>
            </div>
            <div className="flex flex-col gap-1">
              <Typography.Text bold size="lg">
                {errorTitle}
              </Typography.Text>
              <Typography.Text variant="primary">
                {errorDescription}
              </Typography.Text>
            </div>
          </>
        ) : (
          <>
            <div className="h-20 w-20 bg-level-2 rounded-full p-3 relative shadow-baseShadow">
              <Icon name={logo} />
              <div className="absolute w-full h-full top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                <Spinner.Loading />
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <Typography.Text bold size="lg">
                {loadingTitle}
              </Typography.Text>
              <Typography.Text variant="primary">
                {loadingDescription}
              </Typography.Text>
            </div>
          </>
        )}
      </Interaction.Content>
      <Interaction.Footer>
        <Interaction.Action variant="secondary">Try again</Interaction.Action>
        <Interaction.Close>Connect other wallet</Interaction.Close>
      </Interaction.Footer>
    </Interaction>
  );
};
