import { createContext, useEffect, useState } from "react";
import { TradeWallet } from "@polkadex/trade-wallet";

import {
  UserAccountsContextInterface,
  UserAccountsProviderProps,
} from "./types";

const wallet = new TradeWallet();
export const UserAccountsContext = createContext<UserAccountsContextInterface>({
  wallet,
  isReady: false,
  userAddresses: [],
});

export const UserAccountsProvider = ({
  children,
}: UserAccountsProviderProps) => {
  const [userAddresses, setUserAddresses] = useState<string[]>([]);

  useEffect(() => {
    if (!wallet.isReady()) {
      wallet.init().then(() => {
        wallet.subscribeAddresses((addresses) => {
          setUserAddresses(addresses);
        });
      });
    }
  });

  return (
    <UserAccountsContext.Provider
      value={{
        wallet,
        isReady: wallet.isReady(),
        userAddresses,
      }}
    >
      {children}
    </UserAccountsContext.Provider>
  );
};
