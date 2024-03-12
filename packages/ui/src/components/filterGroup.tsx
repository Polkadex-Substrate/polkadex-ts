"use client";

import {
  ComponentProps,
  ComponentPropsWithoutRef,
  ElementRef,
  forwardRef,
  Fragment,
  PropsWithChildren,
} from "react";
import classNames from "classnames";
import { twMerge } from "tailwind-merge";
import { RiAddLine } from "@remixicon/react";

import {
  getChildren,
  isValidComponent,
  isValidComponentWithoutTarget,
  typeofChildren,
} from "../helpers";
import { getRemainingComponents } from "../helpers/getRemainingComponents";

import { Popover, PopoverProps } from "./popover";
import { Typography } from "./typography";
import { Checkbox } from "./checkbox";
import { Button as PolkadexButton } from "./button";
import { Separator } from "./separator";

const Icon = forwardRef<SVGSVGElement, ComponentPropsWithoutRef<"svg">>(
  ({ className, children, ...props }, ref) => {
    return children ? (
      <Fragment>{children} </Fragment>
    ) : (
      <RiAddLine
        ref={ref}
        className={twMerge(
          classNames("h-5 w-5 transition-transform duration-300 text-white"),
          className
        )}
        {...props}
      />
    );
  }
);
Icon.displayName = "Icon";

interface FiltersProps extends ComponentProps<"div"> {
  maxItems?: number;
}
const Filters = ({
  children,
  className,
  maxItems = 2,
  ...props
}: FiltersProps) => {
  const items = getChildren(children);
  if (!items.length) return null;

  return (
    <div
      className={twMerge(classNames("flex flex-items gap-2"), className)}
      {...props}
    >
      <Separator.Vertical className="h-4 align-middle" />
      {items.length > maxItems ? (
        <Typography.Text size="xs" className="bg-level-1 rounded-md py-1 px-2">
          {items.length} selected
        </Typography.Text>
      ) : (
        <div className="flex items-center gap-1">{children}</div>
      )}
    </div>
  );
};

const Title = ({ children, className, ...props }: ComponentProps<"div">) => {
  const [IconComponent, RemaininigComponents] = isValidComponentWithoutTarget(
    children,
    Icon
  );

  const isString = typeofChildren(RemaininigComponents);
  return (
    <div
      className={twMerge(classNames("flex items-center gap-1"), className)}
      {...props}
    >
      {IconComponent}
      {isString ? (
        <Typography.Text> {RemaininigComponents}</Typography.Text>
      ) : (
        RemaininigComponents
      )}
    </div>
  );
};

const Trigger = ({ children, className, ...props }: ComponentProps<"div">) => {
  const [TitleComponent] = isValidComponent(children, Title);
  const [FiltersComponent] = isValidComponent(children, Filters);

  return (
    <div
      className={twMerge(
        classNames(
          "py-1.5 px-2 flex items-center justify-center gap-3 hover:bg-level-1 rounded-md border border-primary duration-300 transition-colors"
        ),
        className
      )}
      {...props}
    >
      {TitleComponent}
      {FiltersComponent}
    </div>
  );
};

const Item = ({
  children,
  ...props
}: ComponentPropsWithoutRef<typeof Checkbox.Solid>) => {
  return (
    <div className="px-2 hover:bg-level-2 rounded-md transition-colors duration-300">
      <Checkbox.Solid
        id={children as string}
        className="data-[state=unchecked]:group-hover:bg-level-5"
        {...props}
      >
        <Checkbox.Label
          className="flex-1 px-1 py-2"
          htmlFor={children as string}
        >
          {children}
        </Checkbox.Label>
      </Checkbox.Solid>
    </div>
  );
};

const Button = ({
  children,
  appearance = "secondary",
  ...props
}: ComponentPropsWithoutRef<typeof PolkadexButton.Solid>) => {
  return (
    <PolkadexButton.Ghost appearance={appearance} {...props}>
      {children}
    </PolkadexButton.Ghost>
  );
};

const Content = forwardRef<
  ElementRef<typeof Popover.Content>,
  ComponentPropsWithoutRef<typeof Popover.Content>
>(({ children, className, withArrow, ...props }, ref) => {
  const ItemsComponent = isValidComponent(children, Item);
  const [ButtonComponent] = isValidComponent(children, Button);

  return (
    <Popover.Content
      ref={ref}
      withArrow={withArrow}
      className={twMerge(
        classNames("flex flex-col p-0 min-w-[180px]"),
        className
      )}
      {...props}
    >
      <div className="flex flex-col p-2 border-b border-primary">
        {ItemsComponent && ItemsComponent.map((v) => v)}
      </div>
      {ButtonComponent}
    </Popover.Content>
  );
});
Content.displayName = "Content";

const FilterGroup = ({
  children,
  ...props
}: PropsWithChildren<PopoverProps>) => {
  const [TriggerComponent, RemaininigComponents] =
    isValidComponentWithoutTarget(children, Popover.Trigger);
  const renderComponent = getRemainingComponents(RemaininigComponents);

  return (
    <Popover {...props}>
      {TriggerComponent}
      {renderComponent}
    </Popover>
  );
};

FilterGroup.Root = Popover.Trigger;
FilterGroup.Trigger = Trigger;
FilterGroup.Title = Title;
FilterGroup.Filters = Filters;

FilterGroup.Overlay = Popover.Overlay;
FilterGroup.Content = Content;
FilterGroup.Item = Item;
FilterGroup.Trigger = Trigger;
FilterGroup.Button = Button;
FilterGroup.Icon = Icon;

export { FilterGroup };
