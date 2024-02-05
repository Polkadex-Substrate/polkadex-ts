"use client";

import { Fragment, PropsWithChildren } from "react";

import { Spinner as CustomSpinner } from "./spinner";
const Spinner = ({
  children,
  active = true,
}: PropsWithChildren<{ active?: boolean }>) => {
  if (!active) return <Fragment>{children}</Fragment>;

  return (
    <div className="relative flex-1">
      <div className="z-50 flex items-center justify-center absolute w-full h-full bg-overlay-2">
        <CustomSpinner.Keyboard className="w-5 h-5" />
      </div>
      {children}
    </div>
  );
};

export const Loading = {
  Spinner,
};
