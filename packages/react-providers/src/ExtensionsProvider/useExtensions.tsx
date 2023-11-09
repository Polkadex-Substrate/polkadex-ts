import { useContext } from "react";

import { ExtensionsContext } from "./provider";

export const useExtensions = () => useContext(ExtensionsContext);
