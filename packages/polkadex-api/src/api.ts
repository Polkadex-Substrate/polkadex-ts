import { ApiPromise, WsProvider } from "@polkadot/api";

import { apiTypes } from "./types";

export const createApi = (wsProvider: WsProvider): ApiPromise => {
  return new ApiPromise({ provider: wsProvider, ...apiTypes });
};
