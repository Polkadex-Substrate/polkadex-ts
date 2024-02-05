import { CheckIcon } from "@heroicons/react/24/solid";
import {
  AccountCard,
  Button,
  Searcheable as PolkadexSearcheable,
  Popover,
} from "@polkadex/ux";
import { useMemo, useState } from "react";

const accounts = [
  {
    address: "5HdqyCBVWsCWgffSNDrQ5zuBbwUQwWDLMWZCDGDsHz8vnQNM",
    name: "Polkadex account",
  },
  {
    address: "esNG3pJhD2YHXXQNmtvHEyFVovqjzD3BVuyiFqNqJmzabjo7G",
    name: "Thea account",
  },
  {
    address: "C6vwNE8FdToic5iVf3fG5h6vwNE8FdToic5iVKnqrMbDs1LJC",
    name: "Orderbook account",
  },
];
export const Searcheable = () => {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState("");

  const selectedValue = useMemo(
    () =>
      accounts.find((v) => v.name.toLowerCase().includes(value.toLowerCase())),
    [value]
  );

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <Popover.Trigger asChild={!value}>
        {value ? (
          <div className="text-left">
            <AccountCard
              address={selectedValue?.address ?? ""}
              name={selectedValue?.name}
              hoverable={false}
            />
          </div>
        ) : (
          <Button.Outline appearance="secondary">
            Select an account
          </Button.Outline>
        )}
      </Popover.Trigger>
      <Popover.Content>
        <PolkadexSearcheable>
          <PolkadexSearcheable.Input placeholder="Search item" />
          <PolkadexSearcheable.List>
            <PolkadexSearcheable.Empty>
              No result found
            </PolkadexSearcheable.Empty>
            <PolkadexSearcheable.Group heading="Suggestions">
              {accounts.map((curr) => (
                <PolkadexSearcheable.Item
                  key={curr.name}
                  value={curr.name}
                  onSelect={(currentValue) => {
                    setValue(() => {
                      if (!value) return curr.name;
                      return currentValue
                        .toLowerCase()
                        .includes(curr.name.toLowerCase())
                        ? ""
                        : currentValue;
                    });
                    setOpen(false);
                  }}
                >
                  <div className="flex items-center justify-between gap-4 w-full flex-1">
                    <AccountCard
                      address={curr.address}
                      name={curr.name}
                      hoverable={false}
                    />
                    <CheckIcon
                      className={`ml-auto h-4 w-4 ${
                        value !== curr.name && "opacity-0"
                      }`}
                    />
                  </div>
                </PolkadexSearcheable.Item>
              ))}
            </PolkadexSearcheable.Group>
          </PolkadexSearcheable.List>
        </PolkadexSearcheable>
      </Popover.Content>
    </Popover>
  );
};
