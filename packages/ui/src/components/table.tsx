"use client";

import { ComponentProps, PropsWithChildren } from "react";
import classNames from "classnames";
import { twMerge } from "tailwind-merge";

import { Typography } from "./typography";

const Caption = ({
  children,
  className,
  ...props
}: PropsWithChildren<ComponentProps<"caption">>) => {
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
  const isString = typeof children === "string";
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
      {...(!isString && props)}
    >
      {isString ? (
        <Typography.Text
          size="sm"
          className={twMerge(classNames("font-normal"), className)}
          {...props}
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

type HeadProps = ComponentProps<"th"> & AlignProps;
const Head = ({
  children,
  className,
  align = "left",
  ...props
}: PropsWithChildren<HeadProps>) => {
  const isString = typeof children === "string";
  return (
    <th
      className={twMerge(
        classNames(
          "[&:has([role=checkbox])]:pr-0 p-2 ",
          `text-${align}`,
          !isString && className
        )
      )}
      {...(!isString && props)}
    >
      {isString ? (
        <Typography.Text
          appearance="primary"
          size="xs"
          className={twMerge(classNames("font-normal"), className)}
          {...props}
        >
          {children}
        </Typography.Text>
      ) : (
        children
      )}
    </th>
  );
};

const Row = ({
  children,
  className,
  ...props
}: PropsWithChildren<ComponentProps<"tr">>) => {
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

const Body = ({
  children,
  ...props
}: PropsWithChildren<ComponentProps<"tbody">>) => {
  return <tbody {...props}>{children}</tbody>;
};

const Header = ({
  children,
  ...props
}: PropsWithChildren<ComponentProps<"thead">>) => {
  return <thead {...props}>{children}</thead>;
};

const Footer = ({
  children,
  ...props
}: PropsWithChildren<ComponentProps<"tfoot">>) => {
  return <tfoot {...props}>{children}</tfoot>;
};

interface TableProps extends ComponentProps<"table"> {
  variant?: keyof typeof variantsStyles;
  even?: boolean;
}

const variantsStyles = {
  line: "[&_tr:not(:last-child)]:border-b [&_tr]:border-primary [&_th]:border-b [&_th]:border-secondary",
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

export { Table };
