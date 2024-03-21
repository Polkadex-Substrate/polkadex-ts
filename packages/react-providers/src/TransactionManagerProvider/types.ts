import { ExtrinsicStatus } from "@polkadot/types/interfaces";
import { SubmittableExtrinsic } from "@polkadot/api/promise/types";

export type TransactionManagerState = {
  pushExtrinsic: (e: SubmittableExtrinsic) => void;
  extStatus: ExtStatus[];
};

export type ExtStatus = {
  hash: string;
  status: ExtrinsicStatus["type"][];
  isOngoing: boolean;
};
