"use client";

import {
  ComponentProps,
  ComponentPropsWithoutRef,
  Fragment,
  PropsWithChildren,
} from "react";
import classNames from "classnames";
import { twMerge } from "tailwind-merge";
import { RiExpandUpDownLine } from "@remixicon/react";

import { isValidComponentWithoutTarget, typeofChildren } from "../helpers";
import { getRemainingComponents } from "../helpers/getRemainingComponents";

import { Typography } from "./typography";

const Caption = ({
  children,
  className,
  ...props
}: ComponentProps<"caption">) => {
  return (
    <caption
      className={twMerge(
        classNames(
          "p-4 text-sm caption-bottom text-primary opacity-50 border-t border-secondary"
        ),
        className
      )}
      {...props}
    >
      {children}
    </caption>
  );
};

type CellProps = ComponentProps<"td"> & AlignProps;

const Cell = ({
  children,
  className,
  align = "left",
  ...props
}: PropsWithChildren<CellProps>) => {
  const isString = typeofChildren(children);
  return (
    <td
      className={twMerge(
        classNames(
          "[&:has([role=checkbox])]:pr-0 p-2",
          `text-${align}`,
          !isString && className
        ),
        className
      )}
      {...props}
    >
      {isString ? (
        <Typography.Text
          size="sm"
          className={twMerge(classNames("font-normal"), className)}
        >
          {children}
        </Typography.Text>
      ) : (
        children
      )}
    </td>
  );
};

type AlignProps = {
  align?: "left" | "center" | "right";
};

const Icon = ({
  className,
  children,
  ...props
}: ComponentPropsWithoutRef<"svg">) => {
  return children ? (
    <Fragment>{children} </Fragment>
  ) : (
    <RiExpandUpDownLine
      className={twMerge(
        classNames("w-3 h-3 text-primary inline-block align-middle ml-1"),
        className
      )}
      {...props}
    />
  );
};

type HeadProps = ComponentProps<"th"> & AlignProps;

const Head = ({
  children,
  className,
  align = "left",

  ...props
}: PropsWithChildren<HeadProps>) => {
  const [IconComponent, RemaininigComponents] = isValidComponentWithoutTarget(
    children,
    Icon
  );
  const isString = typeofChildren(RemaininigComponents);
  const renderComponent = getRemainingComponents(RemaininigComponents);

  return (
    <th
      className={twMerge(
        classNames(
          "[&:has([role=checkbox])]:pr-0 p-2 font-normal",
          `text-${align}`,
          !isString ? className : "group",
          !!IconComponent?.length && "cursor-pointer"
        )
      )}
      {...props}
    >
      {isString ? (
        <Typography.Text
          appearance="primary"
          size="xs"
          className={twMerge(
            classNames(
              !!IconComponent?.length &&
                "group-hover:text-white duration-300 transition-colors"
            ),
            className
          )}
        >
          {renderComponent}
          {IconComponent}
        </Typography.Text>
      ) : (
        <Fragment>
          {renderComponent}
          {IconComponent}
        </Fragment>
      )}
    </th>
  );
};

const Row = ({ children, className, ...props }: ComponentProps<"tr">) => {
  return (
    <tr
      className={twMerge(
        classNames(
          "transition-colors hover:bg-level-0 data-[state=selected]:bg-level-2"
        ),
        className
      )}
      {...props}
    >
      {children}
    </tr>
  );
};

const Body = ({ children, ...props }: ComponentProps<"tbody">) => {
  return <tbody {...props}>{children}</tbody>;
};

const Header = ({ children, ...props }: ComponentProps<"thead">) => {
  return <thead {...props}>{children}</thead>;
};

const Footer = ({ children, ...props }: ComponentProps<"tfoot">) => {
  return <tfoot {...props}>{children}</tfoot>;
};

interface TableProps extends ComponentProps<"table"> {
  variant?: keyof typeof variantsStyles;
  even?: boolean;
}

const variantsStyles = {
  line: "[&_tr:not(:last-child)]:border-b [&_tr]:border-primary [&_th]:border-b [&_th]:border-primary",
  modern:
    "[&_th]:bg-level-0 [&_th:first-child]:rounded-l-lg [&_th:last-child]:rounded-r-lg",
};

const Table = ({
  children,
  className,
  variant,
  even,
  ...props
}: PropsWithChildren<TableProps>) => {
  return (
    <table
      className={twMerge(
        classNames(
          "w-full overflow-auto border-spacing-0 border-collapse",
          variant && variantsStyles[variant],
          even && "even:[&_tr]:bg-level-0"
        ),
        className
      )}
      {...props}
    >
      {children}
    </table>
  );
};

Table.Header = Header;
Table.Footer = Footer;
Table.Body = Body;
Table.Row = Row;
Table.Head = Head;
Table.Cell = Cell;
Table.Caption = Caption;
Table.Icon = Icon;

export { Table };
