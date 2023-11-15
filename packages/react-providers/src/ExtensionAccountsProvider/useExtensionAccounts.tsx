import { useContext } from "react";

import { ExtensionAccountsContext } from "./provider";

export const useExtensionAccounts = () => useContext(ExtensionAccountsContext);
