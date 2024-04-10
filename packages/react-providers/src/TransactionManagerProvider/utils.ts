import { ExtStatus } from "./types";

type Status = {
  [key: string]: boolean;
};

export const getStatus = (status: Status): ExtStatus["status"] => {
  const statusMap: { [key: string]: ExtStatus["status"] } = {
    isError: "error",
    isBroadcast: "broadcasted",
    isInBlock: "inblock",
    isFinalized: "finalized",
  };

  for (const key of Object.keys(statusMap).reverse())
    if (status[key]) return statusMap[key];

  return "ongoing";
};
