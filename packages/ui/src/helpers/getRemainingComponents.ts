import { ReactNode } from "react";

export const getRemainingComponents = (
  components: ReactNode | ReactNode[]
): ReactNode | ReactNode[] =>
  Array.isArray(components) && components.length === 0
    ? components[0]
    : components;
