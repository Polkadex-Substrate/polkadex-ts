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
import { getStatus } from "./utils";

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
    (
      extrinsic: SubmittableExtrinsic,
      hash: string,
      result: ISubmittableResult
    ) => {
      const updatedTxStatus = stRef.current.map((e): ExtStatus => {
        if (e.hash === hash) {
          if (e.error) return e;
          let error = "";
          const { status, isError, dispatchError } = result;
          const { isFinalized, isInBlock, isBroadcast } = status;

          if (dispatchError) {
            if (dispatchError.isModule) {
              const { docs, name, section } = extrinsic.registry.findMetaError(
                dispatchError.asModule
              );
              error = `${section}.${name}: ${docs.join(" ")}`;
            } else {
              error = dispatchError.toString();
            }
          }

          const statusText = getStatus({
            isError,
            isBroadcast,
            isInBlock,
            isFinalized,
          });

          return {
            hash,
            result: [...e.result, result],
            status: statusText,
            error,
          };
        }
        return e;
      });

      setStQueue(updatedTxStatus);

      if (
        !result ||
        result.isError ||
        result.dispatchError ||
        result.status.isFinalized
      ) {
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
        await ext.send((result) => updateTxStatus(ext, hash, result));
      } catch (error) {
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
        status: "ongoing",
      },
    ]);
  };

  const getTxStatus = useCallback(
    (hash: string) => {
      return txStatus.find((s) => s.hash === hash);
    },
    [txStatus]
  );

  useEffect(() => {
    if (txQueue.length) {
      const started = txStatus
        .filter((s) => !s.error)
        .find((s) => s.status === "broadcasted" || s.status === "inblock");
      if (!started) sendExtrinsicToChain(txQueue[0]);
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
