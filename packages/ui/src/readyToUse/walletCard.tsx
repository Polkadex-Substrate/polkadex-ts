import { Copy, Typography } from "../components";
import { Avatar } from "../icons";
import { truncateString } from "../helpers";

export const WalletCard = ({
  name,
  address,
  action,
}: {
  name: string;
  address: string;
  action?: () => void;
}) => {
  const shortAddress = truncateString(address, 15);

  return (
    <div
      role="button"
      className="flex justify-between items-center gap-1 rounded-lg p-3 hover:bg-level-2 duration-300 transition-colors cursor-pointer pr-8"
      onClick={action}
    >
      <div className="flex items-center gap-2 ">
        <div className="flex items-center justify-center w-9 h-9 p-1 bg-level-3 rounded-full">
          <Avatar />
        </div>
        <div className="flex flex-col">
          <span className="font-semibold">{name}</span>
          <div className="flex items-center gap-1 text-primary">
            <Copy value={address} />
            <Typography.Text variant="primary">{shortAddress}</Typography.Text>
          </div>
        </div>
      </div>
    </div>
  );
};
