import {ExtensionFeature} from "@polkadex/react-providers";

export type ExtensionDetails =  {
    title: string;
    website: string | [string, string];
    features: "*" | ExtensionFeature[];
    id: string;
}