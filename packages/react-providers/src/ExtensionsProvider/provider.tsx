"use client";

import {
  createContext,
  ReactNode,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import { setStateWithRef, AnyJson } from "@polkadex/utils";
import { Extensions, ExtensionsArray } from "@polkadot-cloud/assets/extensions";

import {
  ExtensionFeature,
  ExtensionsContextInterface,
  ExtensionStatus,
} from "./types";
import { defaultExtensionsContext } from "./constants";
import { polkadexSnapAvailable } from "./utils";

export const ExtensionsContext = createContext<ExtensionsContextInterface>(
  defaultExtensionsContext
);
export const ExtensionsProvider = ({ children }: { children: ReactNode }) => {
  // Store whether initial `injectedWeb3` checking is underway.
  //
  // Injecting `injectedWeb3` is an asynchronous process, so we need to check for its existence for
  // a period of time.
  const [checkingInjectedWeb3, setCheckingInjectedWeb3] =
    useState<boolean>(true);
  const checkingInjectedWeb3Ref = useRef(checkingInjectedWeb3);

  // Store whether injected interval has been initialised.
  const intervalInitialisedRef = useRef<boolean>(false);

  // Store each extension's status in state.
  const [extensionsStatus, setExtensionsStatus] = useState<
    Record<string, ExtensionStatus>
  >({});
  const extensionsStatusRef = useRef(extensionsStatus);

  // counter for listening inject with an interval.
  const injectCounter = useRef<number>(0);

  // Setter for an extension status.
  const setExtensionStatus = (id: string, status: ExtensionStatus) => {
    setStateWithRef(
      {
        ...extensionsStatusRef.current,
        [id]: status,
      },
      setExtensionsStatus,
      extensionsStatusRef
    );
  };

  // Removes an extension from the `extensionsStatus` state.
  const removeExtensionStatus = (id: string) => {
    const newExtensionsStatus = { ...extensionsStatusRef.current };
    delete newExtensionsStatus[id];

    setStateWithRef(
      newExtensionsStatus,
      setExtensionsStatus,
      extensionsStatusRef
    );
  };

  // Getter for the currently installed extensions.
  //
  // Loops through the supported extensios and checks if they are present in `injectedWeb3`. Adds
  // `installed` status to the extension if it is present.
  const getExtensionsStatus = useCallback(
    (snapAvailable: boolean) => {
      const { injectedWeb3 }: AnyJson = window;

      const newExtensionsStatus = { ...extensionsStatus };
      if (snapAvailable)
        newExtensionsStatus["metamask-polkadex-snap"] = "installed";

      ExtensionsArray.forEach((e) => {
        if (injectedWeb3[e.id] !== undefined) {
          newExtensionsStatus[e.id] = "installed";
        }
      });

      return newExtensionsStatus;
    },
    [extensionsStatus]
  );

  // Handle injecting of `metamask-polkadot-snap` into injectedWeb3 if avaialble, and complete
  // `injectedWeb3` syncing process.
  const handleSnapInjection = useCallback(
    async (hasInjectedWeb3: boolean) => {
      const snapAvailable = await polkadexSnapAvailable();

      if (hasInjectedWeb3 || snapAvailable)
        setStateWithRef(
          getExtensionsStatus(snapAvailable),
          setExtensionsStatus,
          extensionsStatusRef
        );

      setStateWithRef(false, setCheckingInjectedWeb3, checkingInjectedWeb3Ref);
    },
    [getExtensionsStatus]
  );

  // Handle completed interval check for `injectedWeb3`.
  //
  // Clear interval and move on to checking for Metamask Polkadot Snap.
  const handleClearInterval = useCallback(
    (interval: ReturnType<typeof setInterval>, hasInjectedWeb3: boolean) => {
      clearInterval(interval);
      // Check if Metamask Polkadot Snap is available.
      handleSnapInjection(hasInjectedWeb3);
    },
    [handleSnapInjection]
  );

  // Checks if an extension has been installed.
  const extensionInstalled = (id: string): boolean =>
    extensionsStatus[id] !== undefined;

  // Checks whether an extension can be connected to.
  const extensionCanConnect = (id: string): boolean =>
    extensionInstalled(id) && extensionsStatus[id] !== "connected";

  // Checks whether an extension supports a feature.
  const extensionHasFeature = (
    id: string,
    feature: ExtensionFeature
  ): boolean => {
    const features = Extensions[id].features;
    if (features === "*" || features.includes(feature)) return true;
    else return false;
  };

  // Check for `injectedWeb3` and Metamask Snap on mount. To trigger interval on soft page
  // refreshes, no empty dependency array is provided to this `useEffect`.
  //
  // Interval duration.
  const checkEveryMs = 500;
  // Total interval iterations.
  const totalChecks = 10;
  useEffect(() => {
    let injectedWeb3Interval: ReturnType<typeof setInterval>;
    if (!intervalInitialisedRef.current) {
      intervalInitialisedRef.current = true;

      injectedWeb3Interval = setInterval(() => {
        injectCounter.current++;
        if (injectCounter.current === totalChecks)
          handleClearInterval(injectedWeb3Interval, false);
        else {
          // if injected is present
          const injectedWeb3 = (window as AnyJson)?.injectedWeb3 || null;
          if (injectedWeb3 !== null)
            handleClearInterval(injectedWeb3Interval, true);
        }
      }, checkEveryMs);
    }

    return () => {
      clearInterval(injectedWeb3Interval);
    };
  }, [handleClearInterval]);

  return (
    <ExtensionsContext.Provider
      value={{
        extensionsStatus: extensionsStatusRef.current,
        checkingInjectedWeb3: checkingInjectedWeb3Ref.current,
        setExtensionStatus,
        removeExtensionStatus,
        extensionInstalled,
        extensionCanConnect,
        extensionHasFeature,
      }}
    >
      {children}
    </ExtensionsContext.Provider>
  );
};
