import { BTreeMap, Enum, Struct, u128, u16, Vec } from "@polkadot/types";
import { BN } from "@polkadot/util";
import { AccountId } from "@polkadot/types/interfaces";

// blockchain account query result
export interface SystemAccount extends Struct {
  data: {
    free: BN;
    reserved: BN;
    frozen: BN;
    flags: BN;
  };
}

export interface PalletAssetsAssetAccount extends Struct {
  balance: BN;
  status: string;
  reason: string;
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

export interface TradingPair extends Struct {
  /// Base asset identifier.
  base: PolkadexAssetId;
  /// Quote asset identifier.
  quote: PolkadexAssetId;
}

export interface Decimal extends Struct {
  flags: BN;
  hi: BN;
  lo: BN;
  mid: BN;
}

export interface LMPEpochConfig extends Struct {
  total_liquidity_mining_rewards: Decimal;
  total_trading_rewards: Decimal;
  market_weightage: BTreeMap<TradingPair, Decimal>;
  min_fees_paid: BTreeMap<TradingPair, Decimal>;
  min_maker_volume: BTreeMap<TradingPair, Decimal>;
  max_accounts_rewarded: u16;
  claim_safety_period: u16;
}
