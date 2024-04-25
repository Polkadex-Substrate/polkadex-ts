import { WsProvider } from "@polkadot/rpc-provider";

export const connectWsProvider = (url: string, reconnect = 5000) =>
  new Promise<WsProvider>((resolve, reject) => {
    const provider = new WsProvider(url, reconnect);
    provider.on("connected", () => {
      resolve(provider);
    });
    provider.on("error", () => {
      provider.disconnect();
      // eslint-disable-next-line prefer-promise-reject-errors
      reject("disconnected");
    });
  });

export const polkadexAsset = {
  id: "POLKADEX",
  name: "Polkadex",
  ticker: "PDEX",
  decimals: 12,
};
