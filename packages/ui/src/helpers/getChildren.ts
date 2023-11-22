import { Children, ReactElement, ReactNode, isValidElement } from "react";

export const getChildren = <T extends ReactElement | ReactNode | ReactNode[]>(
  child: T
): ReactNode[] =>
  Children?.map(
    child,
    (item) => isValidElement(item) && item?.props?.children
  ) || [];
