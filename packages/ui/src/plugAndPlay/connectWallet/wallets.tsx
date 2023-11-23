import { ExtensionAccount } from "@polkadex/react-providers";

import { Interaction, Typography } from "../../components";
import { WalletCard } from "../../readyToUse";
import { WalletNotFound } from "../../illustrations";

export const Wallets = ({
  wallets,
  onSelectWallet,
  onClose,
  onTryAgain,
  onRefresh,
}: {
  wallets: ExtensionAccount[];
  onSelectWallet: (v: ExtensionAccount) => void;
  onClose: () => void;
  onTryAgain: () => void;
  onRefresh: () => Promise<boolean>;
}) => {
  const hasWallet = !!wallets?.length;
  return (
    <Interaction className="gap-10">
      {hasWallet && (
        <Interaction.Title onClose={onClose}>
          Select funding wallet
        </Interaction.Title>
      )}
      <Interaction.Content
        className="flex flex-col gap-1 flex-1"
        withPadding={false}
      >
        {!hasWallet ? (
          <div className="flex flex-col gap-10 items-center px-7">
            <div className="max-w-[13rem]">
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
              {wallets.map((value, i) => (
                <WalletCard
                  key={i}
                  name={value.name}
                  address={value.address}
                  onClick={() => onSelectWallet(value)}
                />
              ))}
            </div>
          </div>
        )}
      </Interaction.Content>
      <Interaction.Footer>
        <Interaction.Action
          appearance="secondary"
          onClick={hasWallet ? onTryAgain : onRefresh}
        >
          {hasWallet ? "Refresh" : "Try again"}
        </Interaction.Action>
        <Interaction.Close onClick={onClose}>
          Connect other wallet
        </Interaction.Close>
      </Interaction.Footer>
    </Interaction>
  );
};
