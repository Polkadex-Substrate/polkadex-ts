import { Asset } from "../types";

const ETH: Asset = {
  id: "123",
  decimal: 18,
  logo: "ETH",
  ticker: "ETH",
};

const LINK: Asset = {
  id: "456",
  decimal: 18,
  logo: "LINK",
  ticker: "LINK",
};

export const ETHEREUM_ASSETS = { ETH, LINK };
