"use client";

import { PropsWithChildren } from "react";
import { useMeasure } from "react-use";

import { Typography, Token, Popover, Searchable } from "../components";
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
    <Popover>
      <Popover.Trigger ref={ref} className="w-full">
        {children}
      </Popover.Trigger>
      <Popover.Content
        className="flex flex-col"
        style={{ minWidth: bounds.width }}
      >
        <Searchable>
          <div className="p-2">
            <Searchable.Input placeholder="Search token or chain.." />
          </div>
          <Searchable.List>
            <Searchable.Empty className="flex-1 flex items-center justify-center">
              No result found
            </Searchable.Empty>
            <Searchable.Group>
              {chains?.map((value, i) => {
                return (
                  <Searchable.Item
                    key={i}
                    value={value.description}
                    className="p-0"
                    disabled={!value.active}
                    onSelect={() => onChange(value)}
                  >
                    <Card
                      title={value.name}
                      description={value?.description}
                      icon={value.icon}
                    />
                  </Searchable.Item>
                );
              })}
            </Searchable.Group>
          </Searchable.List>
        </Searchable>
      </Popover.Content>
    </Popover>
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
