import { SubmittableExtrinsic } from "@polkadot/api/promise/types";
import { SubmittableResult } from "@polkadot/api";

export type TransactionManagerState = {
  addToTxQueue: (e: SubmittableExtrinsic) => void;
  txStatus: ExtStatus[];
  getTxStatus: (hash: string) => ExtStatus | undefined;
};

export type ExtStatus = {
  hash: string;
  result: SubmittableResult[];
  status: "broadcasted" | "inblock" | "finalized" | "error" | "ongoing";
  error?: string;
};
