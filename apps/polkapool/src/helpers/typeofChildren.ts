import { ReactNode } from "react";

export const typeofChildren = (value: ReactNode | ReactNode[]) =>
  Array.isArray(value) ? value.every(checkTypeof) : checkTypeof(value);

const checkTypeof = (value: ReactNode | ReactNode[]) =>
  typeof value === "number" || typeof value === "string";
