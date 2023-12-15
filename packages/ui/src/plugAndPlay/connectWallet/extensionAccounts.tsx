import { ExtensionAccount } from "@polkadex/react-providers";
import { useEffect } from "react";

import { Interaction, Typography, Loading } from "../../components";
import { AccountCard } from "../../readyToUse";
import { WalletNotFound } from "../../illustrations";
export const ExtensionAccounts = ({
  extensionAccounts,
  onSelectExtensionAccount,
  onClose,
  onTryAgain,
  onRefresh,
  onRedirect,
  loading,
  success,
}: {
  extensionAccounts: ExtensionAccount[];
  onSelectExtensionAccount: (v: ExtensionAccount) => void;
  onClose?: () => void;
  onTryAgain: () => void;
  onRefresh: () => Promise<boolean>;
  onRedirect: () => void;
  loading: boolean;
  success: boolean;
}) => {
  const hasExtensionAccounts = !!extensionAccounts?.length;

  useEffect(() => {
    if (success && !loading) onRedirect();
  }, [loading, success, onRedirect]);

  return (
    <Loading.Spinner active={loading}>
      <Interaction withAnimation={!loading}>
        {hasExtensionAccounts && (
          <Interaction.Title onClose={onClose}>
            Select funding wallet
          </Interaction.Title>
        )}
        <Interaction.Content withPadding={false}>
          {!hasExtensionAccounts ? (
            <div className="flex flex-col gap-5 items-center px-7 py-8">
              <div className="max-w-[10rem]">
                <WalletNotFound className="w-full text-disabled" />
              </div>
              <div className="flex flex-col items-center gap-1">
                <Typography.Text bold size="xl">
                  No wallets found
                </Typography.Text>
                <Typography.Text variant="primary">
                  Oops, it looks like you don&apos;t have any wallet.
                </Typography.Text>
              </div>
            </div>
          ) : (
            <div className="min-h-[15rem]">
              <Typography.Text variant="secondary" size="xs" className="px-7">
                Available wallets
              </Typography.Text>
              <div className="flex flex-col px-3 max-h-[20rem] overflow-hidden hover:overflow-auto">
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
        </Interaction.Content>
        <Interaction.Footer>
          <Interaction.Action
            appearance="secondary"
            onClick={hasExtensionAccounts ? onTryAgain : onRefresh}
          >
            {hasExtensionAccounts ? "Refresh" : "Try again"}
          </Interaction.Action>
          <Interaction.Close onClick={onClose}>
            Connect other wallet
          </Interaction.Close>
        </Interaction.Footer>
      </Interaction>
    </Loading.Spinner>
  );
};
