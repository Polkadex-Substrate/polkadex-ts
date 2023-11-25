import { PropsWithChildren } from "react";
import { ExtensionStatus } from "@polkadex/react-providers";
import { ExtensionsArray } from "@polkadot-cloud/assets/extensions";

import { Interaction, Typography } from "../../components";
import { ChainCard, ProviderCard } from "../../readyToUse";
export const ConnectWallet = ({
  children,
  onBack,
  installedExtensions,
  onConnectProvider,
}: PropsWithChildren<{
  onBack: () => void;
  onConnectProvider: (id: string) => void;
  installedExtensions: Record<string, ExtensionStatus>;
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
            <div className="flex flex-col px-3 max-h-[15rem] overflow-auto">
              {ExtensionsArray?.sort(
                (a, b) =>
                  Number(!!installedExtensions[b.id]) -
                  Number(!!installedExtensions[a.id])
              ).map(({ title, website, id }) => (
                <ProviderCard
                  key={title}
                  title={title}
                  icon={id}
                  action={() => onConnectProvider(title)}
                  href={website[0]}
                  installed={!!installedExtensions?.[id]}
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
