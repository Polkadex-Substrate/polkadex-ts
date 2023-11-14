import { useEffect, useRef } from "react";
import { AnyFunction, AnyJson } from "@polkadex-ts/utils";

export const useEffectIgnoreInitial = (fn: AnyFunction, deps: AnyJson[]) => {
  const isInitial = useRef<boolean>(true);
  useEffect(
    () => {
      if (!isInitial.current) fn();
      isInitial.current = false;
    },
    deps ? [...deps] : undefined
  );
};
