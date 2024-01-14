"use client";

import { ComponentProps, PropsWithChildren } from "react";
import classNames from "classnames";
import { twMerge } from "tailwind-merge";

const Caption = ({
  children,
  className,
  ...props
}: PropsWithChildren<ComponentProps<"caption">>) => {
  return (
    <caption
      className={twMerge(
        classNames("mt-4 text-sm caption-bottom text-primary", className)
      )}
      {...props}
    >
      {children}
    </caption>
  );
};

const Cell = ({
  children,
  className,
  ...props
}: PropsWithChildren<ComponentProps<"td">>) => {
  return (
    <td
      className={twMerge(
        classNames(
          "text-sm font-normal align-middle [&:has([role=checkbox])]:pr-0 px-2 py-3",
          className
        )
      )}
      {...props}
    >
      {children}
    </td>
  );
};

const Head = ({
  children,
  className,
  ...props
}: PropsWithChildren<ComponentProps<"th">>) => {
  return (
    <th
      className={twMerge(
        classNames(
          "text-sm font-normal text-left align-middle text-primary [&:has([role=checkbox])]:pr-0 p-2 border-b border-secondary",
          className
        )
      )}
      {...props}
    >
      {children}
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
          "transition-colors hover:bg-level-0 data-[state=selected]:bg-level-2",
          className
        )
      )}
      {...props}
    >
      {children}
    </tr>
  );
};

const Body = ({
  children,
  className,
  ...props
}: PropsWithChildren<ComponentProps<"tbody">>) => {
  return (
    <tbody
      className={twMerge(
        classNames(
          "[&_tr:last-child]:border-none border-b border-secondary",
          className
        )
      )}
      {...props}
    >
      {children}
    </tbody>
  );
};

const Header = ({
  children,
  className,
  ...props
}: PropsWithChildren<ComponentProps<"thead">>) => {
  return (
    <thead
      className={twMerge(
        classNames("[&_tr]:border-b border-secondary", className)
      )}
      {...props}
    >
      {children}
    </thead>
  );
};

const Footer = ({
  children,
  className,
  ...props
}: PropsWithChildren<ComponentProps<"tfoot">>) => {
  return (
    <tfoot
      className={twMerge(
        classNames("border-t [&>tr]:last:border-b-none bg-level-0", className)
      )}
      {...props}
    >
      {children}
    </tfoot>
  );
};

const Table = ({
  children,
  className,
  ...props
}: PropsWithChildren<ComponentProps<"table">>) => {
  return (
    <div className="relative w-full overflow-auto">
      <table
        className={twMerge(classNames("w-full text-sm", className))}
        {...props}
      >
        {children}
      </table>
    </div>
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
