import {
  Children,
  Fragment,
  Key,
  PropsWithChildren,
  ReactElement,
  ReactNode,
  isValidElement,
  useState,
} from "react";
import { usePrevious } from "react-use";
import classNames from "classnames";

import { isValidComponent } from "../helpers";

export type Actions = {
  onBack: () => void;
  onNext: () => void;
  onPage: (id: string) => void;
  current: number;
};

const Content = ({
  defaultIndex = 0,
  active = true,
  withTrigger = false,
  children,
}: {
  active?: boolean;
  defaultIndex?: number;
  withTrigger?: boolean;
  children: ((value?: Actions) => ReactNode) | ReactNode;
}) => {
  const [current, setCurrent] = useState(defaultIndex);
  const prevCount = usePrevious(current);

  let RenderComponent: ReactNode;

  if (typeof children === "function") {
    const [child] = Children.toArray(
      children({
        onNext: () => {
          const childCount = Children.count(child?.props?.children);
          setCurrent((current) => (current + 1) % childCount);
        },
        onBack: () => setCurrent(prevCount ?? 0),
        onPage: (key: Key) => {
          const childIndex = (
            child?.props?.children as ReactElement[]
          )?.findIndex((e) => e.key === key);
          setCurrent(childIndex >= 0 ? childIndex : 0);
        },
        current,
      })
    ).filter(isValidElement) as ReactElement<PropsWithChildren<Actions>>[];

    const childrenCollection = child?.props?.children as ReactNode[];
    RenderComponent = childrenCollection?.[current] ?? childrenCollection;
  } else {
    const allElements = Children.toArray(children).filter(isValidElement);
    RenderComponent = allElements[current] ?? <div>MultiStep error</div>;
  }
  if (!active) return null;

  return (
    <>
      {withTrigger ? (
        <Fragment>
          <div
            className={classNames(
              "absolute bottom-0 w-full z-10",
              "animate-in slide-in-from-bottom-48 duration-300"
            )}
          >
            {RenderComponent}
          </div>
          <div className="absolute w-full h-full bottom-0 left-0 bg-overlay-1" />
        </Fragment>
      ) : (
        RenderComponent
      )}
    </>
  );
};

export const Trigger = ({ children }: PropsWithChildren) => children;

const Interactive = ({
  children,
}: PropsWithChildren<{
  active?: boolean;
  defaultIndex?: number;
}>) => {
  const [TriggerComponent] = isValidComponent(children, Trigger);
  const [ContentComponent] = isValidComponent(children, Content);

  return (
    <div className="relative">
      {TriggerComponent}
      {ContentComponent}
    </div>
  );
};

export const Multistep = { Trigger, Content, Interactive };
