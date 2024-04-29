import { dot, usdt, usdc, ded, pink, astr } from "@moonbeam-network/xcm-config";
import { Asset } from "@moonbeam-network/xcm-types";

export { dot, usdt, usdc, ded, pink, astr };

export const pdex = new Asset({
  key: "pdex",
  originSymbol: "PDEX",
});

export const substrateAssets: Asset[] = [
  dot,
  usdt,
  pdex,
  usdc,
  ded,
  pink,
  astr,
];

export const assetsMap = new Map<string, Asset>(
  substrateAssets.map((asset) => [asset.key, asset])
);
