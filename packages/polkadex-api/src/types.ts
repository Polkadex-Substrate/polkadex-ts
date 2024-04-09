import { DefinitionsCall } from "@polkadot/types/types";

export const runtimeTypes = {
  AssetId: {
    _enum: {
      Asset: "u128",
      Polkadex: null,
    },
  },
  TradingPair: {
    base: "AssetId",
    quote: "AssetId",
  },
};
export const orderbookTypes = {
  OrderPayload: {
    client_order_id: "H256",
    user: "AccountId",
    main_account: "AccountId",
    pair: "String",
    side: "OrderSide",
    order_type: "OrderType",
    quote_order_quantity: "String", // Quantity is defined in base asset
    qty: "String",
    price: "String", // Price is defined in quote asset per unit base asset
    timestamp: "i64",
  },
  CancelAllPayload: {
    main: "AccountId",
    proxy: "AccountId",
    market: "String",
    timestamp: "u64",
  },
  order_id: "H256",
  OrderSide: {
    _enum: {
      Ask: null,
      Bid: null,
    },
  },
  OrderType: {
    _enum: {
      LIMIT: null,
      MARKET: null,
    },
  },
  WithdrawPayload: {
    asset_id: "AssetId",
    amount: "String",
    timestamp: "i64",
  },
};

export const types = {
  ...runtimeTypes,
  ...orderbookTypes,
};

export const runtime: DefinitionsCall = {
  AssetConversionApi: [
    {
      methods: {
        get_reserves: {
          description: "Get pool reserves",
          params: [
            {
              name: "asset1",
              type: "AssetId",
            },
            {
              name: "asset2",
              type: "AssetId",
            },
          ],
          type: "Option<(Balance,Balance)>",
        },
      },
      version: 1,
    },
  ],
};

export const rpc = {
  tx: {
    quotePriceExactTokensForTokens: {
      description: "quote price given swapping exact tokens for tokens",
      params: [
        {
          name: "asset_id1",
          type: "String",
        },
        {
          name: "asset_id2",
          type: "String",
        },
        {
          name: "amount",
          type: "String",
        },
        {
          name: "include_fee",
          type: "bool",
        },
      ],
      type: "Option<u128>",
    },
    quotePriceTokensForExactTokens: {
      description: "quote price given swapping tokens for exact tokens",
      params: [
        {
          name: "asset_id1",
          type: "String",
        },
        {
          name: "asset_id2",
          type: "String",
        },
        {
          name: "amount",
          type: "String",
        },
        {
          name: "include_fee",
          type: "bool",
        },
      ],
      type: "Option<u128>",
    },
  },

  lmp: {
    accountsSorted: {
      description: "eligible rewards for an account given market and epoch",
      params: [
        {
          name: "epoch",
          type: "u16",
        },
        {
          name: "market",
          type: "String",
        },
        {
          name: "sorted_by_mm_score",
          type: "bool",
        },
        {
          name: "limit",
          type: "u16",
        },
      ],
      type: "Vec<AccountId32>",
    },
    eligibleRewards: {
      description: "eligible rewards for an account given market and epoch",
      params: [
        {
          name: "epoch",
          type: "u16",
        },
        {
          name: "market",
          type: "String",
        },
        {
          name: "main",
          type: "AccountId",
        },
      ],
      type: "(String, String, String)",
    },
    feesPaidByUserPerEpoch: {
      description: "fee paid by an account given market and epoch",
      params: [
        {
          name: "epoch",
          type: "u16",
        },
        {
          name: "market",
          type: "String",
        },
        {
          name: "main",
          type: "AccountId",
        },
      ],
      type: "String",
    },
    volumeGeneratedByUserPerEpoch: {
      description: "volume generated by an account given market and epoch",
      params: [
        {
          name: "epoch",
          type: "u16",
        },
        {
          name: "market",
          type: "String",
        },
        {
          name: "main",
          type: "AccountId",
        },
      ],
      type: "String",
    },
    listClaimableEpochs: {
      description: "claimable rewards epochs for an account",
      params: [
        {
          name: "market",
          type: "String",
        },
        {
          name: "main",
          type: "AccountId",
        },
        {
          name: "until_epoch",
          type: "u16",
        },
      ],
      type: "Vec<u16>",
    },
    totalScore: {
      description: "total score and fee for a market in an epoch",
      params: [
        {
          name: "market",
          type: "String",
        },
        {
          name: "epoch",
          type: "u16",
        },
      ],
      type: "(String, String)",
    },
    traderMetrics: {
      description:
        "gives the individual mm score, trading score and is claimable",
      params: [
        {
          name: "market",
          type: "String",
        },
        {
          name: "main",
          type: "AccountId",
        },
        {
          name: "epoch",
          type: "u16",
        },
      ],
      type: "(String, String, bool)",
    },
  },
};

export const signedExtensions = {
  ChargeAssetTxPayment: {
    extrinsic: {
      tip: "Compact<Balance>",
      assetId: "Option<u128>",
    },
    payload: {},
  },
};

export const apiTypes = { types, rpc, runtime, signedExtensions };
