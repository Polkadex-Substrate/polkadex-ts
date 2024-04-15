"use client";

import * as Portal from "@radix-ui/react-portal";
import {
  Dispatch,
  PropsWithChildren,
  ReactNode,
  SetStateAction,
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import {
  RiArrowUpSLine,
  RiBox3Fill,
  RiCheckLine,
  RiCloseLine,
  RiErrorWarningLine,
} from "@remixicon/react";
import classNames from "classnames";
import { AnimatePresence, motion } from "framer-motion";
import { ExtStatus } from "@polkadex/react-providers";

import { Spinner } from "./spinner";
import { Separator } from "./separator";
import { Typography } from "./typography";
import { Button } from "./button";
import { Icon } from "./icon";
export type StatusProps = ExtStatus["status"];

const Status = ({ children }: { children: ReactNode }) => {
  return (
    <div className="relative overflow-hidden w-full py-4">
      <div className="flex items-center justify-evenly relative z-[1] w-full">
        {children}
      </div>
      <div className="flex items-center absolute top-0 my-auto w-full h-full bottom-7">
        <div className="relative w-full flex flex-col">
          <Separator.Horizontal className="absolute top-0 left-0" />
        </div>
      </div>
    </div>
  );
};

export type ProgressBarMessage = Record<StatusProps, string>;

const Title = ({
  messages,
  children,
}: PropsWithChildren<{
  messages: ProgressBarMessage;
}>) => {
  const { txStatus, completedStatus, ongoingStatus, error } =
    useProgressBarProvider();

  const description = useMemo(
    () => messages[ongoingStatus],
    [messages, ongoingStatus]
  );

  const completed = useMemo(
    () => !!txStatus?.find((e) => e.status === completedStatus),
    [txStatus, completedStatus]
  );

  const statusIcon = useMemo(
    () =>
      completed ? (
        <RiCheckLine className="w-8 h-8 text-success-base" />
      ) : (
        <Spinner.PulseRing className="w-8 h-8" />
      ),
    [completed]
  );

  return (
    <div className="flex flex-col w-full bg-level-1">
      <div className="flex flex-col gap-3 items-center p-5 border-b border-primary">
        {error ? (
          <RiErrorWarningLine className="text-danger-base h-8 w-8" />
        ) : (
          statusIcon
        )}
        <div className="flex flex-col items-center text-center">
          <Typography.Text size="xl" className="first-letter:uppercase">
            {error ? "Error" : ongoingStatus}
          </Typography.Text>
          <Typography.Text appearance="primary" size="sm">
            {error || description}
          </Typography.Text>
        </div>
      </div>
      {children}
    </div>
  );
};

const Content = ({
  status,
  children,
}: PropsWithChildren<{
  status: StatusProps;
}>) => {
  const { currentTxStatus } = useProgressBarProvider();

  return status !== currentTxStatus?.status ? null : (
    <div className="flex-1 flex items-center gap-6 border-b border-primary px-5 py-4">
      {children}
    </div>
  );
};

const Card = ({
  status,
  vertical,
  children,
}: PropsWithChildren<{
  status: StatusProps;
  vertical?: boolean;
}>) => {
  const { txStatus, currentTxStatus, completedStatus, ongoingStatus, error } =
    useProgressBarProvider();

  const completed = useMemo(
    () => !!txStatus?.find((e) => e.status === status),
    [txStatus, status]
  );
  const ongoing = status === ongoingStatus;
  const finished = currentTxStatus?.status === completedStatus;
  const activeAppearance = completed ? "success" : "primary";
  const hasError = ongoing && error;

  const IconComponent = useMemo(
    () =>
      (completed && !ongoing) || finished ? (
        <RiCheckLine className="w-4 h-4 text-success-base" />
      ) : (
        <RiBox3Fill className="w-4 h-4 text-white" />
      ),

    [completed, ongoing, finished]
  );

  const IconRender = useMemo(
    () =>
      ongoing && !vertical && !finished ? (
        <Spinner.PulseRing className="w-4 h-4 text-primary" />
      ) : (
        IconComponent
      ),
    [ongoing, finished, vertical, IconComponent]
  );
  const apperance = ongoing && !finished ? "base" : activeAppearance;

  return (
    <div
      className={classNames(
        "flex items-center flex-1",
        !completed && "opacity-50",
        vertical
          ? "flex-col px-4 gap-3 py-3"
          : "gap-2 py-1 pl-2 pr-3 rounded-full bg-level-2"
      )}
    >
      <Icon
        size="md"
        className={classNames(
          "flex items-center justify-center",
          vertical
            ? "bg-level-2 rounded-full border border-primary"
            : "w-auto h-auto p-0"
        )}
      >
        {hasError ? (
          <RiErrorWarningLine className="text-danger-base w-4 h-4" />
        ) : (
          IconRender
        )}
      </Icon>
      <Typography.Text
        className="whitespace-nowrap"
        appearance={hasError ? "danger" : apperance}
      >
        {children}
      </Typography.Text>
    </div>
  );
};

const Maximized = ({ children }: { children: ReactNode }) => {
  const { open, setOpen, show } = useProgressBarProvider();
  return (
    <AnimatePresence>
      {open && show && (
        <div className="fixed z-[100] pointer-events-auto bottom-5 left-0 right-0 mx-auto">
          <div className="relative flex flex-col flex-1 justify-end">
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
                y: 40,
                opacity: 0,
              }}
              transition={{ duration: 0.4, ease: [0.76, 0, 0.24, 1] }}
              className="flex items-center relative flex-col bg-level-0 border border-primary rounded-sm max-w-[400px] w-full self-center mb-8 z-[1]"
            >
              {children}
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
                  setOpen(false);
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
                  <RiArrowUpSLine className="w-4 h-4 text-primary group-hover:rotate-180 transition-transform duration-200" />
                </Icon>
              </Button.Solid>
            </motion.div>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="h-screen w-screen bg-overlay-1 absolute l-0 t-0 hover:bg-overlay-2 transition-colors duration-300 cursor-pointer"
              onClick={() => setOpen(false)}
            />
          </div>
        </div>
      )}
    </AnimatePresence>
  );
};

