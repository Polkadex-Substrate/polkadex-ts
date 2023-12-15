import { ReactNode } from "react";

import { LocalAccountStore } from "../../../local-wallets";

export interface UserAccountsContextInterface {
  wallet: LocalAccountStore;
  isReady: boolean;
  localAddresses: string[];
}

export interface UserAccountsProviderProps {
  children: ReactNode;
}
