import { dot, usdt, usdc, ded } from "@moonbeam-network/xcm-config";
import { Asset } from "@moonbeam-network/xcm-types";

export { dot, usdt, usdc, ded };

export const pdex = new Asset({
  key: "pdex",
  originSymbol: "PDEX",
});

export const substrateAssets: Asset[] = [dot, usdt, pdex, usdc, ded];

export const assetsMap = new Map<string, Asset>(
  substrateAssets.map((asset) => [asset.key, asset])
);
