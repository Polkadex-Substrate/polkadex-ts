import { useContext } from "react";

import { UserAccountsContext } from "./provider";

export const useUserAccounts = () => {
  const state = useContext(UserAccountsContext);

  if (!UserAccountsContext) {
    const error = new Error("UserAccountsContext context is undefined");
    error.name = "ContextError";
    Error?.captureStackTrace?.(error, useContext);
    throw error;
  }

  return { ...state };
};
