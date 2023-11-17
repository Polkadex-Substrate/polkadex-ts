import {
  Children,
  Key,
  PropsWithChildren,
  ReactElement,
  ReactNode,
  isValidElement,
  useState,
} from "react";
import { usePrevious } from "react-use";

export type Actions = {
  onBack: () => void;
  onNext: () => void;
  onPage: (id: string) => void;
  current: number;
};

export const Multistep = ({
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

    RenderComponent = (child?.props?.children as ReactNode[])?.[current];
  } else {
    const allElements = Children.toArray(children).filter(isValidElement);
    RenderComponent = allElements[current] ?? <div>MultiStep error</div>;
  }

  return <>{RenderComponent}</>;
};
