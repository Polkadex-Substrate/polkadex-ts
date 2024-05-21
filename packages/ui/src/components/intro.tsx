"use client";

import {
  ComponentProps,
  MouseEvent,
  PropsWithChildren,
  ReactNode,
  createContext,
  useContext,
  useMemo,
} from "react";
import {
  PopoverContentProps,
  TourProvider,
  ProviderProps,
  useTour,
  StepType as Step,
} from "@reactour/tour";
import { twMerge } from "tailwind-merge";
import classNames from "classnames";

import { typeofChildren } from "../helpers";

import { Button } from "./button";
import { Typography } from "./typography";

interface IntroProps extends ProviderProps {
  localStorageName: string;
}
const Intro = ({
  localStorageName,
  showNavigation = false,
  showDots = false,
  showBadge = false,
  children,
  ...props
}: PropsWithChildren<IntroProps>) => {
  const defaultOpen = useMemo(() => {
    if (typeof window !== "undefined" && localStorageName)
      return localStorage.getItem(localStorageName) === "true";
    return false;
  }, [localStorageName]);

  return (
    <Context.Provider value={{ localStorageName }}>
      <TourProvider
        defaultOpen={!!defaultOpen}
        ContentComponent={Content}
        showNavigation={showNavigation}
        showDots={showDots}
        showBadge={showBadge}
        styles={styles}
        {...props}
      >
        {children}
      </TourProvider>
    </Context.Provider>
  );
};

const Content = (props: PopoverContentProps) => {
  const ContentComponent = props.steps[props.currentStep].content;
  const isFunc = typeof ContentComponent === "function";
  return isFunc
    ? (ContentComponent({ ...props }) as ReactNode)
    : ContentComponent;
};

interface CardProps extends ComponentProps<"div"> {
  showControls?: boolean;
}

const Card = ({
  children,
  className,
  showControls = true,
  ...props
}: CardProps) => (
  <div
    className={twMerge(
      classNames("bg-backgroundBase border border-primary rounded-md"),
      className
    )}
    {...props}
  >
    <div className="flex flex-col gap-2 p-4">{children}</div>
    {showControls && <Controls />}
  </div>
);
const Steps = () => {
  const { currentStep, steps } = useTour();
  const stepsNum = steps.length;
  const current = currentStep + 1;
  return (
    <Typography.Text appearance="secondary" size="xs">
      {current} of {stepsNum}
    </Typography.Text>
  );
};

const Title = ({
  showPagination = true,
  children,
}: PropsWithChildren<{ showPagination?: boolean }>) => {
  const isString = typeofChildren(children);

  return (
    <div className="flex items-center justify-between">
      {isString ? (
        <Typography.Heading type="h4" size="md" className="font-medium">
          {children}
        </Typography.Heading>
      ) : (
        children
      )}
      {showPagination && <Steps />}
    </div>
  );
};

const Controls = () => {
  const { setIsOpen, currentStep, setCurrentStep, steps } = useTour();
  const { localStorageName } = useIntroProvider();
  const isLastStep = currentStep === steps.length - 1;
  const isFirstStep = !currentStep;

  const onClose = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    localStorage.setItem(localStorageName, "false");
    setIsOpen(false);
  };

  return (
    <div className="px-4 py-2 flex items-center justify-between gap-2 border-t border-primary">
      {!isLastStep ? (
        <Button.Light appearance="secondary" onClick={onClose}>
          Skip
        </Button.Light>
      ) : (
        <div />
      )}
      <div className="flex items-center gap-2">
        {!isFirstStep && (
          <Button.Ghost
            disabled={isFirstStep}
            appearance="tertiary"
            onClick={() => setCurrentStep(currentStep - 1)}
          >
            Prev
          </Button.Ghost>
        )}
        <Button.Light
          onClick={isLastStep ? onClose : () => setCurrentStep(currentStep + 1)}
        >
          {isLastStep ? "Done" : "Next"}
        </Button.Light>
      </div>
    </div>
  );
};

const Context = createContext<{
  localStorageName: string;
}>({
  localStorageName: "",
});

const useIntroProvider = () => {
  const state = useContext(Context);
  if (!Context)
    throw new Error("useIntroProvider must be used within an Intro component");
  return { ...state };
};

Intro.Controls = Controls;
Intro.Steps = Steps;
Intro.Card = Card;
Intro.Title = Title;

export { Intro, useTour };
export type StepType = Step;

const styles: Step["styles"] = {
  popover: (e) => ({
    ...e,
    backgroundColor: "transparent",
    padding: 0,
  }),
};
