"use client";

import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import {
  Children,
  ComponentPropsWithoutRef,
  Fragment,
  PropsWithChildren,
  forwardRef,
  ElementRef,
} from "react";
import { twMerge } from "tailwind-merge";
import classNames from "classnames";
import { Transition } from "@headlessui/react";
import { RiArrowDownSLine, RiCheckLine } from "@remixicon/react";

import {
  isValidComponent,
  isValidComponentWithoutTarget,
  typeofChildren,
} from "../helpers";
import { getRemainingComponents } from "../helpers/getRemainingComponents";

import { Typography } from "./typography";

const Overlay = forwardRef<HTMLDivElement, ComponentPropsWithoutRef<"div">>(
  ({ className, ...props }, ref) => {
    return (
      <Transition
        show
        enter="duration-300 ease-out"
        enter-from="opacity-0"
        enter-to="opacity-100"
        leave="duration-200 ease-in"
        leave-from="opacity-100"
        leave-to="opacity-0"
      >
        <div
          ref={ref}
          className={twMerge(
            classNames(
              "w-screen h-screen bg-overlay-3 inset-0 fixed animate-in z-[15]"
            ),
            className
          )}
          {...props}
        />
      </Transition>
    );
  }
);
Overlay.displayName = "Overlay";

const Icon = forwardRef<SVGSVGElement, ComponentPropsWithoutRef<"svg">>(
  ({ className, children, ...props }, ref) => {
    return children ? (
      <Fragment>{children} </Fragment>
    ) : (
      <RiArrowDownSLine
        ref={ref}
        className={twMerge(
          classNames("h-4 w-4 transition-transform duration-300 text-primary"),
          className
        )}
        {...props}
      />
    );
  }
);
Icon.displayName = "Icon";

const Radio = forwardRef<
  ElementRef<typeof DropdownMenu.RadioGroup>,
  ComponentPropsWithoutRef<typeof DropdownMenu.RadioGroup>
>(({ children, ...props }, ref) => {
  const items = Children.toArray(children);

  return (
    <DropdownMenu.RadioGroup ref={ref} {...props}>
      {items}
    </DropdownMenu.RadioGroup>
  );
});
Radio.displayName = "Radio";

const ItemRadio = forwardRef<
  ElementRef<typeof DropdownMenu.RadioItem>,
  ComponentPropsWithoutRef<typeof DropdownMenu.RadioItem> & { active?: boolean }
>(({ children, className, active, ...props }, ref) => {
  const isString = typeofChildren(children);

  return (
    <DropdownMenu.RadioItem
      ref={ref}
      className={twMerge(
        classNames(
          "p-2 m-1 flex items-center gap-2 outline-none cursor-default",
          "transition-colors duration-300 focus:bg-level-3 rounded-md",
          "data-[disabled]:cursor-not-allowed data-[disabled]:opacity-50"
        ),
        className
      )}
      {...props}
    >
      <Fragment>
        <div
          className={classNames(
            active ? "bg-primary-base" : "bg-level-4",
            "w-1.5 h-1.5 rounded-full"
          )}
        />
        {(isString && <Typography.Text>{children}</Typography.Text>) ||
          children}
      </Fragment>
    </DropdownMenu.RadioItem>
  );
});
ItemRadio.displayName = "ItemRadio";

const ItemCheckbox = forwardRef<
  ElementRef<typeof DropdownMenu.CheckboxItem>,
  ComponentPropsWithoutRef<typeof DropdownMenu.CheckboxItem>
>(({ children, className, checked, ...props }, ref) => {
  const isString = typeofChildren(children);

  return (
    <DropdownMenu.CheckboxItem
      ref={ref}
      className={twMerge(
        classNames(
          "p-2 m-1 flex items-center gap-2 outline-none cursor-default",
          "transition-colors duration-300 focus:bg-level-3 rounded-md",
          "data-[disabled]:cursor-not-allowed data-[disabled]:opacity-50",
          checked && "bg-level-3"
        ),
        className
      )}
      checked={checked}
      {...props}
    >
      <DropdownMenu.ItemIndicator>
        <RiCheckLine className="w-3 h-3 text-primary-base [&_path]:stroke-[3px]" />
      </DropdownMenu.ItemIndicator>
      {(isString && <Typography.Text>{children}</Typography.Text>) || children}
    </DropdownMenu.CheckboxItem>
  );
});
ItemCheckbox.displayName = "ItemCheckbox";

const Item = forwardRef<
  ElementRef<typeof DropdownMenu.Item>,
  ComponentPropsWithoutRef<typeof DropdownMenu.Item> & { shortcut?: string }
>(({ children, shortcut, className, ...props }, ref) => {
  const isString = typeofChildren(children);

  return (
    <DropdownMenu.Item
      ref={ref}
      className={twMerge(
        classNames(
          "p-2 m-1 flex justify-between gap-4 outline-none cursor-default",
          "transition-colors duration-300 focus:bg-level-3 rounded-md",
          "data-[disabled]:cursor-not-allowed data-[disabled]:opacity-50"
        ),
        className
      )}
      {...props}
    >
      <Fragment>
        {(isString && <Typography.Text>{children}</Typography.Text>) ||
          children}
        {shortcut && <span className="text-sm opacity-50">{shortcut}</span>}
      </Fragment>
    </DropdownMenu.Item>
  );
});
Item.displayName = "Item";

interface DropdownTriggerProps
  extends ComponentPropsWithoutRef<typeof DropdownMenu.Trigger> {
  superpositionTrigger?: boolean;
  iconRotationAnimation?: boolean;
}

