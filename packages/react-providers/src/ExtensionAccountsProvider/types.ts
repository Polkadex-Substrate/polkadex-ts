import { ReactNode } from "react";
import { MaybeAddress } from "utils/src/types";

import { ExtensionAccount } from "../ExtensionsProvider";
import { ImportedAccount } from "../types";

export interface ExtensionAccountsContextInterface {
  connectExtensionAccounts: (id?: string) => Promise<boolean>;
  forgetAccounts: (a: ExtensionAccount[]) => void;
  extensionAccountsSynced: Sync;
  extensionAccounts: ImportedAccount[];
}

export interface ExtensionAccountsProviderProps {
  children: ReactNode;
  network: string;
  ss58: number;
  dappName: string;
  activeAccount?: MaybeAddress;
  setActiveAccount?: (a: MaybeAddress) => void;
  onExtensionEnabled?: (id: string) => void;
}

export interface HandleImportExtension {
  newAccounts: ExtensionAccount[];
  meta: {
    removedActiveAccount: MaybeAddress;
  };
}
export type Sync = "synced" | "unsynced" | "syncing";
