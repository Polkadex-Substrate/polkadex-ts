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

import { getChildren, isValidComponent } from "../helpers";

export type Actions = {
  onBack: () => void;
  onNext: () => void;
  onPage: (id: string) => void;
  current: number;
};

const Switch = ({
  defaultIndex = 0,
  children,
}: {
  defaultIndex?: number;
  children: ((value?: Actions) => ReactNode) | ReactNode;
}) => {
  const [current, setCurrent] = useState(defaultIndex);
  const prevCount = usePrevious(current);

  let RenderComponent: ReactNode;

  if (typeof children === "function") {
    const [child] = Children.toArray(
      children({
        onNext: () => {
          const childCollection = getChildren(child);
          const childCount = Children.count(childCollection);

          setCurrent((current) => (current + 1) % childCount);
        },
        onBack: () => setCurrent(prevCount ?? 0),
        onPage: (key: Key) => {
          const childCollection = getChildren(child);
          const childIndex = childCollection?.findIndex(
            (e) => isValidElement(e) && e.key?.includes(key.toString())
          );

          setCurrent(childIndex >= 0 ? childIndex : 0);
        },
        current,
      })
    ).filter(isValidElement) as ReactElement<PropsWithChildren<Actions>>[];

    const childrenCollection = getChildren(child);
    RenderComponent = childrenCollection?.[current] ?? childrenCollection;
  } else {
    const allElements = Children.toArray(children).filter(isValidElement);
    RenderComponent = allElements[current] ?? <div>MultiStep error</div>;
  }

  return <Fragment>{RenderComponent}</Fragment>;
};

export const Trigger = ({ children }: PropsWithChildren) => (
  <Fragment>{children}</Fragment>
);

export const Content = ({ children }: PropsWithChildren) => (
  <Fragment>{children}</Fragment>
);

const Interactive = ({
  children,
  defaultIndex = 0,
  active,
}: {
  active?: boolean;
  defaultIndex?: number;
  children: ((value?: Actions) => ReactNode) | ReactNode;
}) => {
  const [current, setCurrent] = useState(defaultIndex);
  const prevCount = usePrevious(current);

  let RenderComponent: ReactNode;
  let TriggerComponent: ReactNode;

  if (typeof children === "function") {
    const [child] = Children.toArray(
      children({
        onNext: () => {
          const childCollection = getChildren(child);
          const [ContentItems] = isValidComponent(childCollection, Content);

          const contentCollection = getChildren(ContentItems);
          const childCount = Children.count(contentCollection);

          setCurrent((e) => (e + 1) % childCount);
        },
        onBack: () => setCurrent(prevCount ?? 0),
        onPage: (key: Key) => {
          const childCollection = getChildren(child);
          const [ContentItems] = isValidComponent(childCollection, Content);

          const contentCollection = getChildren(ContentItems);
          const childIndex = contentCollection?.findIndex(
            (e) => isValidElement(e) && e.key?.includes(key.toString())
          );

          setCurrent(childIndex >= 0 ? childIndex : 0);
        },
        current,
      })
    ).filter(isValidElement) as ReactElement<PropsWithChildren<Actions>>[];

    const childCollection = getChildren(child);
    const [TriggerComp] = isValidComponent(childCollection, Trigger);
    const [ContentComponent] = isValidComponent(childCollection, Content);

    const childrenCollection = getChildren(ContentComponent);
    RenderComponent = childrenCollection?.[current] ?? childrenCollection;
    TriggerComponent = TriggerComp;
  } else {
    const [ContentComponent] = isValidComponent(children, Content);
    const [TriggerComp] = isValidComponent(children, Trigger);

    const allElements = Children.toArray(ContentComponent);
    RenderComponent = allElements[current] ?? <div>MultiStep error</div>;
    TriggerComponent = TriggerComp;
  }

  return (
    <div className="relative">
      {TriggerComponent}
      {active && (
        <Fragment>
          <div
            className={classNames("absolute bottom-0 w-full z-10 max-h-full")}
          >
            {RenderComponent}
          </div>
          <div className="absolute w-full h-full bottom-0 left-0 bg-overlay-1" />
        </Fragment>
      )}
    </div>
  );
};

export const Multistep = { Trigger, Switch, Content, Interactive };
