import { Asset } from "@moonbeam-network/xcm-types";
import { dot, glmr, usdt } from "@moonbeam-network/xcm-config";

export { dot, usdt };

export const pha = new Asset({
  key: "pha",
  originSymbol: "PHA",
});

export const unq = new Asset({
  key: "unq",
  originSymbol: "UNQ",
});

export const pink = new Asset({
  key: "pink",
  originSymbol: "PINK",
});

export const ded = new Asset({
  key: "ded",
  originSymbol: "DED",
});
export const pdex = new Asset({
  key: "pdex",
  originSymbol: "PDEX",
});

export const assets: Asset[] = [dot, pha, unq, usdt, pink, ded, pdex, glmr];

export const assetsMap = new Map<string, Asset>(
  assets.map((asset) => [asset.key, asset])
);
