import { Token, TokenAppearance, Typography } from "@polkadex/ux";
import { createColumnHelper } from "@tanstack/react-table";

import { Pool } from "@/core";
// import { parseScientific, trimFloat } from "@polkadex/numericals";

const columnHelper = createColumnHelper<Pool>();

export const featuredPoolsColumn = [
  columnHelper.accessor((row) => row, {
    id: "pool",
    cell: (e) => {
      const baseTicker = e.getValue().base.ticker as TokenAppearance;
      const quoteTicker = e.getValue().quote.ticker as TokenAppearance;

      return (
        <div className="flex max-sm:flex-col sm:items-center gap-2">
          <div className="flex items-end">
            <Token
              name={quoteTicker}
              size="sm"
              className="rounded-full border border-secondary"
              appearance={quoteTicker}
            />
            <Token
              name={baseTicker}
              size="2xs"
              className="rounded-full border bg-level-0 border-secondary bg -ml-2"
            />
          </div>
          <Typography.Text className="font-medium whitespace-nowrap">
            {baseTicker} / {quoteTicker}
          </Typography.Text>
        </div>
      );
    },
    header: () => (
      <Typography.Text size="xs" appearance="primary">
        Pool
      </Typography.Text>
    ),
    footer: (e) => e.column.id,
  }),
  columnHelper.accessor((row) => row.base, {
    id: "lockedBase",
    cell: (e) => {
      const value = e.getValue().reserve;
      // const trimmedBalance = trimFloat({ value: e.getValue().reserve });
      // const amount = parseScientific(trimmedBalance);
      return (
        <div className="flex max-sm:flex-col gap-2 sm:items-center">
          <Typography.Text size="sm">
            {value.toFixed(value ? 4 : 2)}
          </Typography.Text>
          <Typography.Text size="sm" appearance="primary">
            {e.getValue().ticker}
          </Typography.Text>
        </div>
      );
    },
    header: () => (
      <Typography.Text size="xs" appearance="primary">
        Base Locked
      </Typography.Text>
    ),
    footer: (e) => e.column.id,
  }),
  columnHelper.accessor((row) => row.quote, {
    id: "lockedQuote",
    cell: (e) => {
      const value = e.getValue().reserve;
      // const trimmedBalance = trimFloat({ value: e.getValue().reserve });
      // const amount = parseScientific(trimmedBalance);
      return (
        <div className="flex max-sm:flex-col gap-2 sm:items-center">
          <Typography.Text size="sm">
            {value.toFixed(value ? 4 : 2)}
          </Typography.Text>
          <Typography.Text size="sm" appearance="primary">
            {e.getValue().ticker}
          </Typography.Text>
        </div>
      );
    },
    header: () => (
      <Typography.Text size="xs" appearance="primary">
        Quote Locked
      </Typography.Text>
    ),

    footer: (e) => e.column.id,
  }),
];
