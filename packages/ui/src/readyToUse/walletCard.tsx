import classNames from "classnames";
import { PropsWithChildren } from "react";

import { Copy, Typography } from "../components";
import { truncateString, Icons } from "../../index";

type WalletCardProps = {
  name?: string;
  address: string;
  onClick?: () => void;
  withIcon?: boolean;
  hoverable?: boolean;
  present?: boolean;
};

const WalletCard = ({
  name,
  address,
  onClick,
  withIcon = true,
  hoverable = true,
  children,
}: PropsWithChildren<WalletCardProps>) => {
  const shortAddress = truncateString(address, 12);

  const props = onClick && {
    role: "Button",
    onClick,
  };

  return (
    <div
      {...props}
      className={classNames(
        "flex-1 flex items-center gap-3 justify-between rounded-lg cursor-pointer",
        hoverable && "p-3 hover:bg-level-4 duration-300 transition-colors"
      )}
    >
      <div className="flex justify-between items-center gap-1">
        <div className="flex items-center gap-2 ">
          {withIcon && (
            <div className="flex items-center justify-center w-9 h-9 p-1 bg-level-3 rounded-full">
              <Icons.Avatar />
            </div>
          )}
          <div className="flex flex-col">
            <Typography.Text bold>{name}</Typography.Text>
            <div className="flex items-center gap-1 text-primary">
              <Copy value={address} />
              <Typography.Text variant="primary">
                {shortAddress}
              </Typography.Text>
            </div>
          </div>
        </div>
      </div>
      {children}
    </div>
  );
};

const Inverted = ({
  name,
  address,
  onClick,
  withIcon = true,
  hoverable = true,
  present = true,
  children,
}: PropsWithChildren<WalletCardProps>) => {
  const shortAddress = truncateString(address, 8);

  const props = onClick && {
    role: "Button",
    onClick,
  };

  return (
    <div
      {...props}
      className={classNames(
        "flex-1 flex items-center gap-3 justify-between rounded-lg cursor-pointer",
        hoverable && "p-3 hover:bg-level-2 duration-300 transition-colors"
      )}
    >
      <div className="flex justify-between items-center gap-1">
        <div className="flex items-center gap-2">
          {withIcon && (
            <div className="flex items-center justify-center w-9 h-9 p-1 bg-level-3 rounded-full">
              <Icons.Avatar />
            </div>
          )}
          <div className="flex flex-col">
            <div className="flex items-center gap-1">
              <Copy value={address} className="text-primary" />
              <Typography.Text bold size="lg">
                {shortAddress}
              </Typography.Text>
            </div>
            {present ? (
              <Typography.Text variant="primary">{name}</Typography.Text>
            ) : (
              <Typography.Text
                variant="attention"
                size="xs"
                bold
                className="px-1 py-0.5 rounded-md bg-attention-base bg-opacity-20 w-fit"
              >
                Not present
              </Typography.Text>
            )}
          </div>
        </div>
      </div>
      {children}
    </div>
  );
};

WalletCard.Inverted = Inverted;
export { WalletCard };
