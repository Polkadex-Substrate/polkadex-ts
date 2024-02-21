"use client";

import { useContext } from "react";

import { ExtensionAccountsContext } from "./provider";

export const useExtensionAccounts = () => {
  const state = useContext(ExtensionAccountsContext);

  if (!ExtensionAccountsContext) {
    const error = new Error("ExtensionAccountsContext context is undefined");
    error.name = "ContextError";
    Error?.captureStackTrace?.(error, useContext);
    throw error;
  }

  return { ...state };
};
