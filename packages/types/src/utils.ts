import { ExtensionFeature } from "@polkadot-cloud/assets/types";

export interface ExtensionDetails {
  title: string;
  website: string | [string, string];
  features: "*" | ExtensionFeature[];
  id: string;
}
