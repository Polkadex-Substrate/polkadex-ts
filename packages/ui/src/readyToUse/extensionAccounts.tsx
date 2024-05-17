import { ExtensionAccount } from "@polkadex/react-providers";
import {
  ElementType,
  Fragment,
  PropsWithChildren,
  useCallback,
  useEffect,
  useState,
} from "react";
import classNames from "classnames";
import { getExtensionIcon } from "@polkadot-cloud/assets/extensions";
import { RiCloseLine } from "@remixicon/react";

import {
  Interaction,
  Typography,
  InteractionProps,
  Spinner,
  Loading as PolkadexLoading,
} from "../components";
import { Illustrations } from "../..";

import { AccountCard } from "./accountCard";

interface ExtensionAccountsProps extends InteractionProps {
  extensionAccounts: ExtensionAccount[];
  onSelectExtensionAccount: (v: ExtensionAccount) => void;
  onClose?: () => void;
  onTryAgain?: () => void;
  onRefresh?: () => Promise<boolean>;
  onRedirect?: () => void;
  loading?: boolean;
  success?: boolean;
  extensionIcon?: string;
  extensionName?: string;
  onPermission: () => Promise<boolean>;
}
export const ExtensionAccounts = ({
  extensionAccounts,
  onSelectExtensionAccount,
  onClose,
  onTryAgain,
  onRefresh,
  onRedirect,
  loading = false,
  success,
  extensionIcon = "",
  extensionName = "",
  onPermission,
  ...props
}: ExtensionAccountsProps) => {
  const [done, setDone] = useState(false);
  const [ready, setReady] = useState(false);
  const [error, setError] = useState(false);

  const hasExtensionAccounts = !!extensionAccounts?.length;
  const hasTryAgain = typeof onTryAgain === "function";
  const hasRefresh = typeof onRefresh === "function";

  const callbackFn = useCallback(async () => {
    try {
      const success = await onPermission();
      if (!success) {
        setError(() => true);
        return;
      }

      setReady(() => true);
      setError(() => false);
    } catch (error) {
      console.log("error", error);
      setError(() => true);
    } finally {
      setDone(() => true);
    }
  }, [onPermission]);

  useEffect(() => {
    if (success && !loading) onRedirect?.();
  }, [loading, success, onRedirect]);

  const IconComponent = getExtensionIcon(
    extensionIcon as string
  ) as ElementType;

  useEffect(() => {
    if (!error && !ready) callbackFn();
  }, [callbackFn, error, ready]);

  const message = `Please authorize your ${extensionName} wallet extension to connect to Orderbook App`;

  return (
    <PolkadexLoading.Spinner active={loading}>
      <Interaction className="w-full" {...props}>
        {hasExtensionAccounts && (
          <Interaction.Title onClose={{ onClick: onClose }}>
            Select funding account
          </Interaction.Title>
        )}
        {done && (
          <Interaction.Content withPadding={false}>
            <Fragment>
              {error || !ready ? (
                <Loading ready={ready} message={message}>
                  {extensionIcon && <IconComponent />}
                </Loading>
              ) : (
                <Fragment>
                  {!hasExtensionAccounts ? (
                    <div className="flex flex-col gap-5 items-center px-7 py-8">
                      <div className="max-w-[10rem]">
                        <Illustrations.WalletNotFound className="w-full text-disabled" />
                      </div>
                      <div className="flex flex-col items-center gap-1">
                        <Typography.Text bold size="xl">
                          No wallets found
                        </Typography.Text>
                        <Typography.Text appearance="primary">
                          Oops, it looks like you don&apos;t have any wallet.
                        </Typography.Text>
                      </div>
                    </div>
                  ) : (
                    <div
                      className={classNames(
                        extensionAccounts?.length > 4 &&
                          "border-b border-primary"
                      )}
                    >
                      <Typography.Text
                        appearance="secondary"
                        size="xs"
                        className="px-7"
                      >
                        Available wallets
                      </Typography.Text>
                      <div className="flex flex-col px-3 max-h-[200px] overflow-hidden hover:overflow-auto">
                        {extensionAccounts.map((value, i) => (
                          <AccountCard
                            key={i}
                            name={value.name}
                            address={value.address}
                            onClick={() => onSelectExtensionAccount(value)}
                          />
                        ))}
                      </div>
                    </div>
                  )}
                </Fragment>
              )}
            </Fragment>
          </Interaction.Content>
        )}

        <Interaction.Footer>
          {done && hasTryAgain && hasRefresh && (
            <Interaction.Action
              appearance="secondary"
              onClick={hasExtensionAccounts ? onTryAgain : onRefresh}
            >
              {hasExtensionAccounts ? "Refresh" : "Try again"}
            </Interaction.Action>
          )}

          <Interaction.Close onClick={onClose}>
            Connect other wallet
          </Interaction.Close>
        </Interaction.Footer>
      </Interaction>
    </PolkadexLoading.Spinner>
  );
};

const Loading = ({
  message,
  ready,
  children,
}: PropsWithChildren<{ message: string; ready: boolean }>) => {
  return (
    <div className="flex flex-col gap-5 items-center text-center">
      {ready ? (
        <>
          <div className="h-20 w-20 bg-level-2 rounded-full p-3 relative shadow-baseShadow">
            {children}
            <div className="absolute w-full h-full top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
              <Spinner.Loading />
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <Typography.Text bold size="xl">
              Waiting for authorization
            </Typography.Text>
            <Typography.Text appearance="primary">{message}</Typography.Text>
          </div>
        </>
      ) : (
        <>
          <div className="max-w-[13rem]">
            <div className="h-20 w-20 bg-level-2 rounded-full p-3 relative shadow-baseShadow">
              {children}
              <div className="h-6 w-6 p-1 rounded-full bg-danger-base absolute bottom-0 right-0">
                <RiCloseLine className="w-full h-full" />
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-1">
            <Typography.Text bold size="xl">
              Wallet permission issue
            </Typography.Text>
            <Typography.Text appearance="primary">
              Access not granted. Please open the extension, allow access for
              the Orderbook app, and then try again.
            </Typography.Text>
          </div>
        </>
      )}
    </div>
  );
};
