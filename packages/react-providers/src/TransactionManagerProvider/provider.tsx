"use client";

import { SubmittableExtrinsic } from "@polkadot/api/promise/types";
import { ISubmittableResult } from "@polkadot/types/types";
import {
  PropsWithChildren,
  ReactNode,
  createContext,
  useCallback,
  useEffect,
  useState,
} from "react";

import { ExtStatus, TransactionManagerState } from "./types";

export const TransactionManagerProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  // Think it like a queue
  const [extrinsics, setExtrinsics] = useState<SubmittableExtrinsic[]>([]);

  // List of status of current extrinsic and past extrinsics
  const [extStatus, setExtStatus] = useState<ExtStatus[]>([]);

  const pushExtrinsic = (extrinsic: SubmittableExtrinsic) =>
    setExtrinsics((prev) => [...prev, extrinsic]);

  const updateStatus = useCallback(
    (hash: string, result: ISubmittableResult) => {
      let updatedExtrinsicsStatus: ExtStatus[];
      const isHashExists = extStatus.find((e) => e.hash === hash);

      if (isHashExists) {
        updatedExtrinsicsStatus = extStatus.map((e) => {
          if (e.hash === hash) {
            return {
              hash,
              status: [...e.status, result.status.type],
              isOngoing: !result.status.isFinalized,
            };
          }
          return e;
        });
      } else {
        updatedExtrinsicsStatus = [
          ...extStatus,
          {
            hash,
            status: [result.status.type],
            isOngoing: !result.status.isFinalized,
          },
        ];
      }

      // BUG: Not updating extStatus
      setExtStatus(updatedExtrinsicsStatus);

      if (result.status.isFinalized) {
        setExtrinsics((e) => e.slice(1));
      }
    },
    [extStatus]
  );

  const sendExtrinsicToChain = useCallback(
    (ext: SubmittableExtrinsic) => {
      const hash = ext.hash.toHex().toString();
      ext.send((result) => updateStatus(hash, result));
    },
    [updateStatus]
  );

  useEffect(() => {
    if (extrinsics.length > 0) {
      // Check if there is no onGoing item
      const isOnGoing = extStatus.find((e) => e.isOngoing);
      if (!isOnGoing) {
        const ext = extrinsics[0];
        // Send first extrinsic item to blockchain
        sendExtrinsicToChain(ext);
      }
    }
  }, [extStatus, extrinsics, sendExtrinsicToChain]);

  return <Provider value={{ pushExtrinsic, extStatus }}>{children}</Provider>;
};

export const Context = createContext<TransactionManagerState>({
  pushExtrinsic: () => {},
  extStatus: [],
});

const Provider = ({
  value,
  children,
}: PropsWithChildren<{ value: TransactionManagerState }>) => {
  return <Context.Provider value={value}>{children}</Context.Provider>;
};
