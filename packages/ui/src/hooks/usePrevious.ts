"use client";

import { useRef } from "react";

export function usePrevious<T = string>(value: T, initial?: T) {
  const ref = useRef({ target: value, previous: initial });

  if (ref.current.target !== value) {
    ref.current.previous = ref.current.target;
    ref.current.target = value;
  }

  return { previousPage: ref.current.previous ?? "" };
}
