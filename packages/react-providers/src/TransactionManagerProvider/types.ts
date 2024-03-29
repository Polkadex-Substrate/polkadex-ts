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
  status: "queued" | "ongoing" | "completed" | "error";
  error?: Error;
};
