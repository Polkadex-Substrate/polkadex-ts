import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import {
  Children,
  ComponentPropsWithoutRef,
  Fragment,
  PropsWithChildren,
  forwardRef,
} from "react";
import { CheckIcon } from "@heroicons/react/24/outline";
import { twMerge } from "tailwind-merge";
import classNames from "classnames";
import { ChevronDownIcon } from "@heroicons/react/24/solid";

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
          classNames("h-4 w-4 transition-transform duration-300 text-primary"),
          className
        )}
        {...props}
      />
    )
  );
});
Icon.displayName = "Icon";

const Radio = forwardRef<
  HTMLDivElement,
  PropsWithChildren<DropdownMenu.MenuRadioGroupProps>
>(({ children, ...props }, ref) => {
  const items = Children.toArray(children);

  return (
    <DropdownMenu.RadioGroup ref={ref} {...props}>
      {items}
    </DropdownMenu.RadioGroup>
  );
});
Radio.displayName = "Radio";
interface ItemRadioProps extends DropdownMenu.MenuRadioItemProps {
  active?: boolean;
}

const ItemRadio = forwardRef<HTMLDivElement, PropsWithChildren<ItemRadioProps>>(
  ({ children, className, active, ...props }, ref) => {
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
  }
);
ItemRadio.displayName = "ItemRadio";

const ItemCheckbox = forwardRef<
  HTMLDivElement,
  PropsWithChildren<DropdownMenu.MenuCheckboxItemProps>
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
        <CheckIcon className="w-3 h-3 text-primary-base [&_path]:stroke-[3px]" />
      </DropdownMenu.ItemIndicator>
      {(isString && <Typography.Text>{children}</Typography.Text>) || children}
    </DropdownMenu.CheckboxItem>
  );
});
ItemCheckbox.displayName = "ItemCheckbox";

interface ItemProps extends DropdownMenu.MenuItemProps {
  shortcut?: string;
}

const Item = forwardRef<HTMLDivElement, PropsWithChildren<ItemProps>>(
  ({ children, shortcut, className, ...props }, ref) => {
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
  }
);
Item.displayName = "Item";

const Trigger = forwardRef<
  HTMLButtonElement,
  PropsWithChildren<DropdownMenu.DropdownMenuTriggerProps>
>(({ children, className, ...props }, ref) => {
  const [IconComponent, RemaininigComponents] = isValidComponentWithoutTarget(
    children,
    Icon
  );
  const isString = typeofChildren(RemaininigComponents);

  return (
    <DropdownMenu.Trigger
      ref={ref}
      className={twMerge(
        classNames(
          "flex items-center gap-3 focus:outline-none",
          !!IconComponent && "justify-between",
          className
        )
      )}
      {...props}
    >
      <Fragment>
        {isString ? (
          <Typography.Text>{RemaininigComponents}</Typography.Text>
        ) : (
          RemaininigComponents
        )}
        {IconComponent}
      </Fragment>
    </DropdownMenu.Trigger>
  );
});
Trigger.displayName = "Trigger";

const Content = forwardRef<
  HTMLDivElement,
  PropsWithChildren<DropdownMenu.MenuContentProps>
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

const SubTrigger = forwardRef<
  HTMLDivElement,
  PropsWithChildren<DropdownMenu.MenuSubTriggerProps>
>(({ children, ...props }, ref) => {
  return (
    <DropdownMenu.SubTrigger ref={ref} {...props}>
      {children}
    </DropdownMenu.SubTrigger>
  );
});
SubTrigger.displayName = "SubTrigger";

const SubContent = forwardRef<
  HTMLDivElement,
  PropsWithChildren<DropdownMenu.MenuSubContentProps>
>(({ children, ...props }, ref) => {
  return (
    <DropdownMenu.SubContent ref={ref} {...props}>
      {children}
    </DropdownMenu.SubContent>
  );
});
SubContent.displayName = "SubContent";

const Separator = forwardRef<
  HTMLDivElement,
  PropsWithChildren<DropdownMenu.MenuSeparatorProps>
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
  HTMLDivElement,
  PropsWithChildren<DropdownMenu.MenuLabelProps>
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
Dropdown.Icon = Icon;
Dropdown.Overlay = Overlay;

export { Dropdown };
