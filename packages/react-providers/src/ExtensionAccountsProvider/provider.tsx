import { ExtensionAccountsProviderProps } from "./types";

export const ExtensionAccountsProvider = ({
  children,
  network,
  ss58,
  dappName,
  activeAccount,
  setActiveAccount,
  onExtensionEnabled,
}: ExtensionAccountsProviderProps) => {
  console.log({ children });
};
