import {
  dot,
  usdt,
  usdc,
  ded,
  pink,
  astr,
  pha,
  glmr,
  intr,
  ibtc,
} from "@moonbeam-network/xcm-config";
import { Asset } from "@moonbeam-network/xcm-types";

export { dot, usdt, usdc, ded, pink, astr, pha, glmr, ibtc, intr };

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
  intr,
  ibtc,
];

export const assetsMap = new Map<string, Asset>(
  substrateAssets.map((asset) => [asset.key, asset])
);
