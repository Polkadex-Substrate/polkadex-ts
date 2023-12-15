import { createContext, useEffect, useState } from "react";
import { BrowserWallet } from "@polkadex/local-wallets";

import {
  UserAccountsContextInterface,
  UserAccountsProviderProps,
} from "./types";

const wallet = new BrowserWallet();
export const LocalAccountsContext = createContext<UserAccountsContextInterface>(
  {
    wallet,
    isReady: false,
    localAddresses: [],
  }
);

export const UserAccountsProvider = ({
  children,
}: UserAccountsProviderProps) => {
  const [localAddresses, setLocalAddresses] = useState<string[]>([]);

  useEffect(() => {
    if (!wallet.isReady()) {
      wallet.init().then(() => {
        wallet.subscribeAddresses((addresses) => {
          setLocalAddresses(addresses);
        });
      });
    }
  });

  return (
    <LocalAccountsContext.Provider
      value={{
        wallet,
        isReady: wallet.isReady(),
        localAddresses,
      }}
    >
      {children}
    </LocalAccountsContext.Provider>
  );
};
