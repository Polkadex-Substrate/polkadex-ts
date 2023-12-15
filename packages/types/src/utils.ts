import {ExtensionFeature} from "@polkadot-cloud/assets/types";

export type ExtensionDetails =  {
    title: string;
    website: string | [string, string];
    features: "*" | ExtensionFeature[];
    id: string;
}