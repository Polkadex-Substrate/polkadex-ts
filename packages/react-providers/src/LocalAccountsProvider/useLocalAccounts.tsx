import { useContext } from "react";

import { LocalAccountsContext } from "./provider";

export const useUserAccounts = () => {
  const state = useContext(LocalAccountsContext);

  if (!LocalAccountsContext) {
    const error = new Error("UserAccountsContext context is undefined");
    error.name = "ContextError";
    Error?.captureStackTrace?.(error, useContext);
    throw error;
  }

  return { ...state };
};
