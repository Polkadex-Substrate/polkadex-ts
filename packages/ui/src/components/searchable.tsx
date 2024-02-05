'use client'

import { MagnifyingGlassIcon } from "@heroicons/react/24/solid";
import classNames from "classnames";
import { Command } from "cmdk";
import {
  ComponentPropsWithoutRef,
  ElementRef,
  Fragment,
  forwardRef,
} from "react";
import { twMerge } from "tailwind-merge";

import { Illustrations } from "../../dist";

const Separator = forwardRef<
  ElementRef<typeof Command.Separator>,
  ComponentPropsWithoutRef<typeof Command.Separator>
>(({ className, ...props }, ref) => {
  return (
    <Command.Separator
      ref={ref}
      className={twMerge(classNames("h-px bg-level-3"), className)}
      {...props}
    />
  );
});
Separator.displayName = "Separator";

const Item = forwardRef<
  ElementRef<typeof Command.Item>,
  ComponentPropsWithoutRef<typeof Command.Item>
>(({ className, ...props }, ref) => {
  return (
    <Command.Item
      ref={ref}
      className={twMerge(
        classNames(
          "flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none",
          "data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
          "transition-colors duration-300 hover:bg-level-3 rounded-md cursor-pointer",
          "aria-selected:bg-level-3 data-[selected]:bg-level-3"
        ),
        className
      )}
      {...props}
    />
  );
});
Item.displayName = "Item";

const Input = forwardRef<
  ElementRef<typeof Command.Input>,
  ComponentPropsWithoutRef<typeof Command.Input>
>(({ className, ...props }, ref) => {
  return (
    <div
      ref={ref}
      className="flex flex-1 border-b pb-2 border-primary items-center gap-2"
    >
      <MagnifyingGlassIcon className="w-4 h-4 text-primary" />
      <Command.Input
        className={twMerge(
          classNames(
            "text-sm flex-1 bg-transparent text-current placeholder:text-primary outline-none"
          ),
          className
        )}
        {...props}
      />
    </div>
  );
});
Input.displayName = "Input";

const List = forwardRef<
  ElementRef<typeof Command.List>,
  ComponentPropsWithoutRef<typeof Command.List>
>(({ className, ...props }, ref) => {
  return (
    <Command.List
      ref={ref}
      className={twMerge(
        classNames("max-h-[300px] overflow-y-auto overflow-x-hidden"),
        className
      )}
      {...props}
    />
  );
});
List.displayName = "List";

const Empty = forwardRef<
  ElementRef<typeof Command.Empty>,
  ComponentPropsWithoutRef<typeof Command.Empty>
>(({ className, children, ...props }, ref) => {
  return (
    <Command.Empty
      ref={ref}
      className={twMerge(
        classNames(
          "flex-1 flex flex-col items-center gap-3 py-6 text-center text-sm"
        ),
        className
      )}
      {...props}
    >
      <Fragment>
        <Illustrations.NoResultFound className="w-10 h-10" />
        {children}
      </Fragment>
    </Command.Empty>
  );
});
Empty.displayName = "Empty";

const Group = forwardRef<
  ElementRef<typeof Command.Group>,
  ComponentPropsWithoutRef<typeof Command.Group>
>(({ className, ...props }, ref) => {
  return (
    <Command.Group
      ref={ref}
      className={twMerge(
        classNames(
          "overflow-hidden text-current",
          "[&_[cmdk-group-heading]]:py-2 [&_[cmdk-group-heading]]:text-xs [&_[cmdk-group-heading]]:text-actionInput"
        ),
        className
      )}
      {...props}
    />
  );
});
Group.displayName = "Group";

const Searchable = ({
  className,
  ...props
}: ComponentPropsWithoutRef<typeof Command>) => {
  return (
    <Command
      className={twMerge(
        classNames(
          "flex flex-col h-full w-full overflow-hidden rounded-md p-2",
          "bg-level-1 border border-primary min-w-[8rem] shadow-md"
        ),
        className
      )}
      {...props}
    />
  );
};

Searchable.Group = Group;
Searchable.Item = Item;
Searchable.Input = Input;
Searchable.Separator = Separator;
Searchable.List = List;
Searchable.Empty = Empty;

export { Searchable };
