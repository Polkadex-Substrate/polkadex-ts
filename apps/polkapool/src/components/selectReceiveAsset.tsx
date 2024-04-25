// TODO: Reemplace GetPools - coreProvider?

"use client";

import { Searchable } from "@polkadex/ux";
import { SetStateAction, Dispatch, useMemo } from "react";
import classNames from "classnames";

import { SelectAsset } from "./modals";

import { TokenCard } from ".";

import { usePoolsReserve } from "@/hooks";
import { Asset, useCoreProvider } from "@/core";

export const SelectReceiveAsset = ({
  open,
  onOpenChange,
  onSelectToken,
  baseId,
  quoteId,
}: {
  open: boolean;
  onOpenChange: Dispatch<SetStateAction<boolean>>;
  onSelectToken: (e: Asset) => void;
  baseId: string;
  quoteId: string;
}) => {
  const { pools, poolsLoading } = useCoreProvider();

  const { poolsReserve, poolsReserveSuccess } = usePoolsReserve({
    baseId,
  });

  const orderedAssets = useMemo(
    () =>
      poolsReserve
        ?.filter((c) => {
          if (c.id === "POLKADEX") return c;
          return pools?.some((d) => c.id === d.quote.id);
        })
        ?.sort(
          (a, b) => (a.id === baseId ? -1 : 0) - (b.id === baseId ? -1 : 0)
        ),
    [poolsReserve, baseId, pools]
  );

  return (
    <SelectAsset
      open={open}
      onOpenChange={onOpenChange}
      loading={!poolsReserveSuccess || poolsLoading}
    >
      {orderedAssets?.map((e, i) => {
        if (e.id === baseId) return null;
        const isDisabled = !e.reserve;
        return (
          <Searchable.Item
            key={i}
            value={e.ticker}
            className={classNames(
              "p-3",
              e.id === quoteId &&
                "bg-level-1 border border-secondary data-[selected]:hover:bg-level-1 my-2",
              isDisabled &&
                "data-[selected]:hover:bg-transparent data-[selected]:cursor-auto"
            )}
            onSelect={isDisabled ? undefined : () => onSelectToken(e)}
          >
            <TokenCard
              key={i}
              icon={e.ticker}
              ticker={e.ticker}
              tokenName={e.name}
              assetId={e.id}
              disabled={isDisabled}
            />
          </Searchable.Item>
        );
      })}
    </SelectAsset>
  );
};
