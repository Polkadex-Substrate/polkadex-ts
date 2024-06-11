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

const Astar: Config = {
  Polkadex: {
    ASTR: 0.01,
    DOT: 0.1,
    GLMR: 0.15,
    UNQ: 0.1,
    PHA: 0.2,
    IBTC: 0.000003,
    BNC: 0.1,
    vDOT: 0.1,
  },
};

const Bifrost: Config = {
  Polkadex: {
    vDOT: 0.001,
    ASTR: 0.1,
    GLMR: 0.01,
    DOT: 0.1,
  },
};

const Moonbeam: Config = {
  Polkadex: {
    PDEX: 0.1,
    GLMR: 0.1,
    DOT: 0.1,
    ASTR: 0.1,
    PHA: 0.2,
    BNC: 0.01,
    vDOT: 0.001,
    IBTC: 0.000003,
  },
};

const Polkadex: Config = {
  Moonbeam: {
    ASTR: 0.2,
    DOT: 0.1,
    PHA: 0.2,
    BNC: 0.15,
    vDOT: 0.01,
  },
};

export const MIN_BRIDGE_AMOUNT: Record<string, Config> = {
  Interlay,
  Astar,
  Bifrost,
  Moonbeam,
  Polkadex,
};
