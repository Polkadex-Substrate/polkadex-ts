import { ExtrinsicConfigBuilderPrams } from "@moonbeam-network/xcm-builder";

export type ExtrinsicConfigBuilderParams = ExtrinsicConfigBuilderPrams & {
  isDirectTransfer: boolean;
};
