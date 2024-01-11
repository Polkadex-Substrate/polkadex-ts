"use client";

import * as TabsRadix from "@radix-ui/react-tabs";
import { PropsWithChildren } from "react";
import classNames from "classnames";
import { twMerge } from "tailwind-merge";

const Trigger = ({
  children,
  className,
  ...props
}: PropsWithChildren<TabsRadix.TabsTriggerProps>) => {
  return (
    <TabsRadix.Trigger
      className={twMerge(
        classNames(
          "data-[state=active]:text-primary-base hover:text-secondary text-primary data-[disabled]:text-secondary data-[disabled]:cursor-not-allowed",
          "transition-colors duration-300 text-sm font-medium",
          className
        )
      )}
      {...props}
    >
      {children}
    </TabsRadix.Trigger>
  );
};

const Content = ({
  children,
  className,
  ...props
}: PropsWithChildren<TabsRadix.TabsContentProps>) => {
  return (
    <TabsRadix.Content
      className={twMerge(classNames("flex-1 h-full", className))}
      {...props}
    >
      {children}
    </TabsRadix.Content>
  );
};

const List = ({
  children,
  className,
  ...props
}: PropsWithChildren<TabsRadix.TabsListProps>) => {
  return (
    <TabsRadix.List
      className={twMerge(
        classNames("flex items-center flex-shrink-0 gap-3", className)
      )}
      {...props}
    >
      {children}
    </TabsRadix.List>
  );
};

const Tabs = ({
  children,
  className,
  ...props
}: PropsWithChildren<TabsRadix.TabsProps>) => {
  return (
    <TabsRadix.Root
      className={twMerge(classNames("flex-1 flex flex-col", className))}
      {...props}
    >
      {children}
    </TabsRadix.Root>
  );
};

Tabs.Trigger = Trigger;
Tabs.Content = Content;
Tabs.List = List;

export { Tabs };
