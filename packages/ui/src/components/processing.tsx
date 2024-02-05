"use client";

import { Transition } from "@headlessui/react";
import { PropsWithChildren, ComponentProps, ReactNode } from "react";
import classNames from "classnames";
import { twMerge } from "tailwind-merge";
import { Slot } from "@radix-ui/react-slot";

import { isValidComponent } from "../helpers";

interface ProcessingProps extends ComponentProps<"div"> {
  active: boolean;
}

const Trigger = ({ children }: { children: ReactNode }) => {
  return <Slot>{children}</Slot>;
};

const Content = ({
  children,
  className,
  ...props
}: PropsWithChildren<ComponentProps<"div">>) => {
  return (
    <div
      className={twMerge(
        classNames(
          "absolute z-10 bg-level-2 rounded-md p-7 h-full w-full bottom-0 left-0 flex flex-col"
        ),
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
};

const Processing = ({
  children,
  active,
  className,
  ...props
}: PropsWithChildren<ProcessingProps>) => {
  const [ContentComponent] = isValidComponent(children, Content);
  const [TriggerComponent] = isValidComponent(children, Trigger);

  return (
    <div className="relative w-full h-full flex-1 flex flex-col">
      <Transition
        show={active}
        enter="ease-out duration-300"
        enterFrom="opacity-0"
        enterTo="opacity-100"
        leave="ease-in duration-200"
        leaveFrom="opacity-100"
        leaveTo="opacity-0"
      >
        <div
          className={twMerge(
            classNames(
              "absolute z-10 bg-level-2 rounded-md p-7 h-full w-full bottom-0 left-0 flex flex-col gap-5 items-center justify-center"
            ),
            className
          )}
          {...props}
        >
          {ContentComponent}
        </div>
      </Transition>

      {TriggerComponent}
    </div>
  );
};

Processing.Trigger = Trigger;
Processing.Content = Content;

export { Processing };
