"use client";

import { Button } from "@polkadex/ux";
import { RiShutDownLine } from "@remixicon/react";
import Link from "next/link";

import { Logo } from "./logo";
import { AccountCard } from "./accountCard";

import { useCoreProvider } from "@/core";

export const Header = () => {
  const { setShowConnectAccount, account, onLogout } = useCoreProvider();
  return (
    <div className="max-sm:p-2 sm:py-2 flex items-center justify-between gap-2 sticky mx-auto bg-backgroundBase w-full max-sm:top-0 sm:top-8 left-0 right-0 max-w-[550px] z-10">
      <Link href="/" className="h-full max-md:w-8 md:w-full">
        <Logo className="max-h-8 max-md:pointer-events-none max-md:h-8 max-md:[&_g]:hidden" />
      </Link>
      {account ? (
        <AccountCard
          name={account.name}
          address={account.address}
          addressLength={6}
        >
          <Button.Icon
            appearance="danger"
            variant="ghost"
            rounded
            onClick={onLogout}
          >
            <RiShutDownLine className="w-full h-full" />
          </Button.Icon>
        </AccountCard>
      ) : (
        <Button.Solid
          appearance="secondary"
          onClick={() => setShowConnectAccount(true)}
        >
          Connect wallet
        </Button.Solid>
      )}
    </div>
  );
};
