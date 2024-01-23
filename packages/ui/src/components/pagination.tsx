import classNames from "classnames";
import { ComponentProps, PropsWithChildren } from "react";
import { twMerge } from "tailwind-merge";
import * as Icons from "@heroicons/react/24/solid";

import { Button as PolkadexButton, Typography } from "../components";

interface PageProps extends ComponentProps<typeof Typography.Text> {
  currentPage: number;
  pagesLength: number;
}

const Page = ({
  currentPage,
  pagesLength,
  ...props
}: PropsWithChildren<PageProps>) => {
  return (
    <Typography.Text className="text-sm" {...props}>
      Page {currentPage} of {pagesLength}
    </Typography.Text>
  );
};

const Ellipsis = ({
  className,
  ...props
}: PropsWithChildren<Omit<ComponentProps<"svg">, "ref">>) => {
  return (
    <div>
      <Icons.EllipsisHorizontalIcon
        className={classNames("w-4 h-4", className)}
        {...props}
      />
    </div>
  );
};

interface ItemProps extends ComponentProps<"button"> {
  active?: boolean;
}
const Item = ({
  className,
  children = "Previous",
  active,
  ...props
}: PropsWithChildren<ItemProps>) => {
  return (
    <PolkadexButton.Ghost
      size="sm"
      className={classNames(active && "bg-secondary-base", className)}
      appearance="secondary"
      {...props}
    >
      {children}
    </PolkadexButton.Ghost>
  );
};

const Content = ({
  className,
  children,
  ...props
}: PropsWithChildren<ComponentProps<"div">>) => {
  return (
    <div
      className={classNames("flex gap-1 items-center", className)}
      {...props}
    >
      {children}
    </div>
  );
};

interface ButtonProps extends ComponentProps<"button"> {
  arrowSide?: "left" | "right" | null;
  arrowType?: "double" | "single";
}

const Button = ({
  className,
  children,
  arrowSide = null,
  arrowType = "single",
  ...props
}: PropsWithChildren<ButtonProps>) => {
  const IconComponent =
    Icons[arrowType === "single" ? "ChevronLeftIcon" : "ChevronDoubleLeftIcon"];

  return (
    <>
      {children ? (
        <PolkadexButton.Ghost
          size="sm"
          className={classNames("gap-1", className)}
          appearance="tertiary"
          {...props}
        >
          {arrowSide === "left" && (
            <IconComponent className="w-3 h-3 inline-block align-middle" />
          )}
          {children}
          {arrowSide === "right" && (
            <IconComponent className="w-3 h-3 inline-block align-middle rotate-180" />
          )}
        </PolkadexButton.Ghost>
      ) : (
        <PolkadexButton.Icon size="sm" appearance="secondary" variant="outline">
          {arrowSide === "left" ? (
            <IconComponent className="w-4 h-4" />
          ) : (
            <IconComponent className="w-4 h-4 rotate-180" />
          )}
        </PolkadexButton.Icon>
      )}
    </>
  );
};

const Pagination = ({
  className,
  children,
  ...props
}: PropsWithChildren<ComponentProps<"nav">>) => {
  return (
    <nav
      role="navigation"
      aria-label="pagination"
      className={twMerge(
        classNames("flex items-center justify-center gap-4 w-full", className)
      )}
      {...props}
    >
      {children}
    </nav>
  );
};

Pagination.Button = Button;
Pagination.Content = Content;
Pagination.Item = Item;
Pagination.Ellipsis = Ellipsis;
Pagination.Page = Page;

export { Pagination };