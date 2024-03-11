"use client";

import {
  ComponentProps,
  Dispatch,
  MutableRefObject,
  PropsWithChildren,
  SetStateAction,
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { motion, AnimatePresence, Variants } from "framer-motion";
import { twMerge } from "tailwind-merge";
import classNames from "classnames";

import { usePrevious } from "../hooks";

type Size = {
  width: string;
  height: string;
};
type State = {
  page: string;
  setPage: Dispatch<SetStateAction<string>>;
  previousPage: string;
  triggerSize: Size;
  setTriggerSize: Dispatch<SetStateAction<Size>>;
  cardSize: Size;
  setCardSize: Dispatch<SetStateAction<Size>>;
  onBack: () => void;
  onReset: () => void;
  closeOnClickOutside: boolean;
  interactableRef?: MutableRefObject<HTMLDivElement | null>;
  triggerRef: MutableRefObject<HTMLDivElement | null>;
};

const Trigger = ({ children, ...props }: ComponentProps<"div">) => {
  const { setTriggerSize, triggerRef } = useInteractableProvider();

  const setElementDimensions = useCallback(
    (node: HTMLDivElement) => {
      if (node) {
        triggerRef.current = node;
        setTriggerSize({
          width: `${node.offsetHeight}px`,
          height: `${node.offsetWidth}px`,
        });
      }
    },
    [setTriggerSize, triggerRef]
  );

  return (
    <div ref={setElementDimensions} {...props}>
      {children}
    </div>
  );
};

const Content = ({ children, className, ...props }: ComponentProps<"div">) => {
  return (
    <div className={twMerge(classNames("flex"), className)} {...props}>
      {children}
    </div>
  );
};

const initialDimensions = { width: "", height: "" };

type CardProps = {
  show?: boolean;
  pageName: string;
  variants?: Variants;
} & Pick<ComponentProps<"div">, "className">;
const Card = ({
  pageName,
  variants = initialVariants.sliderUp,
  className,
  children,
}: PropsWithChildren<CardProps>) => {
  const elementRef = useRef<HTMLDivElement | null>(null);

  const { page, onReset, interactableRef, setCardSize, triggerRef } =
    useInteractableProvider();
  const setElementDimensions = useCallback(
    (node: HTMLDivElement) => {
      if (node) {
        elementRef.current = node;
        setCardSize({
          width: `${node.offsetWidth}px`,
          height: `${node.offsetHeight}px`,
        });
      }
    },
    [setCardSize]
  );

  const active = page === pageName;
  return (
    <AnimatePresence>
      {active && (
        <div
          className={twMerge(
            classNames(
              "flex justify-end items-end",
              "absolute top-0 left-0",
              triggerRef.current && "w-full h-full "
            )
          )}
        >
          <motion.div
            variants={variants}
            initial="initial"
            animate="animate"
            exit="exit"
            drag="y"
            dragConstraints={{ top: 0, bottom: 0 }}
            dragElastic={0.1}
            transition={{
              type: "spring",
              duration: 0.5,
              bounce: 0.2,
            }}
            onDragEnd={(_, info) => {
              if (info.offset.y > 100) onReset();
            }}
            onAnimationStart={() => {
              if (interactableRef?.current)
                interactableRef.current.style.overflow = "hidden";
            }}
            onAnimationComplete={() => {
              if (interactableRef?.current)
                interactableRef.current.style.overflow = "auto";
            }}
            className={twMerge(classNames("z-[2] w-full"), className)}
            ref={setElementDimensions}
          >
            {children}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

type InteractableProviderProps = {
  closeOnClickOutside?: boolean;
  onClickOutsideCallbackFn?: () => void;
  resetOnUnmount?: boolean;
  defaultPage?: string;
} & Pick<ComponentProps<"div">, "className">;

interface InteractableProps
  extends PropsWithChildren<InteractableProviderProps> {
  overlayProps?: Pick<ComponentProps<"div">, "className">;
}

const Interactable = ({
  children,
  defaultPage = "",
  closeOnClickOutside = true,
  resetOnUnmount,
  overlayProps,
  className,
}: InteractableProps) => {
  const interactableRef = useRef<HTMLDivElement | null>(null);
  const triggerRef = useRef<HTMLDivElement | null>(null);

  const [page, setPage] = useState(defaultPage);
  const [triggerSize, setTriggerSize] = useState(initialDimensions);
  const [cardSize, setCardSize] = useState(initialDimensions);

  const { previousPage } = usePrevious(page);

  const onBack = useCallback(() => setPage(previousPage), [previousPage]);
  const onReset = useCallback(() => setPage(""), []);

  const { className: overlayClassName } = overlayProps ?? {};

  useEffect(() => {
    if (!page) setCardSize(initialDimensions);
  }, [page]);

  useEffect(() => {
    if (resetOnUnmount) return () => onReset();
  }, [resetOnUnmount, onReset]);

  return (
    <Context.Provider
      value={{
        page,
        setPage,
        previousPage,
        onBack,
        onReset,
        triggerSize,
        setTriggerSize,
        cardSize,
        setCardSize,
        closeOnClickOutside,
        interactableRef,
        triggerRef,
      }}
    >
      <div
        ref={interactableRef}
        className={twMerge(
          classNames("relative scrollbar-hide h-auto"),
          triggerRef.current && "h-fit",
          className
        )}
        style={{
          minWidth: triggerRef.current ? "fit-content" : cardSize.width,
          minHeight: triggerRef.current ? "fit-content" : cardSize.height,
        }}
      >
        {children}
        <AnimatePresence>
          {page && triggerRef.current && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className={twMerge(
                classNames(
                  "absolute bottom-0 left-0 h-full w-full bg-overlay-1 backdrop-blur-[2px] cursor-pointer duration-300 transition-colors hover:bg-white/5 hover:backdrop-blur-none"
                ),
                overlayClassName
              )}
              onClick={closeOnClickOutside ? onReset : undefined}
            />
          )}
        </AnimatePresence>
      </div>
    </Context.Provider>
  );
};
const Context = createContext<State>({
  page: "",
  setPage: () => {},
  previousPage: "",
  triggerSize: initialDimensions,
  setTriggerSize: () => {},
  cardSize: initialDimensions,
  setCardSize: () => {},
  onBack: () => {},
  onReset: () => {},
  closeOnClickOutside: true,
  triggerRef: { current: null },
});

export const useInteractableProvider = () => {
  const state = useContext(Context);
  if (!Context) throw new Error("useInteractableProvider context is undefined");
  return { ...state };
};

Interactable.Card = Card;
Interactable.Trigger = Trigger;
Interactable.Content = Content;

export { Interactable };

export const initialVariants: Record<string, Variants> = {
  sliderUp: {
    initial: {
      y: 150,
      opacity: 0.5,
    },
    animate: {
      y: 0,
      opacity: 1,
    },
    exit: {
      opacity: 0.5,
      y: "100%",
    },
  },
  sliderSide: {
    initial: {
      x: -105,
      opacity: 0.5,
      scale: 0.8,
    },
    animate: {
      x: 0,
      opacity: 1,
      scale: 1,
    },
    exit: {
      opacity: 0.5,
      x: "-100%",
      scale: 0.8,
    },
  },
};
