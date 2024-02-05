"use client";

import * as TabsRadix from "@radix-ui/react-tabs";
import {
  ComponentPropsWithoutRef,
  ElementRef,
  forwardRef,
  PropsWithChildren,
} from "react";
import classNames from "classnames";
import { twMerge } from "tailwind-merge";

const Trigger = forwardRef<
  ElementRef<typeof TabsRadix.Trigger>,
  ComponentPropsWithoutRef<typeof TabsRadix.Trigger>
>(({ children, className, ...props }, ref) => {
  return (
    <TabsRadix.Trigger
      ref={ref}
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
});
Trigger.displayName = "Trigger";

const Content = forwardRef<
  ElementRef<typeof TabsRadix.Content>,
  ComponentPropsWithoutRef<typeof TabsRadix.Content>
>(({ children, className, ...props }, ref) => {
  return (
    <TabsRadix.Content
      ref={ref}
      className={twMerge(
        classNames("flex-1 h-full data-[state=inactive]:hidden", className)
      )}
      {...props}
    >
      {children}
    </TabsRadix.Content>
  );
});
Content.displayName = "Content";

const List = forwardRef<
  ElementRef<typeof TabsRadix.List>,
  ComponentPropsWithoutRef<typeof TabsRadix.List>
>(({ children, className, ...props }, ref) => {
  return (
    <TabsRadix.List
      ref={ref}
      className={twMerge(
        classNames("flex items-center flex-shrink-0 gap-3", className)
      )}
      {...props}
    >
      {children}
    </TabsRadix.List>
  );
});
List.displayName = "List";

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
