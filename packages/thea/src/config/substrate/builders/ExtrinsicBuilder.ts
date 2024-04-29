import { polkadotXcm } from "./pallets/polkadotXcm";
import { xcmPallet } from "./pallets/xcmPallet";
import { xTokens } from "./pallets/xTokens";
import { xTransfer } from "./pallets/xTransfer";

export function ExtrinsicBuilderV2() {
  return {
    xTokens,
    xTransfer,
    xcmPallet,
    polkadotXcm,
  };
}
