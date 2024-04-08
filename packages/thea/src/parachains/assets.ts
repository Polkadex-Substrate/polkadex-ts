import { Asset } from "@moonbeam-network/xcm-types";
import { dot, usdt } from "@moonbeam-network/xcm-config";

export { dot, usdt };

export const pdex = new Asset({
  key: "pdex",
  originSymbol: "PDEX",
});

export const assets: Asset[] = [dot, usdt];

export const assetsMap = new Map<string, Asset>(
  assets.map((asset) => [asset.key, asset])
);
