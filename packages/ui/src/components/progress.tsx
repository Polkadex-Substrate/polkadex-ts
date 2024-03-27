"use client";

import { PropsWithChildren, useMemo, useState } from "react";
import {
  RiArrowUpSLine,
  RiBox3Fill,
  RiCheckLine,
  RiTimeLine,
} from "@remixicon/react";
import classNames from "classnames";
import { AnimatePresence, motion } from "framer-motion";

import { Spinner } from "./spinner";
import { Typography } from "./typography";
import { Icon } from "./icon";
import { Separator } from "./separator";
import { Button } from "./button";

const VerticalCard = ({
  status,
  open,
  children,
}: PropsWithChildren<{
  status: "done" | "loading" | "waiting";
  open?: boolean;
}>) => {
  const done = status === "done";
  const waiting = status === "waiting";
  const activeAppearance = open ? "primary" : "base";

  const IconComponent = useMemo(() => {
    switch (status) {
      case "done":
        return <RiCheckLine className="w-4 h-4 text-success-base" />;
      case "waiting":
        return open ? (
          <RiTimeLine className="w-4 h-4 text-primary" />
        ) : (
          <RiBox3Fill className="w-4 h-4 text-white" />
        );
      default:
        return open ? (
          <RiBox3Fill className="w-4 h-4 text-white" />
        ) : (
          <Spinner.PulseRing className="w-4 h-4 text-primary" />
        );
    }
  }, [status, open]);

  return (
    <div
      className={classNames(
        "flex items-center",
        waiting && "opacity-50",
        open
          ? "flex-col px-4 gap-3"
          : "gap-2 py-1 px-2 rounded-full bg-level-2/80"
      )}
    >
      <Icon
        size="md"
        className={classNames(
          "flex items-center justify-center",
          open
            ? " bg-level-2 rounded-full border border-primary"
            : "w-auto h-auto p-0"
        )}
      >
        {IconComponent}
      </Icon>
      <Typography.Text appearance={done ? "success" : activeAppearance}>
        {children}
      </Typography.Text>
    </div>
  );
};

const Maximized = ({ onClose }: { onClose: () => void }) => {
  return (
    <motion.div
      layout="position"
      initial={{
        y: 40,
        opacity: 0,
      }}
      animate={{
        y: 0,
        opacity: 1,
        transition: {
          delay: 0.4,
        },
      }}
      exit={{
        y: -40,
        opacity: 0,
      }}
      transition={{ duration: 0.4, ease: [0.76, 0, 0.24, 1] }}
      className="flex items-center bg-level-0 border border-primary relative rounded-sm flex-col"
    >
      <div className="flex flex-col w-full bg-level-1">
        <div className="flex flex-col gap-3 items-center p-5">
          <Spinner.PulseRing className="w-8 h-8" />
          <div className="flex flex-col items-center">
            <Typography.Text size="xl">InBlock</Typography.Text>
            <Typography.Text appearance="primary" size="sm">
              Transaction have been dispatched. Waiting for confirmation.
            </Typography.Text>
          </div>
        </div>
        <div className="flex-1 flex items-center gap-6 border-y border-primary px-5 py-4">
          <div className="flex flex-col gap-1">
            <Typography.Text>450201</Typography.Text>
            <Typography.Text appearance="primary" size="xs">
              Current block
            </Typography.Text>
          </div>
          <div className="flex flex-col gap-1">
            <Typography.Text>450205</Typography.Text>
            <Typography.Text appearance="primary" size="xs">
              Goal block
            </Typography.Text>
          </div>
        </div>
      </div>
      <div className="relative overflow-hidden w-full py-4">
        <div className="flex-1 flex items-center justify-evenly gap-2 relative z-[2]">
          <VerticalCard open status="done">
            Dispatched
          </VerticalCard>
          <VerticalCard open status="loading">
            InBlock
          </VerticalCard>
          <VerticalCard open status="waiting">
            Finalized
          </VerticalCard>
        </div>
        <div className="flex items-center absolute top-0 my-auto w-full h-full bottom-6">
          <Separator.Horizontal />
        </div>
      </div>
      <div className="flex items-center justify-center gap-2 w-full p-3 border-t border-primary">
        <Typography.Text appearance="primary" size="xs">
          Having Trouble?
        </Typography.Text>
        <Typography.Text appearance="info" size="xs" asChild>
          <a href="/" target="_blank">
            Get in touch
          </a>
        </Typography.Text>
      </div>
      <Button.Solid
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          onClose();
        }}
        size="xs"
        appearance="secondary"
        className="absolute top-3 right-3 flex gap-1 items-center"
        rounded
      >
        <Typography.Text appearance="primary" size="xs">
          Minimize
        </Typography.Text>
        <Icon>
          <RiArrowUpSLine className="w-4 h-4 text-primary" />
        </Icon>
      </Button.Solid>
    </motion.div>
  );
};

const Minimized = ({ onOpen }: { onOpen?: () => void }) => {
  return (
    <motion.div
      layout="preserve-aspect"
      role="button"
      onClick={onOpen}
      initial={{ y: 40, opacity: 0 }}
      animate={{
        y: 0,
        opacity: 1,
        transition: {
          delay: 0.5,
        },
      }}
      exit={{
        y: -40,
        opacity: 0,
      }}
      transition={{
        duration: 0.4,
        ease: [0.76, 0, 0.24, 1],
      }}
      className="relative overflow-hidden rounded-full py-2 px-3 bg-level-0 border border-primary w-fit"
    >
      <div className="flex-1 flex items-center justify-evenly gap-2 relative z-[2]">
        <VerticalCard status="done">Dispatched</VerticalCard>
        <VerticalCard status="loading">InBlock</VerticalCard>
        <VerticalCard status="waiting">Finalized</VerticalCard>
      </div>
      <div className="flex items-center absolute top-0 my-auto w-full h-full  bottom-0">
        <Separator.Horizontal />
      </div>
    </motion.div>
  );
};

const Progress = () => {
  const [open, setOpen] = useState(false);
  return (
    <div>
      <AnimatePresence>
        {open && <Maximized onClose={() => setOpen(false)} />}
      </AnimatePresence>

      <AnimatePresence>
        {!open && <Minimized onOpen={() => setOpen(true)} />}
      </AnimatePresence>
    </div>
  );
};

export { Progress };
