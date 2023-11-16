import { Fragment, PropsWithChildren } from "react";

import { Spinner } from "./spinner";

export const Loading = ({
  children,
  active = true,
}: PropsWithChildren<{ active?: boolean }>) => {
  console.log("active", active);
  if (!active) return <Fragment>{children}</Fragment>;

  return (
    <div className="relative flex-1">
      <div className="flex items-center justify-center absolute w-full h-full bg-overlay-1">
        <Spinner.Keyboard className="w-5 h-5" />
      </div>
      {children}
    </div>
  );
};
