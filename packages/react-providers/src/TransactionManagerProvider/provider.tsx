"use client";

import { SubmittableExtrinsic } from "@polkadot/api/promise/types";
import { ISubmittableResult } from "@polkadot/types/types";
import {
  PropsWithChildren,
  ReactNode,
  createContext,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";

import { ExtStatus, TransactionManagerState } from "./types";

export const TransactionManagerProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const [txQueue, _setTxQueue] = useState<SubmittableExtrinsic[]>([]); // Tx queue
  const [txStatus, _setTxStatus] = useState<ExtStatus[]>([]); // List of statuses of current and past txs
  const stRef = useRef(txStatus);
  const txRef = useRef(txQueue);

  const setStQueue = useCallback((st: ExtStatus[]): void => {
    stRef.current = st;
    _setTxStatus(st);
  }, []);

  const setTxQueue = useCallback((txs: SubmittableExtrinsic[]): void => {
    txRef.current = txs;
    _setTxQueue(txs);
  }, []);

  const updateTxStatus = useCallback(
    (hash: string, result: ISubmittableResult | null, error?: Error) => {
      let updatedTxStatus: ExtStatus[];
      if (!result) {
        updatedTxStatus = stRef.current.map((e): ExtStatus => {
          if (e.hash === hash) {
            return {
              ...e,
              hash,
              status: "error",
              error,
            };
          }
          return e;
        });
      } else {
        updatedTxStatus = stRef.current.map((e): ExtStatus => {
          if (e.hash === hash) {
            return {
              hash,
              result: [...e.result, result],
              status: result.isError
                ? "error"
                : result.status.isFinalized
                ? "completed"
                : "ongoing",
            };
          }
          return e;
        });
      }

      setStQueue(updatedTxStatus);

      if (!result || result.isError || result.status.isFinalized) {
        // Drop transaction
        const validTxs = txRef.current.filter(
          (t) => t.hash.toHex().toString() !== hash
        );
        setTxQueue(validTxs);
      }
    },
    [setStQueue, setTxQueue]
  );

  const sendExtrinsicToChain = useCallback(
    async (ext: SubmittableExtrinsic) => {
      const hash = ext.hash.toHex().toString();
      try {
        await ext.send((result) => updateTxStatus(hash, result));
      } catch (error) {
        updateTxStatus(hash, null, error as Error);
        throw new Error(error as string);
      }
    },
    [updateTxStatus]
  );

  const addToTxQueue = (tx: SubmittableExtrinsic) => {
    // Push in tx queue
    setTxQueue([...txQueue, tx]);
    // Mark it's status as queued
    setStQueue([
      ...txStatus,
      {
        hash: tx.hash.toHex().toString(),
        result: [],
        status: "queued",
      },
    ]);
  };

  const getTxStatus = (hash: string) => {
    return txStatus.find((s) => s.hash === hash);
  };

  useEffect(() => {
    if (txQueue.length > 0) {
      // Check if there is no onGoing item
      const isOnGoing = txStatus.find((s) => s.status === "ongoing");
      if (!isOnGoing) {
        const ext = txQueue[0];
        // Send first extrinsic item to blockchain
        sendExtrinsicToChain(ext);
      }
    }
  }, [txStatus, txQueue, sendExtrinsicToChain]);

  return (
    <Provider value={{ addToTxQueue, getTxStatus, txStatus }}>
      {children}
    </Provider>
  );
};

export const Context = createContext<TransactionManagerState>({
  addToTxQueue: () => {},
  getTxStatus: () => undefined,
  txStatus: [],
});

const Provider = ({
  value,
  children,
}: PropsWithChildren<{ value: TransactionManagerState }>) => {
  return <Context.Provider value={value}>{children}</Context.Provider>;
};
