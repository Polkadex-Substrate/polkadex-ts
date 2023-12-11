import { UserAccountStore } from "@polkadex/trade-wallet";
import { ReactNode } from "react";

export interface UserAccountsContextInterface {
  wallet: UserAccountStore;
  isReady: boolean;
  userAddresses: string[];
}

export interface UserAccountsProviderProps {
  children: ReactNode;
}
