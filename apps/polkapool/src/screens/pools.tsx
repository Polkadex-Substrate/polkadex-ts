"use client";

import { Button, Typography } from "@polkadex/ux";
import { RiAddLine } from "@remixicon/react";
import { motion } from "framer-motion";
import { Fragment, useEffect, useState } from "react";

import { EmptyPosition, PositionCard, SkeletonCollection } from "@/components";
import { AddLiquidity } from "@/components/modals";
import { RemoveLiquidity } from "@/components/modals/removeLiquidity";
import { FeaturedPoolsTable } from "@/components/featuredPoolsTable";
import { Position, useCoreProvider } from "@/core";

export function Pools() {
  const [showAddLiquidity, setShowAddLiquidity] = useState(false);
  const [showRemoveLiquidity, setShowRemoveLiquidity] = useState(false);
  const [tempPosition, setTempPosition] = useState<Position | null>(null);

  const { positions, positionsLoading, positionsSuccess, account, connected } =
    useCoreProvider();
  useEffect(() => {
    if (!showRemoveLiquidity && !!tempPosition) setTempPosition(null);
  }, [showRemoveLiquidity, tempPosition]);

  return (
    <Fragment>
      <AddLiquidity
        open={showAddLiquidity}
        onOpenChange={setShowAddLiquidity}
        tempPosition={tempPosition}
      />
      <RemoveLiquidity
        open={showRemoveLiquidity}
        onOpenChange={setShowRemoveLiquidity}
        tempPosition={tempPosition}
      />
      <motion.div className="flex flex-col gap-10 max-w-[550px] w-full">
        <div className="flex flex-col gap-4">
          <div className="flex items-center justify-between">
            <Typography.Heading>Positions</Typography.Heading>
            {account && connected && (
              <Button.Ghost
                className="flex items-center gap-1 w-fit"
                onClick={() => setShowAddLiquidity(true)}
              >
                <RiAddLine className="w-4 h-4" />
                {account && (
                  <Typography.Text appearance="primary-base">
                    Add liquidity
                  </Typography.Text>
                )}
              </Button.Ghost>
            )}
          </div>
          {!account ? (
            <EmptyPosition showButton />
          ) : positionsLoading || !positionsSuccess ? (
            <SkeletonCollection rows={1} />
          ) : positions.length ? (
            <div className="flex flex-col gap-3 max-h-[350px] overflow-hidden hover:overflow-auto">
              {positions.map((position, index) => (
                <PositionCard
                  key={index}
                  baseTicker={position.base.ticker}
                  quoteTicker={position.quote.ticker}
                  baseLiquidity={position.base.amount.toFixed(5)}
                  quoteLiquidity={position.quote.amount.toFixed(5)}
                  LpTokens={position.lpToken.toFixed(5)}
                  onAddLiquidity={() => {
                    setShowAddLiquidity(true);
                    setTempPosition(position);
                  }}
                  onRemoveLiquidity={() => {
                    setShowRemoveLiquidity(true);
                    setTempPosition(position);
                  }}
                />
              ))}
            </div>
          ) : (
            <EmptyPosition />
          )}
        </div>
        <div className="flex flex-col gap-4">
          <Typography.Heading>Featured Pools</Typography.Heading>
          <div className="flex flex-col gap-4 bg-level-0 border border-primary rounded-md p-4">
            <FeaturedPoolsTable />
          </div>
        </div>
      </motion.div>
    </Fragment>
  );
}