const Minimized = ({ children }: { children: ReactNode }) => {
  const { open, setOpen, currentTxStatus, show, onReset, completedStatus } =
    useProgressBarProvider();

  const completed = useMemo(
    () => currentTxStatus?.status === completedStatus,
    [currentTxStatus?.status, completedStatus]
  );

  return (
    <AnimatePresence>
      {!open && show && (
        <motion.div
          role="button"
          onClick={() => setOpen(true)}
          initial={{ y: 40, opacity: 0 }}
          animate={{
            y: 0,
            opacity: 1,
            transition: {
              delay: 0.4,
            },
          }}
          exit={{
            y: 40,
            opacity: 0,
          }}
          transition={{
            duration: 0.4,
            ease: [0.76, 0, 0.24, 1],
          }}
          className="rounded-full bg-level-0 border border-primary w-fit self-center mb-5 fixed z-[100] pointer-events-auto bottom-5 left-0 right-0 mx-auto"
        >
          <div className="flex items-center gap-2">
            <div className="relative overflow-hidden">
              <div
                className={classNames(
                  "flex-1 flex items-center justify-evenly gap-2 relative z-[1] py-2",
                  completed ? "pl-3" : "px-3"
                )}
              >
                {children}
              </div>
              <div className="flex items-center absolute top-0 my-auto w-full h-full bottom-0 z-[0]">
                <div className="relative w-full flex flex-col">
                  <Separator.Horizontal className="absolute top-0 left-0" />
                </div>
              </div>
            </div>
            {(completed || !!currentTxStatus.error) && (
              <Button.Icon
                rounded
                variant="outline"
                appearance="secondary"
                size="sm"
                className="p-1 mr-3"
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  onReset();
                }}
              >
                <RiCloseLine className="w-3 h-3" />
              </Button.Icon>
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

const ProgressBar = ({
  data,
  initialOpen = false,
  closeDelay = 0,
  completedStatus = "completed",
  statuses,
  children,
}: PropsWithChildren<{
  initialOpen?: boolean;
  data: ExtStatus;
  closeDelay?: number;
  completedStatus?: string;
  statuses: StatusProps[];
}>) => {
  const [visible, setVisible] = useState(true);
  const [txStatus, setTxStatus] = useState<ExtStatus[]>([]);
  const [open, setOpen] = useState(initialOpen);
  const show = useMemo(
    () => !!txStatus?.length && visible,
    [txStatus, visible]
  );
  const currentTxStatus = useMemo(
    () => txStatus[txStatus.length - 1],
    [txStatus]
  );

  const onReset = useCallback(() => setVisible(false), []);

  useEffect(() => {
    if (!data) return;

    setTxStatus((prev) => {
      const existingStatus = new Set(prev?.map(({ status }) => status));
      const uniqueTransactions = !existingStatus.has(data.status);

      if (uniqueTransactions) return [...prev, data];
      return [...prev];
    });
  }, [data]);

  const ongoingStatus = useMemo(() => data.status, [data?.status]);
  const error = useMemo(() => data.error, [data?.error]);

  useEffect(() => {
    if (!!closeDelay && txStatus?.length >= statuses.length)
      setTimeout(onReset, closeDelay);
  }, [txStatus.length, closeDelay, onReset, statuses.length]);

  useEffect(() => {
    if (!txStatus?.length) setOpen(initialOpen);
  }, [initialOpen, txStatus.length]);

  return (
    <Context.Provider
      value={{
        open,
        setOpen,
        txStatus,
        setTxStatus,
        currentTxStatus,
        show,
        onReset,
        completedStatus,
        ongoingStatus,
        error,
      }}
    >
      <Portal.Root asChild>{children}</Portal.Root>
    </Context.Provider>
  );
};

type State = {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  txStatus: ExtStatus[];
  setTxStatus: Dispatch<SetStateAction<ExtStatus[]>>;
  currentTxStatus: ExtStatus;
  show: boolean;
  onReset: () => void;
  completedStatus?: string;
  ongoingStatus: StatusProps;
  error?: string;
};

const Context = createContext<State>({
  open: false,
  setOpen: () => {},
  txStatus: [],
  setTxStatus: () => {},
  onReset: () => {},
  currentTxStatus: {
    hash: "",
    result: [],
    status: "ongoing",
    error: undefined,
  },
  show: false,
  completedStatus: "",
  ongoingStatus: "ongoing",
  error: "",
});

export const useProgressBarProvider = () => {
  const state = useContext(Context);
  if (!Context)
    throw new Error(
      "useProgressBarProvider must be used within an Interactable component"
    );
  return { ...state };
};

ProgressBar.Card = Card;
ProgressBar.Maximized = Maximized;
ProgressBar.Minimized = Minimized;
ProgressBar.Title = Title;
ProgressBar.Content = Content;
ProgressBar.Status = Status;

export { ProgressBar };
