"use client";

import { PropsWithChildren, useState } from "react";
import { ExtensionStatus } from "@polkadex/react-providers";
import { ExtensionsArray } from "@polkadot-cloud/assets/extensions";
import { ExtensionDetails } from "@polkadex/types";
import classNames from "classnames";
import { twMerge } from "tailwind-merge";

import { Interaction, InteractionProps, Typography } from "../../components";
import { ProviderCard, SelectChain, chains } from "../../readyToUse";
const ExtensionsArrayWhitelist = ExtensionsArray?.filter(
  (item) => item.id !== "metamask-polkadot-snap"
);

const EvmWallets = ["talisman"];

interface ConnectWalletProps extends InteractionProps {
  onConnectProvider: (value: ExtensionDetails) => void;
  installedExtensions: Record<string, ExtensionStatus>;
  onBack: () => void;
  onConnectCallback: () => void;
  showChains?: boolean;
  showTerms?: boolean;
  showFooterClose?: boolean;
  showEvmExtensions?: boolean;
}
export const ConnectWallet = ({
  children,
  onBack,
  installedExtensions,
  onConnectProvider,
  onConnectCallback,
  showChains = true,
  showTerms = true,
  showEvmExtensions = false,
  showFooterClose,
  className,
  ...props
}: PropsWithChildren<ConnectWalletProps>) => {
  const [selectedChain, setSelectedChain] = useState<(typeof chains)[0]>(
    showEvmExtensions ? chains[1] : chains[0]
  );
  return (
    <Interaction
      className={twMerge(
        classNames("w-full md:min-w-[24rem] md:max-w-[24rem]"),
        className
      )}
      {...props}
    >
      <Interaction.Title onClose={{ onClick: onBack }}>
        Connect your wallet
      </Interaction.Title>
      <Interaction.Content withPadding={false}>
        <div className="flex flex-col gap-3">
          {showChains && (
            <div className="flex flex-col gap-1">
              <Typography.Text
                appearance="secondary"
                size="xs"
                className="px-7"
              >
                Chain
              </Typography.Text>
              <div className="w-full px-3">
                <SelectChain
                  chains={chains}
                  onChange={(e) => setSelectedChain(e)}
                >
                  <SelectChain.Card
                    title={selectedChain.name}
                    description={selectedChain.description}
                    icon={selectedChain.icon}
                  />
                </SelectChain>
              </div>
            </div>
          )}

          <div className="flex flex-col gap-1">
            {showChains && (
              <Typography.Text
                appearance="secondary"
                size="xs"
                className="px-7"
              >
                Wallets available on the Polkadot chain
              </Typography.Text>
            )}
            <div className="flex flex-col px-3 max-h-[16rem] overflow-auto">
              {ExtensionsArrayWhitelist?.sort(
                (a, b) =>
                  Number(!!installedExtensions[b.id]) -
                  Number(!!installedExtensions[a.id])
              )
                ?.filter((e) =>
                  showEvmExtensions ? EvmWallets.includes(e.id) : true
                )
                ?.map((value) => (
                  <ProviderCard
                    key={value.id}
                    title={value.title}
                    icon={value.id}
                    action={() => {
                      onConnectProvider(value);
                      onConnectCallback();
                    }}
                    href={(value.website as string) ?? value.website[0]}
                    installed={!!installedExtensions?.[value.id]}
                  />
                ))}
            </div>
          </div>
          {children}
        </div>
      </Interaction.Content>
      <Interaction.Footer>
        {showTerms && (
          <Typography.Paragraph size="xs" className="text-center">
            By using the application, you agree to our
            <a
              href="https://github.com/Polkadex-Substrate/Docs/blob/master/Polkadex_Terms_of_Use.pdf"
              target="_blank"
              rel="noreferrer noopener"
              className="text-primary-base align-middle"
            >
              {" "}
              Terms of Service{" "}
            </a>
            and our{" "}
            <a
              href="https://github.com/Polkadex-Substrate/Docs/blob/master/Polkadex_Privacy_Policy.pdf"
              target="_blank"
              rel="noreferrer noopener"
              className="text-primary-base align-middle"
            >
              Privacy Policy
            </a>
            .
          </Typography.Paragraph>
        )}
        {showFooterClose && (
          <Interaction.Close onClick={onBack}>Close</Interaction.Close>
        )}
      </Interaction.Footer>
    </Interaction>
  );
};
