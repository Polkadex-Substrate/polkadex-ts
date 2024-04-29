import {
  dot,
  usdt,
  usdc,
  ded,
  pink,
  astr,
  pha,
  glmr,
} from "@moonbeam-network/xcm-config";
import { Asset } from "@moonbeam-network/xcm-types";

export { dot, usdt, usdc, ded, pink, astr, pha, glmr };

export const pdex = new Asset({
  key: "pdex",
  originSymbol: "PDEX",
});

export const unq = new Asset({
  key: "unq",
  originSymbol: "UNQ",
});

export const substrateAssets: Asset[] = [
  dot,
  usdt,
  pdex,
  usdc,
  ded,
  pink,
  astr,
  pha,
  glmr,
  unq,
];

export const assetsMap = new Map<string, Asset>(
  substrateAssets.map((asset) => [asset.key, asset])
);
