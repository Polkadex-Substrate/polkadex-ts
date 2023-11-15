import classNames from "classnames";

import { Button, Icon, Typography } from "../components";
import * as Icons from "../icons";

export const ProviderCard = ({
  title,
  icon,
  action,
  installed = true,
  href,
}: {
  title: string;
  action: () => void;
  icon: keyof typeof Icons;
  installed?: boolean;
  href?: string;
}) => {
  return (
    <div
      className={classNames(
        "flex justify-between items-center gap-3 p-4 rounded-md",
        "hover:bg-level-3 duration-300 transition-colors"
      )}
      role="button"
      onClick={installed ? action : undefined}
    >
      <div className="flex justify-between items-center gap-3">
        <Icon name={icon} className="w-7 h-7" />
        <Typography.Text variant={installed ? "base" : "secondary"}>
          {title}
        </Typography.Text>
      </div>
      {!installed && (
        <Button.Ghost asChild size="sm">
          <a href={href} target="_blank" rel="noreferrer">
            Setup wallet
          </a>
        </Button.Ghost>
      )}
    </div>
  );
};
