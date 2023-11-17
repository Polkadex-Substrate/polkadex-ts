import { MagnifyingGlassIcon } from "@heroicons/react/24/solid";
import { InputHTMLAttributes, PropsWithChildren, useRef } from "react";

import { Button } from "./button";

interface PrimaryInputProps extends InputHTMLAttributes<HTMLInputElement> {
  increase: () => void;
  decrease: () => void;
  ticker: string;
  label: string;
}

const Primary = ({
  label,
  increase,
  decrease,
  ticker,
  ...props
}: PropsWithChildren<PrimaryInputProps>) => {
  const ref = useRef<HTMLInputElement>(null);
  return (
    <div
      className="flex items-center bg-level-3 h-10 rounded"
      onClick={() => ref?.current?.focus()}
    >
      <span className="p-2 text-primary w-16">{label}</span>
      <input
        ref={ref}
        type="text"
        className="flex-1 bg-transparent font-semibold outline-none"
        {...props}
      />
      <div className="flex items-center gap-2">
        <small className="text-primary text-xs">{ticker}</small>
        <div className="flex flex-col gap-0.5">
          <button
            onClick={increase}
            className="rounded-tr px-3 bg-level-4 hover:bg-level-2 duration-300 transition-colors ease-out"
          >
            +
          </button>
          <button
            onClick={decrease}
            className="rounded-br px-3 bg-level-4 hover:bg-level-2 duration-300 transition-colors ease-out"
          >
            -
          </button>
        </div>
      </div>
    </div>
  );
};

const Search = (props: InputHTMLAttributes<HTMLInputElement>) => (
  <div className="flex items-center gap-2 p-2 flex-1">
    <MagnifyingGlassIcon className="w-4 h-4 text-primary" />
    <input
      type="search"
      className="flex-1 bg-transparent text-textBase outline-none"
      {...props}
    />
  </div>
);

interface VerticalProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  optional?: boolean;
  action?: () => void;
}
const Vertical = ({ label, optional, action, ...props }: VerticalProps) => (
  <div className="flex items-end justify-between gap-2 flex-1">
    <div className="flex flex-col gap-2 flex-1">
      <span className="text-primary">
        {label} {optional && <span className="opacity-50">(Optional)</span>}
      </span>
      <input
        type="text"
        className="flex-1 bg-transparent text-md outline-none"
        {...props}
      />
    </div>
    {action && (
      <Button.Primary
        className="text-xs bg-secondary-hover p-1"
        onClick={action}
      >
        Change
      </Button.Primary>
    )}
  </div>
);

export const Input = {
  Primary,
  Search,
  Vertical,
};
