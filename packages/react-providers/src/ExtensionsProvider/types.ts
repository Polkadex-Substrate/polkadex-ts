import { FunctionComponent, SVGProps } from "react";
import { AnyJson } from "@polkadex/utils";

export type ExtensionStatus = "installed" | "not_authenticated" | "connected";

// Supported extension features.
export type ExtensionFeature = "getAccounts" | "subscribeAccounts" | "signer";

// Extensions context interface.
export interface ExtensionsContextInterface {
  checkingInjectedWeb3: boolean;
  extensionsStatus: Record<string, ExtensionStatus>;
  setExtensionStatus: (id: string, status: ExtensionStatus) => void;
  removeExtensionStatus: (id: string) => void;
  extensionInstalled: (id: string) => boolean;
  extensionCanConnect: (id: string) => boolean;
  extensionHasFeature: (id: string, feature: ExtensionFeature) => boolean;
}

// Top level required properties the extension must expose via their `injectedWeb3` entry.
export interface ExtensionInjected extends ExtensionConfig {
  id: string;
  enable: (n: string) => Promise<ExtensionInterface>;
}

// Required properties `enable` must provide after resolution.
export interface ExtensionInterface {
  accounts: {
    subscribe: {
      (a: { (b: ExtensionAccount[]): void }): void;
    };
    get: () => Promise<ExtensionAccount[]>;
  };
  provider: AnyJson;
  metadata: AnyJson;
  signer: AnyJson;
}

// Required properties returned after subscribing to accounts.
export interface ExtensionAccount extends ExtensionMetadata {
  address: string;
  meta?: AnyJson;
  name: string;
  type: "sr25519" | "ethereum";
  signer?: AnyJson;
}

// Configuration item of an extension.
export interface ExtensionConfig {
  id: string;
  title: string;
  icon: FunctionComponent<
    SVGProps<SVGSVGElement> & { title?: string | undefined }
  >;
  url: string;
}

// Miscellaneous metadata added to an extension.
export interface ExtensionMetadata {
  addedBy?: string;
  source: string; // eg: talisman, polkadot-js
}
