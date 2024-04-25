"use client";

import { Icon, Table, Typography } from "@polkadex/ux";
import {
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { RiStackLine } from "@remixicon/react";

import { featuredPoolsColumn } from "./columns";
import { SkeletonCollection } from "./skeletonCollection";

import { useCoreProvider } from "@/core";

export const FeaturedPoolsTable = () => {
  const { pools, poolsLoading, poolsSuccess } = useCoreProvider();

  const table = useReactTable({
    data: pools,
    columns: featuredPoolsColumn,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
  });

  if (!poolsSuccess || poolsLoading) return <SkeletonCollection rows={3} />;

  return !pools && poolsSuccess ? (
    <div className="flex flex-col items-center gap-2 py-6 px-4 bg-level-0 border border-primary rounded-md">
      <Icon size="md">
        <RiStackLine className="w-full h-full text-secondary" />
      </Icon>
      <Typography.Text appearance="primary">No pools</Typography.Text>
    </div>
  ) : (
    <Table>
      <Table.Header>
        {table.getHeaderGroups().map((headerGroup) => (
          <Table.Row key={headerGroup.id}>
            {headerGroup.headers.map((header) => (
              <Table.Head key={header.id}>
                {header.isPlaceholder
                  ? null
                  : flexRender(
                      header.column.columnDef.header,
                      header.getContext()
                    )}
              </Table.Head>
            ))}
          </Table.Row>
        ))}
      </Table.Header>
      <Table.Body>
        {table.getRowModel().rows.map((row) => (
          <Table.Row key={row.id}>
            {row.getVisibleCells().map((cell) => (
              <Table.Cell key={cell.id}>
                {flexRender(cell.column.columnDef.cell, cell.getContext())}
              </Table.Cell>
            ))}
          </Table.Row>
        ))}
      </Table.Body>
    </Table>
  );
};
