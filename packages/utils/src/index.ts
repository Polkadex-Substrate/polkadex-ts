import type { MutableRefObject } from "react";

import { AnyFunction, AnyJson } from "./types";

export const withTimeout = (
  fn: AnyFunction,
  args: AnyJson,
  timeout: number
) => {
  return new Promise((resolve, reject) => {
    fn(...args).then(resolve, reject);
    setTimeout(() => {
      // eslint-disable-next-line prefer-promise-reject-errors
      reject();
    }, timeout);
  });
};

/**
 * @name setStateWithRef
 * @summary Synchronize React state and its reference with the provided value.
 */
export const setStateWithRef = <T>(
  value: T,
  setState: (_state: T) => void,
  ref: MutableRefObject<T>
): void => {
  setState(value);
  ref.current = value;
};
