import { ReactElement, ReactNode, isValidElement } from "react";

export const componentIsTypeof = (
  child: ReactNode,
  type: keyof JSX.IntrinsicElements
) => {
  if (!isValidElement(child)) return false;
  const dynamicType =
    typeof child.type === "function" && (child.type as () => ReactElement)();
  const isDynamicType =
    isValidElement(dynamicType) && dynamicType.type === type;
  const isStringType = typeof child.type === "string" && child.type === type;
  return isDynamicType || isStringType;
};
