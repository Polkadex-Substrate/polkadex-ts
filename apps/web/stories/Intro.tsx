import {
  Typography,
  GenericHorizontalItem,
  Button,
  Intro as IntroPolkadex,
  useTour,
  StepType,
} from "@polkadex/ux";

export const Intro = () => {
  const steps: StepType[] = [
    {
      selector: ".ex1",
      content: (
        <IntroPolkadex.Card>
          <IntroPolkadex.Title>Step 1</IntroPolkadex.Title>
          <Typography.Text appearance="primary">
            In order to use Thea bridge, you&rsquo;ll need to connect a wallet.
            If you don&rsquo;t have one, you can create one using the Movie .
          </Typography.Text>
        </IntroPolkadex.Card>
      ),
    },
    {
      selector: ".ex2",
      content: (
        <IntroPolkadex.Card>
          <IntroPolkadex.Title>Step 2</IntroPolkadex.Title>
          <Typography.Text appearance="primary">
            In order to use Thea bridge, you&rsquo;ll need to connect a wallet.
            If you don&rsquo;t have one, you can create one using the Movie .
          </Typography.Text>
        </IntroPolkadex.Card>
      ),
    },
    {
      selector: ".ex5",
      content: (
        <IntroPolkadex.Card>
          <IntroPolkadex.Title>Step 3</IntroPolkadex.Title>
          <Typography.Text appearance="primary">
            In order to use Thea bridge, you&rsquo;ll need to connect a wallet.
            If you don&rsquo;t have one, you can create one using the Movie .
          </Typography.Text>
        </IntroPolkadex.Card>
      ),
    },
  ];

  return (
    <IntroPolkadex steps={steps} localStorageName="IntroPolkadexing">
      <div className="flex flex-col gap-4">
        <div className="ex1">
          <GenericHorizontalItem label="Example 1">
            Component 1
          </GenericHorizontalItem>
        </div>
        <div className="ex2">
          <GenericHorizontalItem label="Example 2">
            Component 2
          </GenericHorizontalItem>
        </div>
        <div className="ex3">
          <GenericHorizontalItem label="Example 3">
            Component 3
          </GenericHorizontalItem>
        </div>
        <div className="ex4">
          <GenericHorizontalItem label="Example 4">
            Component 4
          </GenericHorizontalItem>
        </div>
        <div className="ex5">
          <GenericHorizontalItem label="Example 5">
            Component 5
          </GenericHorizontalItem>
        </div>
        <div className="ex6">
          <GenericHorizontalItem label="Example 6">
            Component 6
          </GenericHorizontalItem>
        </div>
        <IntroPolkadexing />
        <Button.Outline
          appearance="secondary"
          onClick={() => localStorage.setItem("IntroPolkadexing", "true")}
        >
          Change localstorage
        </Button.Outline>
      </div>
    </IntroPolkadex>
  );
};

const IntroPolkadexing = () => {
  const { setIsOpen } = useTour();
  return (
    <Button.Outline onClick={() => setIsOpen(true)}>Open tour</Button.Outline>
  );
};
