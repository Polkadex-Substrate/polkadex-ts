import { ExtensionAccount } from "./ExtensionsProvider";

export type ImportedAccount = ExtensionAccount | ExternalAccount;

export interface ExternalAccount {
  address: string;
  network: string;
  name: string;
  source: string;
  addedBy: string;
}