const Trigger = forwardRef<
  ElementRef<typeof DropdownMenu.Trigger>,
  DropdownTriggerProps
>(
  (
    {
      children,
      className,
      superpositionTrigger,
      iconRotationAnimation = true,
      asChild,
      ...props
    },
    ref
  ) => {
    const [IconComponent, RemaininigComponents] = isValidComponentWithoutTarget(
      children,
      Icon
    );
    const isString = typeofChildren(RemaininigComponents);
    const renderComponent = getRemainingComponents(RemaininigComponents);

    return (
      <DropdownMenu.Trigger
        asChild={asChild}
        ref={ref}
        className={twMerge(
          classNames(
            "flex items-center gap-2 focus:outline-none",
            !!IconComponent?.length && "justify-between",
            !!IconComponent?.length &&
              iconRotationAnimation &&
              "[&[data-state=open]>svg]:rotate-180",
            superpositionTrigger &&
              "data-[state=open]:z-20 data-[state=open]:relative",
            className
          )
        )}
        {...props}
      >
        {asChild ? (
          children
        ) : (
          <Fragment>
            {isString ? (
              <Typography.Text>{renderComponent}</Typography.Text>
            ) : (
              renderComponent
            )}
            {IconComponent}
          </Fragment>
        )}
      </DropdownMenu.Trigger>
    );
  }
);
Trigger.displayName = "Trigger";

const Content = forwardRef<
  ElementRef<typeof DropdownMenu.Content>,
  ComponentPropsWithoutRef<typeof DropdownMenu.Content>
>(({ children, className, sideOffset = 10, ...props }, ref) => {
  return (
    <DropdownMenu.Content
      ref={ref}
      className={twMerge(
        classNames(
          "bg-level-1 rounded-md border border-primary min-w-[8rem] z-50 overflow-hidden shadow-md",
          "data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=open]:zoom-in-95",
          "data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95",
          className
        )
      )}
      sideOffset={sideOffset}
      {...props}
    >
      {children}
    </DropdownMenu.Content>
  );
});
Content.displayName = "Content";

const Sub = ({
  children,
  ...props
}: PropsWithChildren<typeof DropdownMenu.Sub>) => {
  const [SubTriggerComponent] = isValidComponent(children, SubTrigger);
  const [SubContentComponent] = isValidComponent(children, SubContent);

  return (
    <DropdownMenu.Sub {...props}>
      {SubTriggerComponent}
      <DropdownMenu.Portal>{SubContentComponent}</DropdownMenu.Portal>
    </DropdownMenu.Sub>
  );
};

const SubTrigger = forwardRef<
  ElementRef<typeof DropdownMenu.SubTrigger>,
  ComponentPropsWithoutRef<typeof DropdownMenu.SubTrigger>
>(({ children, ...props }, ref) => {
  return (
    <DropdownMenu.SubTrigger ref={ref} {...props}>
      {children}
    </DropdownMenu.SubTrigger>
  );
});
SubTrigger.displayName = "SubTrigger";

const SubContent = forwardRef<
  ElementRef<typeof DropdownMenu.SubContent>,
  ComponentPropsWithoutRef<typeof DropdownMenu.SubContent>
>(({ children, ...props }, ref) => {
  return (
    <DropdownMenu.SubContent ref={ref} {...props}>
      {children}
    </DropdownMenu.SubContent>
  );
});
SubContent.displayName = "SubContent";

const Separator = forwardRef<
  ElementRef<typeof DropdownMenu.Separator>,
  ComponentPropsWithoutRef<typeof DropdownMenu.Separator>
>(({ children, className, ...props }, ref) => {
  return (
    <DropdownMenu.Separator
      ref={ref}
      className={twMerge(classNames("border-b border-primary", className))}
      {...props}
    >
      {children}
    </DropdownMenu.Separator>
  );
});
Separator.displayName = "Separator";

const Label = forwardRef<
  ElementRef<typeof DropdownMenu.Label>,
  ComponentPropsWithoutRef<typeof DropdownMenu.Label>
>(({ children, className, ...props }, ref) => {
  const isString = typeofChildren(children);

  return (
    <DropdownMenu.Label
      ref={ref}
      className={twMerge(classNames("p-2 border-b border-primary", className))}
      {...props}
    >
      {(isString && (
        <Typography.Text size="xs" appearance="actionInput">
          {children}
        </Typography.Text>
      )) ||
        children}
    </DropdownMenu.Label>
  );
});
Label.displayName = "Label";

type DropdownProps = DropdownMenu.DropdownMenuProps;
const Dropdown = ({ children, ...props }: PropsWithChildren<DropdownProps>) => {
  const [TriggerComponent] = isValidComponent(children, Trigger);
  const [ContentComponent] = isValidComponent(children, Content);
  const [OverlayComponent] = isValidComponent(children, Overlay);

  return (
    <DropdownMenu.Root {...props}>
      {TriggerComponent}
      <DropdownMenu.Portal>
        <Fragment>
          {OverlayComponent}
          {ContentComponent}
        </Fragment>
      </DropdownMenu.Portal>
    </DropdownMenu.Root>
  );
};

Dropdown.Trigger = Trigger;
Dropdown.Content = Content;
Dropdown.Separator = Separator;
Dropdown.Label = Label;

Dropdown.Sub = Sub;
Dropdown.SubTrigger = SubTrigger;
Dropdown.SubContent = SubContent;

Dropdown.Item = Item;
Dropdown.ItemCheckbox = ItemCheckbox;

Dropdown.Radio = Radio;
Dropdown.ItemRadio = ItemRadio;
Dropdown.Icon = Icon;
Dropdown.Overlay = Overlay;

export { Dropdown };
