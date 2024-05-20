export const defaultConfig = {
  disabledTokens: process.env.DISABLED_TOKENS?.split(",") ?? [
    "789",
    "1",
    "456",
    "101112",
    "123",
    "188197390862117588552302061289480388608",
  ],
  networkEndpoint:
    process.env.NETWORK_ENDPOINT ??
    "wss://polkadex.api.onfinality.io/ws?apikey=4e69b57b-0a14-45b8-8a86-3abf709a4ff5",
};
