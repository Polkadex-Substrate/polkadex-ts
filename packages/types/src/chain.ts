import { Struct, Vec } from "@polkadot/types";
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

export interface PolkadexPrimitivesOcexAccountInfo extends Struct {
  mainAccount: AccountId;
  proxies: Vec<AccountId>;
}
