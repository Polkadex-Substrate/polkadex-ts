import { ExtensionAccountsContextInterface } from "./types";

export const defaultExtensionAccountsContext: ExtensionAccountsContextInterface =
  {
    connectExtensionAccounts: () => Promise.resolve(false),
    extensionAccountsSynced: "unsynced",
    extensionAccounts: [],
  };

export const defaultHandleImportExtension = {
  newAccounts: [],
  meta: {
    removedActiveAccount: null,
  },
};
