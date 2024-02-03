import {
  ComponentPropsWithoutRef,
  Fragment,
  PropsWithChildren,
  forwardRef,
} from "react";
import * as AccordionRadix from "@radix-ui/react-accordion";
import { ChevronDownIcon } from "@heroicons/react/24/solid";
import { twMerge } from "tailwind-merge";
import classNames from "classnames";

import {
  isValidComponent,
  isValidComponentWithoutTarget,
  typeofChildren,
} from "../helpers";

import { Typography } from "./typography";

const Icon = forwardRef<
  SVGSVGElement,
  PropsWithChildren<ComponentPropsWithoutRef<"svg">>
>(({ className, children, ...props }, ref) => {
  return (
    children ?? (
      <ChevronDownIcon
        ref={ref}
        className={twMerge(
          classNames(
            "h-4 w-4 transition-transform duration-300 text-primary inline-block ml-2 align-middle"
          ),
          className
        )}
        {...props}
      />
    )
  );
});
Icon.displayName = "Icon";

interface TriggerProps
  extends PropsWithChildren<AccordionRadix.AccordionTriggerProps> {
  superpositionTrigger?: boolean;
  iconRotationAnimation?: boolean;
}
const Trigger = forwardRef<HTMLButtonElement, TriggerProps>(
  ({ className, iconRotationAnimation = true, children, ...props }, ref) => {
    const [IconComponent, RemaininigComponents] = isValidComponentWithoutTarget(
      children,
      Icon
    );

    const isString = typeofChildren(RemaininigComponents);

    return (
      <AccordionRadix.Header className="flex">
        <AccordionRadix.Trigger
          className={twMerge(
            classNames(
              "flex-1 flex justify-between align-center cursor-pointer",
              !!IconComponent &&
                iconRotationAnimation &&
                "[&[data-state=open]>svg]:rotate-180"
            ),
            className
          )}
          ref={ref}
          {...props}
        >
          {!IconComponent ? (
            children
          ) : (
            <Fragment>
              {isString ? (
                <Typography.Text>{RemaininigComponents}</Typography.Text>
              ) : (
                RemaininigComponents
              )}
              {IconComponent}
            </Fragment>
          )}
        </AccordionRadix.Trigger>
      </AccordionRadix.Header>
    );
  }
);
Trigger.displayName = "Trigger";

const Content = forwardRef<
  HTMLDivElement,
  PropsWithChildren<AccordionRadix.AccordionContentProps>
>(({ className, children, ...props }, ref) => {
  return (
    <AccordionRadix.Content
      className={twMerge(
        classNames(
          "overflow-hidden transition-all",
          "data-[state=closed]:animate-accordionUp data-[state=open]:animate-accordionDown"
        ),
        className
      )}
      ref={ref}
      {...props}
    >
      {children}
    </AccordionRadix.Content>
  );
});

Content.displayName = "Content";

const Item = forwardRef<
  HTMLDivElement,
  PropsWithChildren<AccordionRadix.AccordionItemProps>
>(({ children, ...props }, ref) => {
  const [TriggerComponent] = isValidComponent(children, Trigger);
  const [ContentComponent] = isValidComponent(children, Content);

  return (
    <AccordionRadix.Item ref={ref} {...props}>
      {TriggerComponent}
      {ContentComponent}
    </AccordionRadix.Item>
  );
});
Item.displayName = "Item";

const Accordion = ({
  children,
  className,
  ...props
}: PropsWithChildren<
  AccordionRadix.AccordionSingleProps | AccordionRadix.AccordionMultipleProps
>) => {
  const items = isValidComponent(children, Item);

  return (
    <AccordionRadix.Root
      className={twMerge(classNames("w-full"), className)}
      {...props}
    >
      {items?.map((renderComponent) => renderComponent)}
    </AccordionRadix.Root>
  );
};

Accordion.Item = Item;
Accordion.Trigger = Trigger;
Accordion.Content = Content;
Accordion.Icon = Icon;

export { Accordion };
