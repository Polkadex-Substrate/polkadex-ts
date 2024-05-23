import { FilterGroup as PolkadeFilterGroup, Typography } from "@polkadex/ux";
import { useState } from "react";

const testFilters = [
  "Polkadex",
  "Orderbook",
  "Thea",
  "Polkapool",
  "Liquidity Mining",
];
export const FilterGroup = () => {
  const [filters, setFilters] = useState<string[]>([]);

  return (
    <PolkadeFilterGroup>
      <PolkadeFilterGroup.Root>
        <PolkadeFilterGroup.Trigger>
          <PolkadeFilterGroup.Title>
            <PolkadeFilterGroup.Icon />
            Products
          </PolkadeFilterGroup.Title>
          <PolkadeFilterGroup.Filters>
            {filters.map((v) => (
              <Typography.Text
                size="xs"
                key={v}
                className="bg-level-1 rounded-md py-1 px-2"
              >
                {v}
              </Typography.Text>
            ))}
          </PolkadeFilterGroup.Filters>
        </PolkadeFilterGroup.Trigger>
      </PolkadeFilterGroup.Root>
      <PolkadeFilterGroup.Content>
        {testFilters.map((v) => {
          return (
            <PolkadeFilterGroup.Item
              checked={filters.includes(v)}
              key={v}
              onClick={() => {
                const data = filters.includes(v)
                  ? [...filters.filter((e) => e !== v)]
                  : [...filters, v];
                setFilters(data);
              }}
            >
              {v}
            </PolkadeFilterGroup.Item>
          );
        })}
        {!!filters.length && (
          <PolkadeFilterGroup.Button
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              setFilters([]);
            }}
          >
            Clear filter
          </PolkadeFilterGroup.Button>
        )}
      </PolkadeFilterGroup.Content>
    </PolkadeFilterGroup>
  );
};
