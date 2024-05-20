import { Asset, AssetType } from "../types";

export const TIME_INTERVALS = {
  secondsInBlock: 12,
  blocksInDay: 7200,
  daysInEpoch: 28,
  blocksInEpoch: 201600,
};

export const ASSETS: Asset[] = [
  {
    name: "DOT",
    ticker: "DOT",
    id: "95930534000017180603917534864279132680",
    decimal: 12,
    network: AssetType.Substrate,
  },
  {
    name: "USDT",
    ticker: "USDT",
    id: "3496813586714279103986568049643838918",
    decimal: 12,
    network: AssetType.Substrate,
  },
  {
    name: "USDC",
    ticker: "USDC",
    id: "304494718746685751324769169435167367843",
    decimal: 12,
    network: AssetType.Substrate,
  },
  {
    name: "DED",
    ticker: "DED",
    id: "119367686984583275840673742485354142551",
    decimal: 12,
    network: AssetType.Substrate,
  },
  {
    name: "PINK",
    ticker: "PINK",
    id: "339306133874233608313826294843504252047",
    decimal: 12,
    network: AssetType.Substrate,
  },
  {
    name: "UNQ",
    ticker: "UNQ",
    id: "32595388462891559990827225517299393930",
    decimal: 12,
    network: AssetType.Substrate,
  },
  {
    name: "GLMR",
    ticker: "GLMR",
    id: "182269558229932594457975666948556356791",
    decimal: 12,
    network: AssetType.Substrate,
  },
  {
    name: "IBTC",
    ticker: "IBTC",
    id: "226557799181424065994173367616174607641",
    decimal: 12,
    network: AssetType.Substrate,
  },
  {
    name: "PHA",
    ticker: "PHA",
    id: "193492391581201937291053139015355410612",
    decimal: 12,
    network: AssetType.Substrate,
  },
  {
    name: "ASTR",
    ticker: "ASTR",
    id: "222121451965151777636299756141619631150",
    decimal: 12,
    network: AssetType.Substrate,
  },
  {
    name: "BNC",
    ticker: "BNC",
    id: "130314105136721928300689838359167097187",
    decimal: 12,
    network: AssetType.Substrate,
  },
  {
    name: "vDOT",
    ticker: "VDOT",
    id: "313524628741076911470961827389955394913",
    decimal: 10,
    network: AssetType.Substrate,
  },
];

export const ASSETS_MAP = new Map<string, Asset>(
  ASSETS.map((a) => [a.ticker, a])
);
