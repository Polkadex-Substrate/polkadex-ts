import type { MutableRefObject } from "react";
import { decodeAddress, encodeAddress } from "@polkadot/keyring";
import { hexToU8a, isHex } from "@polkadot/util";

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

/**
 * @name localStorageOrDefault
 * @summary Retrieve the local stroage value with the key, return defult value if it is not
 * found.
 */
export const localStorageOrDefault = <T>(
  key: string,
  _default: T,
  parse = false
): T | string => {
  const val: string | null = localStorage.getItem(key);

  if (val === null) {
    return _default;
  }

  if (parse) {
    return JSON.parse(val) as T;
  }
  return val;
};

export const setLocalStorage = <T>(key: string, value: T, parse = true) => {
  try {
    const parseVal = parse ? JSON.stringify(value) : (value as string);
    localStorage.setItem(key, parseVal);
  } catch (error) {
    console.error(`Error serializing value for key "${key}":`, error);
    throw error;
  }
};

export const removeLocalStorage = (key: string) => localStorage.removeItem(key);

/**
 * @name isValidAddress
 * @summary Return whether an address is valid Substrate address.
 */
export const isValidAddress = (address: string) => {
  try {
    encodeAddress(isHex(address) ? hexToU8a(address) : decodeAddress(address));
    return true;
  } catch (e) {
    return false;
  }
};
