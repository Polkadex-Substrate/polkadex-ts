import { ExtensionsContextInterface } from "./types";

export const defaultExtensionsContext: ExtensionsContextInterface = {
  checkingInjectedWeb3: false,
  extensionsStatus: {},
  setExtensionStatus: (id, status) => {},
  removeExtensionStatus: (id) => {},
  extensionInstalled: (id) => false,
  extensionCanConnect: (id) => false,
  extensionHasFeature: (id, feature) => false,
};
