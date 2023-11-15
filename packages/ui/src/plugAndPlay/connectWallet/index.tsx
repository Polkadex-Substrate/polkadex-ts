import { PropsWithChildren } from "react";

import { Interaction, Typography } from "../../components";
import { ChainCard, ProviderCard } from "../../readyToUse";

import { Authorization } from "./authorization";
import { Wallets } from "./wallets";

const ConnectWallet = ({ children }: PropsWithChildren) => {
  return (
    <Interaction>
      <Interaction.Title onBack={() => window.alert("back")}>
        Connect your wallet
      </Interaction.Title>
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
            <div className="flex flex-col px-3">
              <ProviderCard
                title="Polkadot{.js}"
                icon="POLKADOTJS"
                action={() => window.alert("Clicked")}
                href="https://polkadot.js.org/extension/"
              />
              <ProviderCard
                title="Talisman"
                icon="TALISMAN"
                action={() => window.alert("Clicked")}
                installed={false}
                href="https://www.talisman.xyz/download"
              />
              <ProviderCard
                title="SubWallet"
                icon="SUBWALLET"
                action={() => window.alert("Clicked")}
                href="https://www.subwallet.app"
              />
              <ProviderCard
                title="Enkrypt"
                icon="ENKRYPT"
                action={() => window.alert("Clicked")}
                href="https://www.enkrypt.com"
              />
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

ConnectWallet.Authorization = Authorization;
ConnectWallet.Wallets = Wallets;

export { ConnectWallet };
