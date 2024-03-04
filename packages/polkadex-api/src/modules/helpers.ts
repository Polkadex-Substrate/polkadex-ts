import { cleanNumberLike } from "@polkadex/numericals";

export function parseAsset(asset: unknown): string {
  if (typeof asset !== "object") {
    throw new Error(`cannot parse asset ${asset}`);
  }
  if (!!asset && "polkadex" in asset) {
    return "polkadex";
  }

  if (!!asset && "asset" in asset) {
    return cleanNumberLike(asset.asset as string).toFixed();
  }
  throw new Error(`cannot parse asset ${asset}`);
}

export function assetIdEnumFromString(
  id: string | Record<string, null | string>
): Record<string, null | string> {
  if (!!id && typeof id === "object") {
    return id;
  }
  if (id.toUpperCase() === "POLKADEX" || id.toUpperCase() === "PDEX") {
    return { polkadex: null };
  }
  return { asset: id };
}
