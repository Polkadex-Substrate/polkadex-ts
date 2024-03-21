import { useContext } from "react";

import { Context } from ".";

export const useTransactionManager = () => {
  const state = useContext(Context);

  if (!state) {
    const error = new Error("useTransactionManager context is undefined");
    error.name = "ContextError";
    Error?.captureStackTrace?.(error, useContext);
    throw error;
  }

  return { ...state };
};
