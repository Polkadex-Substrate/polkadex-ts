"use client";

import { Button, HoverCard, Separator } from "@polkadex/ux";
import Link from "next/link";
import {
  AnimatePresence,
  animate,
  motion,
  useMotionTemplate,
  useMotionValue,
} from "framer-motion";
import { PropsWithChildren, useEffect, useMemo } from "react";
import classNames from "classnames";
import { usePathname } from "next/navigation";

import { commom } from "../../tailwind.config";

import { Github, Twitter } from "./icons";

import { sizeAnimations, variants } from "@/helpers/animations";
import { useCoreProvider } from "@/core";
export const Menu = () => {
  const { connected } = useCoreProvider();
  const turn = useMotionValue(0);

  const backgroundImage = useMotionTemplate`conic-gradient(from ${turn}turn, #a78bfa00 75%, ${commom["attention-base"]} 100%)`;

  useEffect(() => {
    if (connected) {
      turn.stop();
    } else
      animate(turn, 1, {
        ease: "linear",
        duration: 5,
        repeat: Infinity,
      });
  }, [turn, connected]);

  return (
    <motion.div
      onAnimationStart={() => (document.body.style.overflow = "hidden")}
      onAnimationComplete={() =>
        setTimeout(() => (document.body.style.overflow = "auto"), 100)
      }
      variants={variants}
      initial="initial"
      animate="animate"
      exit="exit"
      className={classNames(
        "transition-transform duration-200 ease-in-out sticky mx-auto max-md:bottom-3 md:bottom-8 left-0 right-0 w-fit rounded-full p-0.5 border-2 border-primary",
        connected && "!bg-none"
      )}
      style={{
        backgroundImage,
      }}
    >
      <div className="flex items-center gap-4 pt-2 pl-2 pb-2 pr-4 bg-backgroundBase rounded-full ">
        <div className="flex items-center gap-2 relative">
          <Route href="/swap">Swap</Route>
          <Route href="/pools">Pools</Route>
        </div>
        <Separator.Vertical className="bg-level-1 w-1 h-5" />
        <div className="flex items-center gap-3">
          <Button.Icon variant="ghost" appearance="secondary" rounded>
            <Link href="https://github.com/Polkadex-Substrate" target="_blank">
              <Github className="w-4 h-4" />
            </Link>
          </Button.Icon>
          <Button.Icon variant="ghost" appearance="secondary" rounded asChild>
            <Link href="https://twitter.com/polkadex" target="_blank">
              <Twitter className="w-4 h-4" />
            </Link>
          </Button.Icon>
          <AnimatePresence>
            {connected && (
              <HoverCard>
                <HoverCard.Trigger asChild>
                  <Button.Icon variant="ghost" appearance="secondary" rounded>
                    <div className="relative flex items-center justify-center">
                      <motion.div
                        variants={sizeAnimations}
                        animate="animate"
                        initial="initial"
                        exit="exit"
                        className="bg-success-base rounded-full"
                      />
                      <div className="absolute bg-success-base rounded-full h-full w-full animate-ping" />
                    </div>
                  </Button.Icon>
                </HoverCard.Trigger>
                <HoverCard.Content withArrow side="right">
                  Connected
                </HoverCard.Content>
              </HoverCard>
            )}
          </AnimatePresence>
        </div>
      </div>
    </motion.div>
  );
};

const Route = ({ href, children }: PropsWithChildren<{ href: string }>) => {
  const pathname = usePathname();

  const active = useMemo(() => href.includes(pathname), [href, pathname]);
  return (
    <Button.Solid
      className={classNames(
        !active && "bg-transparent hover:bg-secondary-base"
      )}
      asChild
      rounded
    >
      <Link href={href}>{children}</Link>
    </Button.Solid>
  );
};
