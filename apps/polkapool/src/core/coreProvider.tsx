"use client";

import {
  Dispatch,
  ReactNode,
  SetStateAction,
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { AssetsApi, SwapApi, apiTypes } from "@polkadex/polkadex-api";
import { useQuery, UseQueryResult } from "@tanstack/react-query";
import { ApiPromise } from "@polkadot/api";
import { apiOptions } from "@polkadex/blockchain-api";
import {
  ExtensionAccount,
  useExtensionAccounts,
} from "@polkadex/react-providers";
import { formatBalance } from "@polkadot/util";
import { toast } from "sonner";
import { useLocalStorage } from "usehooks-ts";
import { ExtensionsArray } from "@polkadot-cloud/assets/extensions";

import { connectWsProvider, polkadexAsset } from "./utils";

import { defaultConfig } from "@/config";

export type Asset = {
  id: string;
  name: string;
  ticker: string;
  decimals: number;
};

export type Balance = {
  id: string;
  balance: number;
};

export type Extension = (typeof ExtensionsArray)[0] | null;

export type Pool = {
  lpToken: string;
  base: {
    id: string;
    name: string;
    ticker: string;
    reserve: number;
  };
  quote: {
    id: string;
    name: string;
    ticker: string;
    reserve: number;
  };
  info: {
    owner: string;
    issuer: string;
    admin: string;
    freezer: string;
    supply: string;
    deposit: string;
    minBalance: string;
    isSufficient: boolean;
    accounts: string;
    sufficients: string;
    approvals: string;
    status: string;
  };
};

export type Position = {
  lpToken: number;
  base: {
    id: string;
    name: string;
    ticker: string;
    amount: number;
  };
  quote: {
    id: string;
    name: string;
    ticker: string;
    amount: number;
  };
};

const { disabledTokens, networkEndpoint } = defaultConfig;
const { runtime, rpc, types } = apiOptions;

export const CoreProvider = ({ children }: { children: ReactNode }) => {
  const [extension, setExtension] = useState<Extension>(null);
  const [api, setApi] = useState<ApiPromise>();
  const [showConnectAccount, setShowConnectAccount] = useState(false);
  const [localAccount, setLocalAccount] = useLocalStorage<{
    address: string;
    name: string;
    source: string;
  } | null>("account", null);

  const [account, setAccount] = useState<ExtensionAccount | null>(null);
  const { extensionAccounts } = useExtensionAccounts();

  const isLogged = useMemo(
    () => !!Object.keys(account ?? {}).length,
    [account]
  );

  const browserAccount = useMemo(() => {
    const hasAccount = !!Object.keys(localAccount ?? {}).length;
    if (!hasAccount) return;

    return extensionAccounts?.find(
      ({ source, address }) =>
        source === localAccount?.source && localAccount.address === address
    );
  }, [localAccount, extensionAccounts]);

  const onSetAccount = (account: ExtensionAccount) => {
    setLocalAccount({
      address: account.address,
      name: account.name,
      source: account.source,
    });
    setAccount(account);
  };

  useEffect(() => {
    if (!!browserAccount && !isLogged) setAccount(browserAccount);
  }, [isLogged, browserAccount]);

  const onConnectApi = useCallback(async () => {
    try {
      const provider = await connectWsProvider(networkEndpoint);
      const apiPromise = await ApiPromise.create({
        provider,
        runtime: { ...runtime, ...apiTypes.runtime },
        types: { ...types, ...apiTypes.types },
        rpc: { ...rpc, ...apiTypes.rpc },
        signedExtensions: {
          ChargeAssetTxPayment: {
            extrinsic: {
              tip: "Compact<Balance>",
              assetId: "Option<u128>",
            },
            payload: {},
          },
        },
      });
      setApi(apiPromise);
    } catch (error) {
      toast.error("Connection error");
    }
  }, [setApi]);

  const connected = useMemo(() => !!Object.keys(api ?? {}).length, [api]);

  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  const swapApi = useMemo(() => new SwapApi(api as ApiPromise), [api]);
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  const assetApi = useMemo(() => new AssetsApi(api as ApiPromise), [api]);

  const enabledAssets = useMemo(
    () => connected && !!assetApi,
    [assetApi, connected]
  );

  /** Get Assets **/
  const {
    data: assets,
    status: assetsStatus,
    error: assetsError,
  } = useQuery({
    queryKey: ["getAssets", !!assetApi],
    enabled: enabledAssets,
    queryFn: async () => {
      const assets = await assetApi.queryAllAssets();
      const allAssets = [
        ...assets.filter(({ id }) => !disabledTokens.includes(id)),
        polkadexAsset,
      ];
      return allAssets.sort((a, b) => a.ticker.localeCompare(b.ticker));
    },
  });

  const enabledBalances = useMemo(
    () => !!assetApi && isLogged && !!assets,
    [assetApi, isLogged, assets]
  );

  /** Get balances **/
  const {
    data: balances,
    isLoading: balancesLoading,
    isSuccess: balancesSuccess,
    error: balancesError,
    refetch: onBalancesRefetch,
  } = useQuery({
    queryKey: ["getBalance"],
    enabled: enabledBalances,
    queryFn: async () => {
      if (!assets || !account || !api) return;

      return await Promise.all(
        assets.map(async (e) => {
          if (e.id !== "POLKADEX") {
            const balance = await assetApi.queryBalance(account.address, e.id);
            return {
              id: e.id,
              balance,
            };
          } else {
            const b = await api.query.system.account(account.address);
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            const free = BigInt(b.toJSON()?.data?.free || "0");
            const formattedBalance = formatBalance(free, {
              decimals: 12,
              withSi: false,
              forceUnit: "-",
            });
            return {
              id: e.id,
              balance: parseFloat(formattedBalance),
            };
          }
        })
      );
    },
  });

  const enabled = useMemo(() => !!swapApi && !!assets, [swapApi, assets]);

  /** Get Pools**/
  const {
    data: pools,
    isLoading: poolsLoading,
    isSuccess: poolsSuccess,
    error: poolsError,
  } = useQuery({
    queryKey: ["getPools", !!swapApi, assets?.length],
    enabled,
    queryFn: async () => {
      if (!swapApi || !assets) return;
      const data = await swapApi.queryPools();
      return await Promise.all(
        data.map(async (e) => {
          const base = assets.find(
            (val) => val.id.toLowerCase() === e.base.toLowerCase()
          );
          const quote = assets.find(
            (val) => val.id.toLowerCase() === e.quote.toLowerCase()
          );

          const reserve = await swapApi.getReserves(e.base, e.quote);
          const lpTokenInfo = await api?.query.assets.asset(e.lpToken);
          const info = lpTokenInfo?.toJSON();
          return {
            lpToken: e.lpToken,
            base: { ...base, reserve: reserve.base },
            quote: { ...quote, reserve: reserve.quote },
            info,
          } as Pool;
        })
      );
    },
  });
  const positionsEnabled = useMemo(
    () => !!api && !!pools?.length && !!account,
    [api, account, pools]
  );

  /** Get positions**/
  const {
    data: positions,
    isLoading: positionsLoading,
    isSuccess: positionsSuccess,
    error: positionsError,
    refetch: onRefetchPositions,
  } = useQuery({
    queryKey: [
      "getpositions",
      !!swapApi,
      !!pools?.length,
      !!api,
      account?.address,
    ],
    enabled: positionsEnabled,
    queryFn: async () => {
      if (!api || !account || !pools || !assets) return;
      const data = await Promise.all(
        pools.map(async (e) => {
          const data = await api.query.assets.account(
            e.lpToken,
            account.address
          );

          const res = data.toJSON() as { balance: number };

          const formattedBalance = formatBalance(res?.balance ?? "0", {
            decimals: 12,
            withSi: false,
            forceUnit: "-",
          });
          const lpToken = Number(formattedBalance);
          const hasData = Number(formattedBalance);
          if (!hasData) return null;
          const userQuote = e.quote.reserve / Number(e.info.supply);
          const userBase = e.base.reserve / Number(e.info.supply);

          const baseUserLiquidity = userBase * lpToken * Math.pow(10, 12);
          const quoteUserLiquidity = userQuote * lpToken * Math.pow(10, 12);

          return {
            lpToken,
            base: {
              id: e.base.id,
              name: e.base.name,
              ticker: e.base.ticker,
              amount: baseUserLiquidity,
            },
            quote: {
              id: e.quote.id,
              name: e.quote.name,
              ticker: e.quote.ticker,
              amount: quoteUserLiquidity,
            },
          } as Position;
        })
      );
      return data.filter((e) => e !== null) as Position[];
    },
  });

  useEffect(() => {
    if (!connected) onConnectApi();
  }, [connected, onConnectApi]);

  return (
    <Context.Provider
      value={{
        assetApi,
        swapApi,
        api,
        connected,
        onConnectApi,
        assets,
        assetsStatus,
        assetsError,
        balances,
        balancesLoading,
        balancesSuccess,
        balancesError,
        showConnectAccount,
        setShowConnectAccount,
        account,
        onSetAccount,
        onLogout: () => {
          setLocalAccount(null);
          setAccount(null);
        },
        isLogged,
        onBalancesRefetch,
        extension,
        setExtension,
        pools: pools ?? [],
        poolsError,
        poolsLoading,
        poolsSuccess,
        positions: positions ?? [],
        positionsError,
        positionsLoading,
        positionsSuccess,
        onRefetchPositions,
      }}
    >
      {children}
    </Context.Provider>
  );
};

type State = {
  assetApi?: AssetsApi;
  swapApi?: SwapApi;
  api?: ApiPromise;
  connected: boolean;
  onConnectApi: () => void;
  showConnectAccount: boolean;
  setShowConnectAccount: Dispatch<SetStateAction<boolean>>;
  account: ExtensionAccount | null;
  onSetAccount: (value: ExtensionAccount) => void;
  onLogout: () => void;
  assets?: Asset[];
  assetsStatus: UseQueryResult["status"];
  assetsError: UseQueryResult["error"];
  balances?: Balance[];
  balancesLoading: UseQueryResult["isLoading"];
  balancesSuccess: UseQueryResult["isSuccess"];
  balancesError: UseQueryResult["error"];
  onBalancesRefetch?: UseQueryResult["refetch"];
  isLogged: boolean;
  extension: Extension | null;
  setExtension: Dispatch<SetStateAction<Extension | null>>;
  pools: Pool[];
  poolsLoading: UseQueryResult["isLoading"];
  poolsSuccess: UseQueryResult["isSuccess"];
  poolsError: UseQueryResult["error"];
  positions: Position[];
  positionsLoading: UseQueryResult["isLoading"];
  positionsSuccess: UseQueryResult["isSuccess"];
  positionsError: UseQueryResult["error"];
  onRefetchPositions?: UseQueryResult["refetch"];
};

const Context = createContext<State>({
  assetApi: undefined,
  swapApi: undefined,
  api: undefined,
  connected: false,
  onConnectApi: async () => {},
  showConnectAccount: false,
  setShowConnectAccount: () => {},
  account: null,
  onSetAccount: () => {},
  onLogout: () => {},
  assets: [],
  assetsStatus: "pending",
  assetsError: null,
  balances: [],
  balancesLoading: true,
  balancesSuccess: false,
  balancesError: null,
  isLogged: false,
  extension: null,
  setExtension: () => {},
  pools: [],
  poolsLoading: true,
  poolsSuccess: false,
  poolsError: null,
  positions: [],
  positionsLoading: true,
  positionsSuccess: false,
  positionsError: null,
});

export const useCoreProvider = () => {
  const state = useContext(Context);
  if (!Context)
    throw new Error("useCoreProvider must be used within an component");
  return { ...state };
};
