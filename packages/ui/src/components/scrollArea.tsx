"use client";

import * as ScrollAreaRadix from "@radix-ui/react-scroll-area";
import classNames from "classnames";
import {
  ComponentPropsWithoutRef,
  ElementRef,
  ForwardRefExoticComponent,
  RefAttributes,
  forwardRef,
} from "react";
import { twMerge } from "tailwind-merge";

const orientationProps: Record<"vertical" | "horizontal", string> = {
  vertical: "h-full w-2 p-px",
  horizontal: "h-2 flex-col p-px",
};

const Bar = forwardRef<
  ElementRef<typeof ScrollAreaRadix.ScrollAreaScrollbar>,
  ComponentPropsWithoutRef<typeof ScrollAreaRadix.ScrollAreaScrollbar>
>(({ className, orientation = "vertical", ...props }, ref) => {
  return (
    <ScrollAreaRadix.ScrollAreaScrollbar
      ref={ref}
      orientation={orientation}
      className={twMerge(
        classNames(
          "flex touch-none select-none transition-colors p-1",
          orientationProps[orientation]
        )
      )}
      {...props}
    >
      <ScrollAreaRadix.ScrollAreaThumb
        className={twMerge(
          classNames(
            "relative flex-1 hover:bg-level-5 transition-colors duration-300 bg-level-4 rounded-full"
          ),
          className
        )}
      />
    </ScrollAreaRadix.ScrollAreaScrollbar>
  );
});
Bar.displayName = "Bar";

interface ScrollAreaType
  extends ForwardRefExoticComponent<
    ComponentPropsWithoutRef<typeof ScrollAreaRadix.Root> &
      RefAttributes<HTMLDivElement>
  > {
  Bar: typeof Bar;
}

const ScrollArea = forwardRef<
  ElementRef<typeof ScrollAreaRadix.Root>,
  ComponentPropsWithoutRef<typeof ScrollAreaRadix.Root>
>(({ className, children, ...props }, ref) => {
  return (
    <ScrollAreaRadix.Root
      ref={ref}
      className={twMerge(classNames("relative overflow-hidden"), className)}
      {...props}
    >
      <ScrollAreaRadix.Viewport className="h-full w-full">
        {children}
      </ScrollAreaRadix.Viewport>
      <ScrollAreaRadix.Corner />
    </ScrollAreaRadix.Root>
  );
}) as ScrollAreaType;

ScrollArea.displayName = "ScrollArea";
ScrollArea.Bar = Bar;
export { ScrollArea };
