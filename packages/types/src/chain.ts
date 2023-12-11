import { Struct } from "@polkadot/types";
import { BN } from "@polkadot/util";

// blockchain account query result
export interface SystemAccount extends Struct {
  data: {
    free: BN;
    reserved: BN;
    frozen: BN;
    flags: BN;
  };
}
