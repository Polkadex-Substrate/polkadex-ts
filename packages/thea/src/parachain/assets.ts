import { dot, usdt } from "@moonbeam-network/xcm-config";
import { Asset } from "@moonbeam-network/xcm-types";

export { dot, usdt };

export const pdex = new Asset({
  key: "pdex",
  originSymbol: "PDEX",
});

export const assets: Asset[] = [dot, usdt, pdex];

export const assetsMap = new Map<string, Asset>(
  assets.map((asset) => [asset.key, asset])
);
