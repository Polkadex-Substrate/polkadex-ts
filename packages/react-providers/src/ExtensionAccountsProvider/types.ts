// Copyright 2023 @paritytech/polkadot-cloud authors & contributors
// SPDX-License-Identifier: GPL-3.0-only

import { ReactNode } from "react";
import { MaybeAddress } from "@polkadex-ts/utils";

import { ExtensionAccount } from "../ExtensionsProvider";

export interface ExtensionAccountsContextInterface {
  connectExtensionAccounts: (id: string) => Promise<boolean>;
  extensionAccountsSynced: Sync;
  extensionAccounts: ExtensionAccount[];
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
