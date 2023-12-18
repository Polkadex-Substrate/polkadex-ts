import { PropsWithChildren } from "react";
import { ExtensionStatus } from "@polkadex/react-providers";
import { ExtensionsArray } from "@polkadot-cloud/assets/extensions";
import { ExtensionDetails } from "@polkadex/types/src/utils";

import { Interaction, Typography } from "../../components";
import { ChainCard, ProviderCard } from "../../readyToUse";
const ExtensionsArrayWhitelist = ExtensionsArray?.filter(
  (item) => item.id !== "metamask-polkadot-snap"
);
export const ConnectWallet = ({
  children,
  onBack,
  installedExtensions,
  onConnectProvider,
  onConnectCallback,
}: PropsWithChildren<{
  onConnectProvider: (value: ExtensionDetails) => void;
  installedExtensions: Record<string, ExtensionStatus>;
  onBack: () => void;
  onConnectCallback: () => void;
}>) => {
  return (
    <Interaction withAnimation={false}>
      <Interaction.Title onBack={onBack}>Connect your wallet</Interaction.Title>
      <Interaction.Content withPadding={false}>
        <div className="flex flex-col gap-6">
          <div className="flex flex-col gap-1">
            <Typography.Text variant="secondary" size="xs" className="px-7">
              Chain
            </Typography.Text>
            <div className="px-3">
              <ChainCard
                title="Native Wallets"
                description="Polkadot, Kusama & Parachains."
                icon="DOT"
              />
            </div>
          </div>
          <div className="flex flex-col gap-1">
            <Typography.Text variant="secondary" size="xs" className="px-7">
              Wallets available on the Polkadot chain
            </Typography.Text>
            <div className="flex flex-col px-3 max-h-[16rem] overflow-auto">
              {ExtensionsArrayWhitelist?.sort(
                (a, b) =>
                  Number(!!installedExtensions[b.id]) -
                  Number(!!installedExtensions[a.id])
              )?.map((value) => (
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
        <Typography.Paragraph size="xs" className="text-center">
          By connecting your wallet, you agree to our
          <a href="/" target="_blank" className="text-primary-base">
            {" "}
            Terms of Service{" "}
          </a>
          and our{" "}
          <a href="/" target="_blank" className="text-primary-base">
            Privacy Policy
          </a>
          .
        </Typography.Paragraph>
      </Interaction.Footer>
    </Interaction>
  );
};
