import { useContext } from "react";

import { ExtensionsContext } from "../ExtensionsProvider";

import { UserAccountsContext } from "./provider";

export const useUserAccounts = () => {
  const state = useContext(UserAccountsContext);

  if (!ExtensionsContext) {
    const error = new Error("UserAccountsContext context is undefined");
    error.name = "ContextError";
    Error?.captureStackTrace?.(error, useContext);
    throw error;
  }

  return { ...state };
};
