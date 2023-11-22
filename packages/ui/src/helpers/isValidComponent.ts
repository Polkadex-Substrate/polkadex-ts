import { Children, ElementType, ReactNode, isValidElement } from "react";

export const isValidComponent = <T = ReactNode>(
  children: T,
  targetChild: ElementType
) => {
  const target: T[] = [];

  Children.forEach(children, (item) => {
    if (isValidElement(item) && item.type === targetChild) {
      target.push(item as T);
    }
    return null;
  });

  return target ?? undefined;
};
