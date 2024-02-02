import * as HoverCardRadix from "@radix-ui/react-hover-card";
import { Fragment, PropsWithChildren } from "react";
import { twMerge } from "tailwind-merge";
import classNames from "classnames";

import { isValidComponent } from "../helpers";

const Trigger = ({
  children,
  ...props
}: PropsWithChildren<HoverCardRadix.HoverCardTriggerProps>) => {
  return <HoverCardRadix.Trigger {...props}>{children}</HoverCardRadix.Trigger>;
};

interface ContentProps extends HoverCardRadix.HoverCardContentProps {
  withArrow?: boolean;
  arrowProps?: HoverCardRadix.HoverCardArrowProps;
}
const Content = ({
  children,
  className,
  sideOffset = 12,
  withArrow = true,
  arrowProps,
  ...props
}: PropsWithChildren<ContentProps>) => {
  const { className: arrowClassname, ...restProps } = arrowProps || {};

  return (
    <HoverCardRadix.Content
      sideOffset={sideOffset}
      className={twMerge(
        classNames(
          "p-2 bg-level-1 rounded-md border border-primary text-sm",
          "z-50 overflow-hidden shadow-md animate-in fade-in-0 zoom-in-95 ",
          "data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=open]:zoom-in-95",
          "data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95"
        ),
        className
      )}
      {...props}
    >
      <Fragment>
        {children}
        {withArrow && (
          <HoverCardRadix.Arrow
            className={twMerge(classNames("fill-level-1"), arrowClassname)}
            {...restProps}
          />
        )}
      </Fragment>
    </HoverCardRadix.Content>
  );
};

const HoverCard = ({
  children,
  openDelay = 100,
  closeDelay = 150,
  ...props
}: PropsWithChildren<HoverCardRadix.HoverCardProps>) => {
  const [TriggerComponent] = isValidComponent(children, Trigger);
  const [ContentComponent] = isValidComponent(children, Content);

  return (
    <HoverCardRadix.Root
      openDelay={openDelay}
      closeDelay={closeDelay}
      {...props}
    >
      {TriggerComponent}
      <HoverCardRadix.Portal>{ContentComponent}</HoverCardRadix.Portal>
    </HoverCardRadix.Root>
  );
};

HoverCard.Trigger = Trigger;
HoverCard.Content = Content;

export { HoverCard };
