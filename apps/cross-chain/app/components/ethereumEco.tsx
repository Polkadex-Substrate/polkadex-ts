"use client";

import { Thea, getChainConnector, EVMChainAdapter } from "@polkadex/thea";
import { useEffect, useState } from "react";
import {
  SimulateContractReturnType,
  createWalletClient,
  custom,
  WalletClient,
} from "viem";
import { sepolia } from "viem/chains";

const SOURCE_CHAIN = "Sepolia";
const DESTINATION_CHAIN = "Polkadex";
const AMOUNT = 0.1;

const DESTINATION_ADDRESS = "5GLFKUxSXTf8MDDKM1vqEFb5TuV1q642qpQT964mrmjeKz4w";

export const EthereumEco = () => {
  const { getAllChains } = new Thea();
  const [walletClient, setWalletClient] = useState<WalletClient>();

  useEffect(() => {
    setWalletClient(
      createWalletClient({
        chain: sepolia,
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        transport: custom(window.ethereum!),
      })
    );
  }, []);
  const authoizeMetamask = async () => {
    const addresses = await walletClient?.requestAddresses();
    console.log("All addresses => ", addresses);
    return addresses?.[0];
  };

  const getAllBalances = async () => {
    const sourceChain = getAllChains().find((c) => c.name === SOURCE_CHAIN);
    const destChain = getAllChains().find((c) => c.name === DESTINATION_CHAIN);
    if (!sourceChain) throw new Error(`${SOURCE_CHAIN} chain not found..`);
    if (!destChain) throw new Error(`${DESTINATION_CHAIN} chain not found..`);
    const sepoliaConnector = getChainConnector(sourceChain.genesis);

    console.log("Fetching balance...");
    const selectedAddress = await authoizeMetamask();
    const assets = sepoliaConnector.getSupportedAssets(destChain);
    const balances = await sepoliaConnector.getBalances(
      selectedAddress as string,
      assets
    );
    console.log(balances);
  };

  const approveTransfer = async () => {
    const sourceChain = getAllChains().find((c) => c.name === SOURCE_CHAIN);
    const destChain = getAllChains().find((c) => c.name === DESTINATION_CHAIN);
    if (!sourceChain) throw new Error(`${SOURCE_CHAIN} chain not found..`);
    if (!destChain) throw new Error(`${DESTINATION_CHAIN} chain not found..`);
    const sepoliaConnector = getChainConnector(
      sourceChain.genesis
    ) as EVMChainAdapter;

    const selectedAddress = await authoizeMetamask();
    const linkAsset = sepoliaConnector.getSupportedAssets(destChain)[1];
    const { request } =
      await sepoliaConnector.approveTokenTransfer<SimulateContractReturnType>(
        AMOUNT,
        selectedAddress as string,
        linkAsset.id as string
      );

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const res = await walletClient.writeContract(request);
    console.log("Approved result => ", res);
  };

  const depositToThea = async () => {
    const sourceChain = getAllChains().find((c) => c.name === SOURCE_CHAIN);
    if (!sourceChain) throw new Error(`${SOURCE_CHAIN} chain not found..`);
    const sepoliaConnector = getChainConnector(
      sourceChain.genesis
    ) as EVMChainAdapter;

    const destChain = getAllChains().find((c) => c.name === DESTINATION_CHAIN);
    if (!destChain) throw new Error(`${DESTINATION_CHAIN} chain not found..`);
    const polkadexConnector = getChainConnector(
      destChain.genesis
    ) as EVMChainAdapter;

    const selectedAddress = await authoizeMetamask();
    const linkAsset = sepoliaConnector.getSupportedAssets(destChain)[1];

    const transferConfig = await sepoliaConnector.getTransferConfig(
      polkadexConnector.getChain(),
      linkAsset,
      selectedAddress as `0x${string}`,
      DESTINATION_ADDRESS
    );

    console.log(transferConfig);

    const { request } =
      await transferConfig.transfer<SimulateContractReturnType>(0.1);

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const res = await walletClient.writeContract(request);
    console.log("Deposited to THEA => ", res);
  };

  return (
    <div>
      <h1 className="text-2xl underline decoration-dashed underline-offset-4 text-sky-400 text-center">
        Ethereum EcoSystem
      </h1>

      <p className="my-4 text-center">
        {SOURCE_CHAIN} to {DESTINATION_CHAIN} transfer ---- {AMOUNT} USDT
      </p>

      <div className="flex justify-center items-center gap-4 my-10">
        <button
          className="bg-gray-800 text-white px-3 py-2 rounded"
          onClick={authoizeMetamask}
        >
          Authoize Metamask
        </button>
        <button
          className="bg-gray-800 text-white px-3 py-2 rounded"
          onClick={getAllBalances}
        >
          Get all balances
        </button>
        <button
          className="bg-gray-800 text-white px-3 py-2 rounded"
          onClick={approveTransfer}
        >
          Approve Transfer
        </button>
        <button
          className="bg-gray-800 text-white px-3 py-2 rounded"
          onClick={depositToThea}
        >
          Deposit to THEA
        </button>
      </div>
    </div>
  );
};
