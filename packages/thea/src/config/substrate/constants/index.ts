// Note - We are configuring minimum amount for a cross-chain transfer here as @moonbeam/sdk doesn't support it natively.

// Note - Ensure that the Chain and Asset ticker match the definitions provided in the configurations.

type Config = Record<string, Record<string, number>>;

const Interlay: Config = {
  Polkadex: {
    IBTC: 0.0000001,
    DOT: 0.1,
    GLMR: 0.1,
    BNC: 0.01,
    vDOT: 0.0001,
  },
};

export const MIN_BRIDGE_AMOUNT: Record<string, Config> = {
  Interlay,
};
