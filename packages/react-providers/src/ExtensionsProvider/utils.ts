import { SnapRpcMethodRequest } from "@chainsafe/metamask-polkadot-types";
import { AnyJson, withTimeout } from "@polkadex-ts/utils";
import { GetSnapsResponse } from "@chainsafe/metamask-polkadot-adapter/build/utils";

export function hasMetaMask(): boolean {
  if (!window.ethereum) {
    return false;
  }
  return window.ethereum.isMetaMask;
}

declare global {
  interface Window {
    injectedWeb3?: AnyJson;
    ethereum: {
      isMetaMask: boolean;

      send: (
        request: SnapRpcMethodRequest | { method: string; params?: never[] }
      ) => Promise<unknown>;
      on: (eventName: unknown, callback: unknown) => unknown;
      request: <T>(
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        request: SnapRpcMethodRequest | { method: string; params?: any }
      ) => Promise<T>;
    };
  }
}

// Checks if snaps are supported. Note that other extensions may inject `window.ethereum`, which may
// break the request. We wrap the request in a timeout to ensure it doesn't hang the extension
// discovery process.
const getWalletSnaps = async (): Promise<GetSnapsResponse | undefined> => {
  const ethRequest = !!window?.ethereum?.request;
  if (ethRequest) {
    const response = await withTimeout(
      window.ethereum.request,
      [
        {
          method: "wallet_getSnaps",
        },
      ],
      200
    );
    return response as Promise<GetSnapsResponse>;
  }
};

// Determines if Metamask Polkadot Snap is available and supported.
export const polkadotSnapAvailable = async (): Promise<boolean> => {
  if (!hasMetaMask()) return false;

  try {
    await getWalletSnaps();
    return true;
  } catch (e) {
    return false;
  }
};
