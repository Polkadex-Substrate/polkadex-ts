import { BTreeMap, Enum, Struct, u128, Vec } from "@polkadot/types";
import { BN } from "@polkadot/util";
import { AccountId, AssetId } from "@polkadot/types/interfaces";

// blockchain account query result
export interface SystemAccount extends Struct {
  data: {
    free: BN;
    reserved: BN;
    frozen: BN;
    flags: BN;
  };
}

export interface PolkadexPrimitivesOcexAccountInfo extends Struct {
  mainAccount: AccountId;
  proxies: Vec<AccountId>;
}

export interface PalletAssetConversionPoolInfo extends Struct {
  lpToken: BN;
}

export interface PolkadexAssetId extends Enum {
  Polkadex: null;
  Asset: u128;
}

export type PalletAssetConversionPoolInfoEntries = BTreeMap<
  PolkadexAssetId,
  PalletAssetConversionPoolInfo
>;
