import {
  ChainCard,
  Interaction,
  Interactable as PolkadeInteractable,
  Typography,
  useInteractableProvider,
} from "@polkadex/ux";
import { Fragment } from "react";

export const Interactable = () => {
  return (
    <PolkadeInteractable defaultPage="cardOne">
      <Content />
    </PolkadeInteractable>
  );
};

const Content = () => {
  const { setPage } = useInteractableProvider();
  return (
    <Fragment>
      <PolkadeInteractable.Card pageName="cardOne">
        <Interaction>
          <Interaction.Title className="px-6">Options</Interaction.Title>
          <Interaction.Content>
            <ChainCard
              title="Polkadot chain"
              description="Small description example"
              icon="DOT"
            />
            <ChainCard
              title="Ethereum chain"
              description="Small description example"
              icon="ETH"
            />
          </Interaction.Content>
          <Interaction.Footer>
            <Interaction.Action onClick={() => setPage("cardTwo")}>
              Go to Interaction 2
            </Interaction.Action>
            <Interaction.Close>Close 2</Interaction.Close>
          </Interaction.Footer>
        </Interaction>
      </PolkadeInteractable.Card>
      <PolkadeInteractable.Card pageName="cardTwo">
        <Interaction>
          <Interaction.Title className="px-6">Remove Wallet</Interaction.Title>
          <Interaction.Content>
            <Typography.Heading>Are you sure</Typography.Heading>
            <Typography.Paragraph>
              I’m Emil, a design engineer working at Vercel, and creator of two
              open source libraries called Sonner and Vaul. I see animations on
              the web as a form of art, and care deeply about how they look,
              feel, and behave. I want people to have a moment of delight when
              they use the things I create.
            </Typography.Paragraph>
          </Interaction.Content>
          <Interaction.Footer>
            <Interaction.Close onClick={() => setPage("cardOne")}>
              Back
            </Interaction.Close>
          </Interaction.Footer>
        </Interaction>
      </PolkadeInteractable.Card>
    </Fragment>
  );
};
