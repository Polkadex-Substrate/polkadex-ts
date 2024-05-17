import { PropsWithChildren } from "react";
import { useMeasure } from "react-use";

import { Dropdown, Input, Typography, Token } from "../components";
import { TokenAppearance } from "../helpers";

type Chain = (typeof chains)[0];

const SelectChain = ({
  children,
  chains,
  onChange,
}: PropsWithChildren<{
  chains: Chain[];
  onChange: (v: Chain) => void;
}>) => {
  const [ref, bounds] = useMeasure<HTMLButtonElement>();

  return (
    <Dropdown>
      <Dropdown.Trigger ref={ref} className="w-full">
        {children}
      </Dropdown.Trigger>
      <Dropdown.Content
        className="flex flex-col"
        style={{ minWidth: bounds.width }}
      >
        <div className="p-4 border-b border-primary">
          <Input.Search
            placeholder="Search token or chain..."
            className="max-sm:focus:text-[16px]"
          />
        </div>
        {chains?.map((value) => (
          <Dropdown.Item
            key={value.name}
            onClick={() => onChange(value)}
            disabled={!value.active}
            className="p-0"
          >
            <Card
              title={value.name}
              description={value?.description}
              icon={value.icon}
            />
          </Dropdown.Item>
        ))}
      </Dropdown.Content>
    </Dropdown>
  );
};

export const Card = ({
  title,
  description,
  icon,
}: {
  title: string;
  description?: string;
  icon: string;
}) => {
  return (
    <div className="flex items-center gap-3 p-3 rounded-md w-full">
      <Token
        appearance={icon as TokenAppearance}
        name={icon}
        size="md"
        className="rounded-full"
      />
      <div className="flex flex-col items-start">
        <Typography.Text bold>{title}</Typography.Text>
        <Typography.Text appearance="primary">{description}</Typography.Text>
      </div>
    </div>
  );
};

SelectChain.Card = Card;
export { SelectChain };

export const chains = [
  {
    name: "Native Wallets",
    description: "Polkadot, Kusama & Parachains.",
    icon: "DOT",
    active: true,
  },
  {
    name: "Ethereum Wallets",
    description: "Moonbeam, Astar, Ethereum, etc.",
    icon: "ETH",
    active: false,
  },
];
