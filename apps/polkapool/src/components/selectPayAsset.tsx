"use client";

import { Searchable } from "@polkadex/ux";
import { SetStateAction, Dispatch, useMemo } from "react";
import classNames from "classnames";

import { SelectAsset } from "./modals";

import { TokenCard } from ".";

import { Asset, useCoreProvider } from "@/core";

export const SelectPayAsset = ({
  open,
  onOpenChange,
  onSelectToken,
  baseId,
}: {
  open: boolean;
  onOpenChange: Dispatch<SetStateAction<boolean>>;
  onSelectToken: (e: Asset) => void;
  baseId?: string;
}) => {
  const { assets, assetsStatus, pools, poolsLoading } = useCoreProvider();

  const orderedAssets = useMemo(
    () =>
      assets
        ?.filter((c) => {
          if (c.id === "POLKADEX") return c;
          return pools?.some((d) => c.id === d.quote.id);
        })
        ?.sort(
          (a, b) => (a.id === baseId ? -1 : 0) - (b.id === baseId ? -1 : 0)
        ),
    [assets, baseId, pools]
  );
  return (
    <SelectAsset
      open={open}
      onOpenChange={onOpenChange}
      loading={assetsStatus === "pending" || poolsLoading}
    >
      {orderedAssets?.map((e, i) => {
        return (
          <Searchable.Item
            key={i}
            value={e.ticker}
            className={classNames(
              "p-3",
              e.id === baseId &&
                "bg-level-1 border border-secondary data-[selected]:hover:bg-level-1 my-2"
            )}
            onSelect={() => onSelectToken(e)}
          >
            <TokenCard
              key={e.id}
              icon={e.ticker}
              ticker={e.ticker}
              tokenName={e.name}
              assetId={e.id}
            />
          </Searchable.Item>
        );
      })}
    </SelectAsset>
  );
};
