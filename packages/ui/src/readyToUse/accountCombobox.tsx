"use client";

import {
  ExtensionAccount,
  useExtensionAccounts,
  useExtensions,
} from "@polkadex/react-providers";
import { ExtensionsArray } from "@polkadot-cloud/assets/extensions";
import { useMemo, useRef, useState } from "react";
import { RiCheckLine, RiWalletLine } from "@remixicon/react";
import { useMeasure } from "react-use";
import { isValidAddress, isValidEvmAddress } from "@polkadex/utils";

import {
  Button,
  Popover,
  Searchable,
  Typography,
  ScrollArea,
} from "../components";
import { truncateNames, truncateString } from "../helpers";

import { ProviderCard } from "./providerCard";
import { AccountCard } from "./accountCard";

const ExtensionsArrayWhitelist = ExtensionsArray?.filter(
  ({ id }) => id !== "metamask-polkadot-snap"
);

const EvmWallets = ["talisman"];

const initialValue = ExtensionsArray.find(({ id }) => id === "talisman");
export const AccountCombobox = ({
  account,
  evm = false,
  setAccount,
}: {
  account?: ExtensionAccount | null;
  setAccount: (e?: ExtensionAccount | null) => void;
  evm?: boolean;
}) => {
  const [open, setOpen] = useState(false);
  const [selectedExtension, setSelectedExtension] = useState(initialValue);

  const { extensionsStatus } = useExtensions();
  const { extensionAccounts, connectExtensionAccounts } =
    useExtensionAccounts();
  const [ref, bounds] = useMeasure<HTMLButtonElement>();
  const buttonRef = useRef<HTMLButtonElement>(null);

  const shortAddress = truncateString(account?.address ?? "");
  const shortName = useMemo(
    () => truncateNames(account?.name ?? "", 15),
    [account?.name]
  );

  const walletsFiltered = useMemo(
    () =>
      extensionAccounts?.filter(
        ({ source, address, type }) =>
          source === selectedExtension?.id &&
          address !== account?.address &&
          (evm ? type === "ethereum" : type === "sr25519")
      ),
    [extensionAccounts, selectedExtension?.id, account?.address, evm]
  );

  const onPaste = async () => {
    try {
      const address = await navigator.clipboard.readText();
      const isValid = evm
        ? isValidEvmAddress(address)
        : isValidAddress(address);

      if (isValid)
        setAccount({
          name: "Custom address",
          address,
          type: evm ? "ethereum" : "sr25519",
          source: "custom",
        });
      else {
        if (buttonRef.current) buttonRef.current.innerText = "Invalid address";
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <Popover.Trigger ref={ref} superpositionTrigger className="w-full">
        <div className="flex-1 flex items-center justify-between">
          <div className="flex items-center gap-2 flex-1">
            <RiWalletLine className="w-3.5 h-3.5 text-actionInput" />
            {account ? (
              <div className="flex items-center gap-1">
                <Typography.Text>{shortName}</Typography.Text>
                <Typography.Text
                  appearance={account?.name ? "primary" : "base"}
                >
                  {shortName ? `(${shortAddress})` : shortAddress}
                </Typography.Text>
              </div>
            ) : (
              <Typography.Text>
                Select or enter a Polkadex address
              </Typography.Text>
            )}
          </div>
          {account?.source === "custom" ? (
            <Button.Solid
              appearance="secondary"
              size="xs"
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                setAccount(null);
              }}
            >
              Clear
            </Button.Solid>
          ) : (
            <Button.Solid
              ref={buttonRef}
              appearance="secondary"
              size="xs"
              onMouseOut={() => {
                if (buttonRef.current) buttonRef.current.innerText = "Paste";
              }}
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                onPaste();
              }}
            >
              Paste
            </Button.Solid>
          )}
        </div>

        <Popover.Icon />
      </Popover.Trigger>
      <Popover.Content style={{ minWidth: bounds.width }}>
        <Searchable className="bg-level-0">
          <Searchable.Input placeholder="Search account" />
          <Searchable.List className="overflow-hidden">
            <div className="flex gap-2">
              <div className="flex flex-col gap-2 pr-2 pt-2 pb-2 border-r border-r-primary">
                {ExtensionsArrayWhitelist?.sort(
                  (a, b) =>
                    Number(!!extensionsStatus[b.id]) -
                    Number(!!extensionsStatus[a.id])
                )
                  ?.filter((e) => (evm ? EvmWallets.includes(e.id) : true))
                  ?.map((value) => {
                    return (
                      <ProviderCard
                        key={value.id}
                        title={value.title}
                        icon={value.id}
                        action={async () => {
                          setSelectedExtension(value);
                          await connectExtensionAccounts(value?.id as string);
                        }}
                        installed={!!extensionsStatus?.[value.id]}
                        className="py-2 px-1"
                      />
                    );
                  })}
              </div>
              <div className="flex flex-col flex-1">
                <Searchable.Empty className="flex-1 flex items-center justify-center">
                  No result found
                </Searchable.Empty>
                <ScrollArea className="max-h-[280px]">
                  <Searchable.Group heading="Accounts">
                    {walletsFiltered.map((curr) => {
                      return (
                        <Searchable.Item
                          key={curr.name}
                          value={curr.name}
                          className="mb-1 mr-1"
                          onSelect={() => {
                            setAccount(curr);
                            setOpen(false);
                          }}
                        >
                          <div className="flex items-center justify-between gap-4 w-full flex-1">
                            <AccountCard
                              address={curr.address}
                              name={curr.name}
                              hoverable={false}
                            />
                            <RiCheckLine
                              className={`ml-auto h-4 w-4 ${
                                account?.address !== curr.address && "opacity-0"
                              }`}
                            />
                          </div>
                        </Searchable.Item>
                      );
                    })}
                  </Searchable.Group>
                  <ScrollArea.Bar orientation="vertical" />
                </ScrollArea>
              </div>
            </div>
          </Searchable.List>
        </Searchable>
      </Popover.Content>
      <Popover.Overlay />
    </Popover>
  );
};
