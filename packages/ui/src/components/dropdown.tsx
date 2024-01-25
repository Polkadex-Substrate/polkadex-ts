import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import {
  Children,
  ComponentPropsWithoutRef,
  Fragment,
  PropsWithChildren,
} from "react";
import { CheckIcon, ChevronUpDownIcon } from "@heroicons/react/24/outline";
import { twMerge } from "tailwind-merge";
import classNames from "classnames";
import { Slot } from "@radix-ui/react-slot";

import { isValidComponent, typeofChildren } from "../helpers";

import { Typography } from "./typography";

const Radio = ({
  children,
  ...props
}: PropsWithChildren<DropdownMenu.MenuRadioGroupProps>) => {
  const items = Children.toArray(children);

  return <DropdownMenu.RadioGroup {...props}>{items}</DropdownMenu.RadioGroup>;
};
interface ItemRadioProps extends DropdownMenu.MenuRadioItemProps {
  active?: boolean;
}

const ItemRadio = ({
  children,
  className,
  active,
  ...props
}: PropsWithChildren<ItemRadioProps>) => {
  const isString = typeofChildren(children);

  return (
    <DropdownMenu.RadioItem
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
      <div
        className={classNames(
          active ? "bg-primary-base" : "bg-level-4",
          "w-1.5 h-1.5 rounded-full"
        )}
      />
      {(isString && <Typography.Text>{children}</Typography.Text>) || children}
    </DropdownMenu.RadioItem>
  );
};

const ItemCheckbox = ({
  children,
  className,
  checked,
  ...props
}: PropsWithChildren<DropdownMenu.MenuCheckboxItemProps>) => {
  const isString = typeofChildren(children);

  return (
    <DropdownMenu.CheckboxItem
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
        <CheckIcon className="w-3 h-3 text-primary-base [&_path]:stroke-[3px]" />
      </DropdownMenu.ItemIndicator>
      {(isString && <Typography.Text>{children}</Typography.Text>) || children}
    </DropdownMenu.CheckboxItem>
  );
};

interface ItemProps extends DropdownMenu.MenuItemProps {
  shortcut?: string;
}

const Item = ({
  children,
  shortcut,
  className,
  ...props
}: PropsWithChildren<ItemProps>) => {
  const isString = typeofChildren(children);

  return (
    <DropdownMenu.Item
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
      {(isString && <Typography.Text>{children}</Typography.Text>) || children}
      {shortcut && <span className="text-sm opacity-50">{shortcut}</span>}
    </DropdownMenu.Item>
  );
};

interface TriggerProps extends DropdownMenu.DropdownMenuTriggerProps {
  withArrow?: boolean;
  arrowProps?: ComponentPropsWithoutRef<"svg">;
}

const Trigger = ({
  children,
  asChild,
  withArrow,
  arrowProps,
  className,
  ...props
}: PropsWithChildren<TriggerProps>) => {
  const isString = typeofChildren(children);
  const { className: arrowClassname, ...restProps } = arrowProps || {};
  return (
    <DropdownMenu.Trigger
      asChild={asChild}
      className={twMerge(
        classNames(
          "flex items-center",
          withArrow && "justify-between",
          className
        )
      )}
      {...props}
    >
      {asChild ? (
        <Slot>{children}</Slot>
      ) : (
        <>
          {(isString && <Typography.Text>{children}</Typography.Text>) ||
            children}
          {withArrow && (
            <ChevronUpDownIcon
              className={twMerge(
                classNames("w-4 h-4 ml-2 text-primary"),
                arrowClassname
              )}
              {...restProps}
            />
          )}
        </>
      )}
    </DropdownMenu.Trigger>
  );
};

const Content = ({
  children,
  className,
  sideOffset = 10,
  ...props
}: PropsWithChildren<DropdownMenu.MenuContentProps>) => {
  return (
    <DropdownMenu.Content
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
};

const Sub = ({
  children,
  ...props
}: PropsWithChildren<DropdownMenu.MenuSubContentProps>) => {
  const [SubTriggerComponent] = isValidComponent(children, SubTrigger);
  const [SubContentComponent] = isValidComponent(children, SubContent);

  return (
    <DropdownMenu.Sub {...props}>
      {SubTriggerComponent}
      <DropdownMenu.Portal>{SubContentComponent}</DropdownMenu.Portal>
    </DropdownMenu.Sub>
  );
};

const SubTrigger = ({
  children,
  ...props
}: PropsWithChildren<DropdownMenu.MenuSubTriggerProps>) => {
  return (
    <DropdownMenu.SubTrigger {...props}>{children}</DropdownMenu.SubTrigger>
  );
};

const SubContent = ({
  children,
  ...props
}: PropsWithChildren<DropdownMenu.MenuSubContentProps>) => {
  return (
    <DropdownMenu.SubContent {...props}>{children}</DropdownMenu.SubContent>
  );
};

const Separator = ({
  children,
  className,
  ...props
}: PropsWithChildren<DropdownMenu.MenuSeparatorProps>) => {
  return (
    <DropdownMenu.Separator
      className={twMerge(classNames("border-b border-primary", className))}
      {...props}
    >
      {children}
    </DropdownMenu.Separator>
  );
};
const Label = ({
  children,
  className,
  ...props
}: PropsWithChildren<DropdownMenu.MenuLabelProps>) => {
  const isString = typeofChildren(children);

  return (
    <DropdownMenu.Label
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
};

interface DropdownProps extends DropdownMenu.DropdownMenuProps {
  withOverlay?: boolean;
}
const Dropdown = ({
  children,
  withOverlay,
  ...props
}: PropsWithChildren<DropdownProps>) => {
  const [TriggerComponent] = isValidComponent(children, Trigger);
  const [ContentComponent] = isValidComponent(children, Content);

  return (
    <DropdownMenu.Root {...props}>
      {TriggerComponent}
      <DropdownMenu.Portal>
        <Fragment>
          {withOverlay && (
            <div className="w-screen h-screen bg-overlay-3 inset-0 fixed animate-in" />
          )}
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

export { Dropdown };
