import { Children, ElementType, ReactNode, isValidElement } from "react";

export const isValidComponentWithoutTarget = <T = ReactNode>(
  children: T,
  targetChild: ElementType
): [T[] | undefined, T | undefined] => {
  const target: T[] = [];

  const withoutTargetChildren = Children.map(children, (item) => {
    if (!isValidElement(item)) return item;
    if (item.type === targetChild) {
      target.push(item as T);
      return null;
    }
    return item;
  })?.filter(Boolean) as T;

  const targetChildren = target.length >= 0 ? target : undefined;

  return [targetChildren, withoutTargetChildren];
};

export const isValidComponent = <T = ReactNode>(
  children: T,
  targetChild: ElementType
) => {
  const target: T[] = [];

  Children.map(children, (item) => {
    if (isValidElement(item) && item.type === targetChild) {
      target.push(item as T);
    }
    return null;
  });

  return target ?? undefined;
};
