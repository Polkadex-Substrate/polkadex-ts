import { DefinitionsCall } from "@polkadot/types/types";

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
  order_id: "H256",
  TradingPair: {
    base_asset: "AssetId",
    quote_asset: "AssetId",
  },
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
  ...orderbookTypes,
  AssetId: {
    _enum: {
      Asset: "u128",
      POLKADEX: null,
    },
  },
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
          type: "u128",
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
          type: "u128",
        },
        {
          name: "include_fee",
          type: "bool",
        },
      ],
      type: "Option<u128>",
    },
  },
};

export const apiTypes = { types, rpc, runtime };
