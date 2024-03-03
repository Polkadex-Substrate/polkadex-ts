import { DefinitionsCall } from "@polkadot/types/types";
export declare const orderbookTypes: {
    OrderPayload: {
        client_order_id: string;
        user: string;
        main_account: string;
        pair: string;
        side: string;
        order_type: string;
        quote_order_quantity: string;
        qty: string;
        price: string;
        timestamp: string;
    };
    order_id: string;
    TradingPair: {
        base_asset: string;
        quote_asset: string;
    };
    OrderSide: {
        _enum: {
            Ask: null;
            Bid: null;
        };
    };
    OrderType: {
        _enum: {
            LIMIT: null;
            MARKET: null;
        };
    };
    WithdrawPayload: {
        asset_id: string;
        amount: string;
        timestamp: string;
    };
};
export declare const types: {
    AssetId: {
        _enum: {
            Asset: string;
            POLKADEX: null;
        };
    };
    OrderPayload: {
        client_order_id: string;
        user: string;
        main_account: string;
        pair: string;
        side: string;
        order_type: string;
        quote_order_quantity: string;
        qty: string;
        price: string;
        timestamp: string;
    };
    order_id: string;
    TradingPair: {
        base_asset: string;
        quote_asset: string;
    };
    OrderSide: {
        _enum: {
            Ask: null;
            Bid: null;
        };
    };
    OrderType: {
        _enum: {
            LIMIT: null;
            MARKET: null;
        };
    };
    WithdrawPayload: {
        asset_id: string;
        amount: string;
        timestamp: string;
    };
};
export declare const runtime: DefinitionsCall;
export declare const rpc: {
    tx: {
        quotePriceExactTokensForTokens: {
            description: string;
            params: {
                name: string;
                type: string;
            }[];
            type: string;
        };
        quotePriceTokensForExactTokens: {
            description: string;
            params: {
                name: string;
                type: string;
            }[];
            type: string;
        };
    };
};
export declare const apiTypes: {
    types: {
        AssetId: {
            _enum: {
                Asset: string;
                POLKADEX: null;
            };
        };
        OrderPayload: {
            client_order_id: string;
            user: string;
            main_account: string;
            pair: string;
            side: string;
            order_type: string;
            quote_order_quantity: string;
            qty: string;
            price: string;
            timestamp: string;
        };
        order_id: string;
        TradingPair: {
            base_asset: string;
            quote_asset: string;
        };
        OrderSide: {
            _enum: {
                Ask: null;
                Bid: null;
            };
        };
        OrderType: {
            _enum: {
                LIMIT: null;
                MARKET: null;
            };
        };
        WithdrawPayload: {
            asset_id: string;
            amount: string;
            timestamp: string;
        };
    };
    rpc: {
        tx: {
            quotePriceExactTokensForTokens: {
                description: string;
                params: {
                    name: string;
                    type: string;
                }[];
                type: string;
            };
            quotePriceTokensForExactTokens: {
                description: string;
                params: {
                    name: string;
                    type: string;
                }[];
                type: string;
            };
        };
    };
    runtime: DefinitionsCall;
};
//# sourceMappingURL=types.d.ts.map