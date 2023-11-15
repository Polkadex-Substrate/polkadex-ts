import classNames from "classnames";

import { Typography } from "../components";
import { Token } from "../components/token";
import * as Tokens from "../tokens";

export const ChainCard = ({
  title,
  description,
  icon,
}: {
  title: string;
  description: string;
  icon: keyof typeof Tokens;
}) => {
  return (
    <div
      className={classNames(
        "flex items-center gap-3 p-4 rounded-md",
        "hover:bg-level-3 duration-300 transition-colors"
      )}
      role="button"
    >
      <Token name={icon} className="w-8 h-8" />
      <div className="flex flex-col gap-1">
        <Typography.Text bold>{title}</Typography.Text>
        <Typography.Text variant="primary">{description}</Typography.Text>
      </div>
    </div>
  );
};
