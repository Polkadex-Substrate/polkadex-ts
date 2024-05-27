"use client";

import { getExtensionIcon } from "@polkadot-cloud/assets/extensions";
import { ComponentProps, ElementType } from "react";
import classNames from "classnames";
import { twMerge } from "tailwind-merge";

import { Button, Typography } from "../components";
interface ProviderCardProps extends ComponentProps<typeof Button.Ghost> {
  title: string;
  action: () => void;
  icon: string;
  installed?: boolean;
  href?: string;
}
export const ProviderCard = ({
  title,
  action,
  installed = true,
  icon,
  href,
  className,
}: ProviderCardProps) => {
  const IconComponent = getExtensionIcon(icon) as ElementType;
  return (
    <Button.Ghost
      appearance="quaternary"
      className={twMerge(
        classNames("flex justify-between gap-3 px-4 py-3.5 h-auto"),
        className
      )}
      onClick={action}
      disabled={!installed}
    >
      <div className="flex justify-between items-center gap-3">
        <div className={classNames("w-5 h-5", !installed && "opacity-50")}>
          <IconComponent />
        </div>
        <Typography.Text appearance={installed ? "base" : "secondary"}>
          {title}
        </Typography.Text>
      </div>
      {!installed && (
        <Button.Light asChild size="xs">
          <a href={`//${href}`} target="_blank" rel="noreferrer">
            Setup
          </a>
        </Button.Light>
      )}
    </Button.Ghost>
  );
};
