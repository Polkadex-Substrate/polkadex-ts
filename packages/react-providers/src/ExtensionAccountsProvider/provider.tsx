"use client";

import { createContext, useCallback, useEffect, useRef, useState } from "react";
import {
  AnyFunction,
  setStateWithRef,
  AnyJson,
  localStorageOrDefault,
} from "@polkadex/utils";
import { useEffectIgnoreInitial } from "@polkadex/react-hooks";

import {
  ExtensionAccount,
  ExtensionInterface,
  useExtensions,
} from "../ExtensionsProvider";

import { useImportExtension } from "./useImportExtension";
import {
  ExtensionAccountsContextInterface,
  ExtensionAccountsProviderProps,
  Sync,
} from "./types";
import { extensionIsLocal, removeFromLocalExtensions } from "./utils";
import { defaultExtensionAccountsContext } from "./constants";

export const ExtensionAccountsContext =
  createContext<ExtensionAccountsContextInterface>(
    defaultExtensionAccountsContext
  );
export const ExtensionAccountsProvider = ({
  children,
  network,
  ss58,
  dappName,
  activeAccount,
  setActiveAccount,
  onExtensionEnabled,
}: ExtensionAccountsProviderProps) => {
  const {
    handleImportExtension,
    getActiveExtensionAccount,
    connectActiveExtensionAccount,
  } = useImportExtension();

  const {
    extensionsStatus,
    setExtensionStatus,
    removeExtensionStatus,
    checkingInjectedWeb3,
    extensionHasFeature,
  } = useExtensions();

  // Store connected extension accounts.
  const [extensionAccounts, setExtensionAccounts] = useState<
    ExtensionAccount[]
  >([]);
  const extensionAccountsRef = useRef(extensionAccounts);

  // Store whether extension accounts have been synced.
  const [extensionAccountsSynced, setExtensionAccountsSynced] =
    useState<Sync>("unsynced");

  // Store extensions whose account subscriptions have been initialised.
  const [extensionsInitialised, setExtensionsInitialised] = useState<AnyJson[]>(
    []
  );
  const extensionsInitialisedRef = useRef(extensionsInitialised);

  // Store unsubscribe handlers for connected extensions.
  const unsubs = useRef<Record<string, AnyFunction>>({});

  // Helper for setting active account. Ignores if not a valid function.
  const maybeSetActiveAccount = useCallback(
    (address: string | null) => {
      if (typeof setActiveAccount === "function")
        setActiveAccount(address ?? null);
    },
    [setActiveAccount]
  );

  // Helper for calling extension enabled callback. Ignores if not a valid function.
  const maybeOnExtensionEnabled = (id: string) => {
    if (typeof onExtensionEnabled === "function") onExtensionEnabled(id);
  };

  const connectToAccount = useCallback(
    (account: ExtensionAccount | null) => {
      maybeSetActiveAccount(account?.address ?? null);
    },
    [maybeSetActiveAccount]
  );

  // connectExtensionAccounts
  //
  // Similar to the above but only connects to a single extension. This is invoked by the user by
  // clicking on an extension. If activeAccount is not found here, it is simply ignored.
  const connectExtensionAccounts = async (id: string): Promise<boolean> => {
    const extensionKeys = Object.keys(extensionsStatus);
    const exists = extensionKeys.find((key) => key === id) || undefined;

    if (!exists) {
      updateInitialisedExtensions(
        `unknown_extension_${extensionsInitialisedRef.current.length + 1}`
      );
    } else {
      // Pre-connect: Inject into `injectedWeb3` if the provided extension is not already injected.

      try {
        // Attempt to get extension `enable` property.
        const { enable } = window.injectedWeb3[id];

        // Summons extension popup.
        const extension: ExtensionInterface = await enable(dappName);

        // Continue if `enable` succeeded, and if the current network is supported.
        if (extension !== undefined) {
          // Call optional `onExtensionEnabled` callback.
          maybeOnExtensionEnabled(id);

          // Handler for new accounts.
          const handleAccounts = (a: ExtensionAccount[]) => {
            const { newAccounts, meta } = handleImportExtension(
              id,
              extensionAccountsRef.current,
              extension,
              a,
              forgetAccounts,
              { network, ss58 }
            );
            // Set active account for network if not yet set.
            if (!activeAccount) {
              const activeExtensionAccount = getActiveExtensionAccount(
                { network, ss58 },
                newAccounts
              );
              if (
                activeExtensionAccount?.address !== meta.removedActiveAccount &&
                meta.removedActiveAccount !== null
              )
                connectActiveExtensionAccount(
                  activeExtensionAccount,
                  connectToAccount
                );
            }
            // Concat accounts and store.
            addExtensionAccount(newAccounts);
            // Update initialised extensions.
            updateInitialisedExtensions(id);
          };

          // If account subscriptions are not supported, simply get the account(s) from the extnsion. Otherwise, subscribe to accounts.
          if (!extensionHasFeature(id, "subscribeAccounts")) {
            const accounts = await extension.accounts.get();
            handleAccounts(accounts);
          } else {
            const unsub = extension.accounts.subscribe((accounts) => {
              if (accounts) handleAccounts(accounts);
            });
            addToUnsubscribe(id, unsub);
          }
          return true;
        }
      } catch (err) {
        handleExtensionError(id, String(err));
      }
    }
    return false;
  };

  // Handle errors when communiating with extensions.
  const handleExtensionError = useCallback(
    (id: string, err: string) => {
      // if not general error (maybe enabled but no accounts trust app)
      if (err.startsWith("Error")) {
        // remove extension from local `active_extensions`.
        removeFromLocalExtensions(id);
        // extension not found (does not exist)
        if (err.substring(0, 17) === "NotInstalledError") {
          removeExtensionStatus(id);
        } else {
          // declare extension as no imported accounts authenticated.
          setExtensionStatus(id, "not_authenticated");
        }
      }
      // mark extension as initialised
      updateInitialisedExtensions(id);
    },
    [removeExtensionStatus, setExtensionStatus]
  );

  // Handle forgetting of an imported extension account.
  const forgetAccounts = useCallback(
    (forget: ExtensionAccount[]) => {
      // Unsubscribe and remove unsub from context ref.
      if (forget.length) {
        for (const { address } of forget) {
          if (extensionAccountsRef.current.find((a) => a.address === address)) {
            const unsub = unsubs.current[address];
            if (unsub) {
              unsub();
              delete unsubs.current[address];
            }
          }
        }
        // Remove forgotten accounts from context state.
        setStateWithRef(
          [...extensionAccountsRef.current].filter(
            (a) => forget.find((s) => s.address === a.address) === undefined
          ),
          setExtensionAccounts,
          extensionAccountsRef
        );
        // If the currently active account is being forgotten, disconnect.
        if (activeAccount) {
          if (
            forget.find(({ address }) => address === activeAccount) !==
            undefined
          )
            maybeSetActiveAccount(null);
        }
      }
    },
    [activeAccount, maybeSetActiveAccount]
  );

  // connectActiveExtensions
  //
  // Connects to extensions that already have been connected to and stored in localStorage. Loop
  // through extensions and connect to accounts. If `activeAccount` exists locally, we wait until
  // all extensions are looped before connecting to it; there is no guarantee it still exists - must
  // explicitly find it.
  const connectActiveExtensions = useCallback(async () => {
    const extensionKeys = Object.keys(extensionsStatus);
    // Exit if no installed extensions.
    if (!extensionKeys.length) return;

    // Iterate extensions, `enable` and add accounts to state.
    const total = extensionKeys?.length ?? 0;
    let activeWalletAccount: ExtensionAccount | null = null;
    let i = 0;
    for (const id of extensionKeys) {
      i++;

      // Whether extension is locally stored (previously connected).
      const isLocal = extensionIsLocal(id ?? "0");
      if (!id || !isLocal) {
        updateInitialisedExtensions(
          id ||
            `unknown_extension_${extensionsInitialisedRef.current.length + 1}`
        );
      } else {
        try {
          // Attempt to get extension `enable` property.
          const { enable } = window.injectedWeb3[id];

          // Summons extension popup.
          const extension: ExtensionInterface = await enable(dappName);

          // Continue if `enable` succeeded, and if the current network is supported.
          if (extension !== undefined) {
            // Handler for new accounts.
            const handleAccounts = (accounts: ExtensionAccount[]) => {
              const { newAccounts, meta } = handleImportExtension(
                id,
                extensionAccountsRef.current,
                extension,
                accounts,
                forgetAccounts,
                {
                  network,
                  ss58,
                }
              );

              // Store active wallet account if found in this extension.
              if (newAccounts.length)
                if (!activeWalletAccount)
                  activeWalletAccount = getActiveExtensionAccount(
                    { network, ss58 },
                    newAccounts
                  );

              // Set active account for network on final extension.
              if (i === total && !activeAccount) {
                const activeAccountRemoved =
                  activeWalletAccount?.address !== meta.removedActiveAccount &&
                  meta.removedActiveAccount !== null;
                if (!activeAccountRemoved) {
                  connectActiveExtensionAccount(
                    activeWalletAccount,
                    connectToAccount
                  );
                }
              }
              // Concat accounts and store.
              addExtensionAccount(newAccounts);
              // Update initialised extensions.
              updateInitialisedExtensions(id);
            };

            // If account subscriptions are not supported, simply get the account(s) from the
            // extnsion. Otherwise, subscribe to accounts.
            if (!extensionHasFeature(id, "subscribeAccounts")) {
              const accounts = await extension.accounts.get();
              handleAccounts(accounts);
            } else {
              const unsub = extension.accounts.subscribe((accounts) => {
                if (accounts) handleAccounts(accounts);
              });
              addToUnsubscribe(id, unsub);
            }
          }
        } catch (err) {
          handleExtensionError(id, String(err));
        }
      }
    }
  }, [
    activeAccount,
    connectActiveExtensionAccount,
    connectToAccount,
    dappName,
    extensionHasFeature,
    extensionsStatus,
    forgetAccounts,
    getActiveExtensionAccount,
    handleExtensionError,
    handleImportExtension,
    network,
    ss58,
  ]);

  // Update initialised extensions.
  const updateInitialisedExtensions = (id: string) => {
    if (!extensionsInitialisedRef.current.includes(id)) {
      setStateWithRef(
        [...extensionsInitialisedRef.current].concat(id),
        setExtensionsInitialised,
        extensionsInitialisedRef
      );
    }
  };

  // Add an extension account to context state.
  const addExtensionAccount = (a: ExtensionAccount[]) => {
    setStateWithRef(
      [...extensionAccountsRef.current].concat(a),
      setExtensionAccounts,
      extensionAccountsRef
    );
  };

  // add an extension id to unsubscribe state.
  const addToUnsubscribe = (id: string, unsub: AnyFunction) => {
    unsubs.current[id] = unsub;
  };

  // Unsubscrbe all account subscriptions.
  const unsubscribe = () => {
    Object.values(unsubs.current).forEach((unsub) => {
      unsub();
    });
  };

  // Re-sync extensions accounts on `unsynced`.
  useEffect(() => {
    // wait for injectedWeb3 check to finish before starting account import process.
    if (!checkingInjectedWeb3 && extensionAccountsSynced === "unsynced") {
      // unsubscribe from all accounts and reset state
      unsubscribe();
      setStateWithRef([], setExtensionAccounts, extensionAccountsRef);
      setStateWithRef([], setExtensionsInitialised, extensionsInitialisedRef);
      // if extensions have been fetched, get accounts if extensions exist and
      // local extensions exist (previously connected).
      if (Object.keys(extensionsStatus).length) {
        // get active extensions
        const localExtensions = localStorageOrDefault(
          `active_extensions`,
          [],
          true
        );
        if (Object.keys(extensionsStatus).length && localExtensions.length) {
          setExtensionAccountsSynced("syncing");
          connectActiveExtensions();
        } else setExtensionAccountsSynced("synced");
      }
    }
    return () => unsubscribe();
  }, [
    extensionsStatus,
    checkingInjectedWeb3,
    extensionAccountsSynced,
    connectActiveExtensions,
  ]);

  // Change syncing to unsynced on `ss58` change.
  useEffectIgnoreInitial(() => {
    setExtensionAccountsSynced("unsynced");
  }, [ss58]);

  // Once initialised extensions equal total extensions present in `injectedWeb3`, mark extensions
  // as fetched.
  useEffectIgnoreInitial(() => {
    if (
      !checkingInjectedWeb3 &&
      extensionsInitialised.length === Object.keys(extensionsStatus).length
    ) {
      setExtensionAccountsSynced("synced");
    }
  }, [checkingInjectedWeb3, extensionsInitialised]);

  return (
    <ExtensionAccountsContext.Provider
      value={{
        connectExtensionAccounts,
        extensionAccountsSynced,
        extensionAccounts: extensionAccountsRef.current,
      }}
    >
      {children}
    </ExtensionAccountsContext.Provider>
  );
};
