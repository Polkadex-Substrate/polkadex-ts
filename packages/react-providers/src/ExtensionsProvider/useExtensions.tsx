"use client";

import { useContext } from "react";

import { ExtensionsContext } from "./provider";

export const useExtensions = () => {
  const state = useContext(ExtensionsContext);

  if (!ExtensionsContext) {
    const error = new Error("ExtensionsContext context is undefined");
    error.name = "ContextError";
    Error?.captureStackTrace?.(error, useContext);
    throw error;
  }

  return { ...state };
};
