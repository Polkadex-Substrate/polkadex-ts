"use client";

import {
  createContext,
  ComponentProps,
  forwardRef,
  useCallback,
  useContext,
  useEffect,
  useState,
  KeyboardEvent,
  PropsWithoutRef,
} from "react";
import useEmblaCarousel, {
  type UseEmblaCarouselType,
} from "embla-carousel-react";
import { twMerge } from "tailwind-merge";
import classNames from "classnames";
import { RiArrowLeftLine, RiArrowRightLine } from "@remixicon/react";

import { Button, ButtonProps } from "./button";

type ApiProps = UseEmblaCarouselType[1];
type CarouseParametersProps = Parameters<typeof useEmblaCarousel>;

const Next = forwardRef<HTMLButtonElement, PropsWithoutRef<ButtonProps>>(
  (
    {
      className,
      children,
      size = "sm",
      appearance = "secondary",
      variant = "outline",
      ...props
    },
    ref
  ) => {
    const { orientation, canScrollNext, onScrollNext } = useCarouselProvider();
    return (
      <Button.Icon
        ref={ref}
        size={size}
        variant={variant}
        appearance={appearance}
        className={twMerge(
          classNames(
            "absolute flex justify-center items-center",
            orientation === "horizontal"
              ? "-right-12 top-1/2 -translate-y-1/2"
              : "-bottom-12 left-1/2 -translate-x-1/2 rotate-90"
          ),
          className
        )}
        disabled={!canScrollNext}
        onClick={onScrollNext}
        {...props}
      >
        {children ?? <RiArrowRightLine className="h-4 w-4" />}
      </Button.Icon>
    );
  }
);
Next.displayName = "Next";

const Previous = forwardRef<HTMLButtonElement, PropsWithoutRef<ButtonProps>>(
  (
    {
      className,
      children,
      size = "sm",
      appearance = "secondary",
      variant = "outline",
      ...props
    },
    ref
  ) => {
    const { orientation, canScrollPrev, onScrollPrev } = useCarouselProvider();
    return (
      <Button.Icon
        ref={ref}
        size={size}
        variant={variant}
        appearance={appearance}
        className={twMerge(
          classNames(
            "absolute flex justify-center items-center",
            orientation === "horizontal"
              ? "-left-12 top-1/2 -translate-y-1/2"
              : "-top-12 left-1/2 -translate-x-1/2 rotate-90"
          ),
          className
        )}
        disabled={!canScrollPrev}
        onClick={onScrollPrev}
        {...props}
      >
        {children ?? <RiArrowLeftLine className="h-4 w-4" />}
      </Button.Icon>
    );
  }
);
Previous.displayName = "Previous";

const Item = forwardRef<HTMLDivElement, ComponentProps<"div">>(
  ({ className, ...props }, ref) => {
    return (
      <div
        ref={ref}
        role="group"
        aria-roledescription="slide"
        className={twMerge(
          classNames("basis-full grow-0 shrink-0 "),
          className
        )}
        {...props}
      />
    );
  }
);
Item.displayName = "Item";

const Content = forwardRef<HTMLDivElement, ComponentProps<"div">>(
  ({ className, ...props }, ref) => {
    const { carouselRef, orientation } = useCarouselProvider();
    return (
      <div ref={carouselRef} className="overflow-hidden">
        <div
          ref={ref}
          className={twMerge(
            classNames(
              "flex",
              orientation === "vertical" ? "-mt-2 flex-col" : "-ml-2"
            ),
            className
          )}
          {...props}
        />
      </div>
    );
  }
);
Content.displayName = "Content";

type CarouselProps = {
  options?: CarouseParametersProps[0];
  plugins?: CarouseParametersProps[1];
  orientation?: "horizontal" | "vertical";
};

type CarouselComponent = CarouselProps & ComponentProps<"div">;

const Carousel = ({
  orientation = "horizontal",
  options,
  plugins,
  className,
  children,
  ...props
}: CarouselComponent) => {
  const [carouselRef, api] = useEmblaCarousel(
    {
      ...options,
      axis: orientation === "horizontal" ? "x" : "y",
    },
    plugins
  );
  const [canScrollPrev, setCanScrollPrev] = useState(false);
  const [canScrollNext, setCanScrollNext] = useState(false);

  const onSelect = useCallback((api: ApiProps) => {
    if (!api) return;
    setCanScrollPrev(api.canScrollPrev());
    setCanScrollNext(api.canScrollNext());
  }, []);

  const onScrollPrev = useCallback(() => {
    api?.scrollPrev();
  }, [api]);

  const onScrollNext = useCallback(() => {
    api?.scrollNext();
  }, [api]);

  const onKeyDownCapture = useCallback(
    (event: KeyboardEvent<HTMLDivElement>) => {
      if (event.key === "ArrowLeft") {
        event.preventDefault();
        onScrollPrev();
      } else if (event.key === "ArrowRight") {
        event.preventDefault();
        onScrollNext();
      }
    },
    [onScrollPrev, onScrollNext]
  );

  useEffect(() => {
    if (!api) return;
    onSelect(api);
    api.on("reInit", onSelect);
    api.on("select", onSelect);
    return () => {
      api.off("reInit", onSelect);
      api.off("select", onSelect);
    };
  }, [api, onSelect]);

  return (
    <Context.Provider
      value={{
        carouselRef,
        api,
        options,
        onScrollPrev,
        onScrollNext,
        canScrollPrev,
        canScrollNext,
        orientation:
          orientation || (options?.axis === "x" ? "horizontal" : "vertical"),
      }}
    >
      <div
        onKeyDownCapture={onKeyDownCapture}
        className={twMerge(classNames("relative"), className)}
        role="region"
        aria-roledescription="carousel"
        {...props}
      >
        {children}
      </div>
    </Context.Provider>
  );
};

interface State extends Omit<CarouselProps, "plugins"> {
  carouselRef: ReturnType<typeof useEmblaCarousel>[0];
  api: ReturnType<typeof useEmblaCarousel>[1];
  onScrollPrev: () => void;
  onScrollNext: () => void;
  canScrollPrev: boolean;
  canScrollNext: boolean;
}
const Context = createContext<State | null>(null);

export const useCarouselProvider = () => {
  const state = useContext(Context);
  if (!Context) throw new Error("useInteractableProvider context is undefined");
  return { ...state };
};

Carousel.Next = Next;
Carousel.Previous = Previous;
Carousel.Content = Content;
Carousel.Item = Item;

export { Carousel, type ApiProps };
