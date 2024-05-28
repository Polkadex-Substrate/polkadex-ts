"use client";

import { Interactable, Modal } from "@polkadex/ux";
import { useCallback, useMemo } from "react";
import { useExtensionAccounts } from "@polkadex/react-providers";

import { ConnectWallet } from "../connectWallet";
import { Authorization, ExtensionAccounts } from "..";

import { useCoreProvider } from "@/core";

export const ConnectAccount = () => {
  const {
    showConnectAccount,
    setShowConnectAccount,
    onSetAccount,
    extension,
    setExtension,
  } = useCoreProvider();

  const { connectExtensionAccounts, extensionAccounts } =
    useExtensionAccounts();

  const sourceId = useMemo(() => extension?.id, [extension?.id]);

  const walletsFiltered = useMemo(
    () =>
      !!extensionAccounts && !!sourceId
        ? extensionAccounts.filter(
            (e) => e.source === sourceId && e.type === "sr25519"
          )
        : [],
    [extensionAccounts, sourceId]
  );

  const handleClose = useCallback(
    () => setShowConnectAccount(false),
    [setShowConnectAccount]
  );

  return (
    <Modal
      open={showConnectAccount}
      onOpenChange={setShowConnectAccount}
      closeOnClickOutside
      placement="center left"
      className="top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
    >
      <Modal.Content>
        <Interactable>
          <Interactable.Trigger>
            <ConnectWallet
              onSetExtension={setExtension}
              onClose={handleClose}
            />
          </Interactable.Trigger>
          <Interactable.Content>
            <Interactable.Card pageName="authorization">
              <Authorization
                onAction={async () =>
                  await connectExtensionAccounts(sourceId as string)
                }
                extensionName={extension?.title}
                extensionIcon={extension?.id}
              />
            </Interactable.Card>
            <Interactable.Card pageName="accounts">
              <ExtensionAccounts
                key="ConnectFundingWallets"
                extensionAccounts={walletsFiltered}
                onSelectExtensionAccount={(e) => {
                  onSetAccount(e);
                  handleClose();
                }}
                onResetExtension={() => setExtension(null)}
                onClose={handleClose}
              />
            </Interactable.Card>
          </Interactable.Content>
        </Interactable>
      </Modal.Content>
    </Modal>
  );
};
