"use client";

import dynamic from "next/dynamic";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Fragment, ReactNode } from "react";

const ConnectAccount = dynamic(
  () => import("@/components/modals").then((mod) => mod.ConnectAccount),
  { ssr: false }
);

const ExtensionsProvider = dynamic(
  () =>
    import("@polkadex/react-providers").then((mod) => mod.ExtensionsProvider),
  { ssr: false }
);
const ExtensionAccountsProvider = dynamic(
  () =>
    import("@polkadex/react-providers").then(
      (mod) => mod.ExtensionAccountsProvider
    ),
  { ssr: false }
);
const Toaster = dynamic(
  () => import("@polkadex/ux").then((mod) => mod.Toaster),
  { ssr: false }
);

const CoreProvider = dynamic(
  () => import("@/core").then((mod) => mod.CoreProvider),
  { ssr: false }
);
const Menu = dynamic(() => import("@/components").then((mod) => mod.Menu), {
  ssr: false,
});

const Header = dynamic(() => import("@/components").then((mod) => mod.Header), {
  ssr: false,
});
const queryClient = new QueryClient();

export function DynamicProvider({ children }: { children: ReactNode }) {
  return (
    <Fragment>
      <Toaster position="top-center" />
      <QueryClientProvider client={queryClient}>
        <ExtensionsProvider>
          <ExtensionAccountsProvider
            network="polkadex"
            ss58={88}
            dappName="polkapool"
          >
            <CoreProvider>
              <ConnectAccount />
              <Header />

              {children}
              <Menu />
            </CoreProvider>
          </ExtensionAccountsProvider>
        </ExtensionsProvider>
      </QueryClientProvider>
    </Fragment>
  );
}
