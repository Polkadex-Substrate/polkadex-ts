import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import { Children, PropsWithChildren } from "react";
import { CheckIcon } from "@heroicons/react/24/solid";
import { twMerge } from "tailwind-merge";
import classNames from "classnames";

import { isValidComponent } from "../helpers";

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
      {children}
    </DropdownMenu.RadioItem>
  );
};

const ItemCheckbox = ({
  children,
  className,
  ...props
}: PropsWithChildren<DropdownMenu.MenuCheckboxItemProps>) => {
  return (
    <DropdownMenu.CheckboxItem
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
      <DropdownMenu.ItemIndicator>
        <CheckIcon className="w-3 h-3 text-primary-base" />
      </DropdownMenu.ItemIndicator>
      {children}
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
  return (
    <DropdownMenu.Item
      className={twMerge(
        classNames(
          "p-2 m-1 flex justify-between gap-4 outline-none cursor-default",
          "transition-colors duration-300 focus:bg-level-3 rounded-md",
          "data-[disabled]:cursor-not-allowed data-[disabled]:opacity-50",
          className
        )
      )}
      {...props}
    >
      {children}
      {shortcut && <span className="opacity-50">{shortcut}</span>}
    </DropdownMenu.Item>
  );
};

const Trigger = ({
  children,
  asChild,
  ...props
}: PropsWithChildren<DropdownMenu.DropdownMenuTriggerProps>) => {
  return (
    <DropdownMenu.Trigger asChild={asChild} {...props}>
      {asChild ? <div>{children}</div> : children}
    </DropdownMenu.Trigger>
  );
};

const Content = ({
  children,
  className,
  ...props
}: PropsWithChildren<DropdownMenu.MenuContentProps>) => {
  return (
    <DropdownMenu.Content
      className={twMerge(
        classNames(
          "bg-level-1 rounded-md border border-primary min-w-[8rem]",
          "z-50 overflow-hidden shadow-md",
          "data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=open]:zoom-in-95",
          "data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95",
          className
        )
      )}
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
  return (
    <DropdownMenu.Label
      className={twMerge(
        classNames(
          " text-actionInput text-sm font-semibold",
          "p-2 border-b border-primary",
          className
        )
      )}
      {...props}
    >
      {children}
    </DropdownMenu.Label>
  );
};

const Dropdown = ({
  children,
  ...props
}: PropsWithChildren<DropdownMenu.DropdownMenuProps>) => {
  const [TriggerComponent] = isValidComponent(children, Trigger);
  const [ContentComponent] = isValidComponent(children, Content);

  return (
    <DropdownMenu.Root {...props}>
      {TriggerComponent}
      <DropdownMenu.Portal>{ContentComponent}</DropdownMenu.Portal>
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
