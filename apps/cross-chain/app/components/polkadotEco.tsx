"use client";

import { SubmittableExtrinsic } from "@polkadot/api/promise/types";
import { Signer } from "@polkadot/api/types";
import { getChainConnector, Thea } from "@polkadex/thea";

const SOURCE_CHAIN = "Polkadot";
const DESTINATION_CHAIN = "Polkadex";
const SELECTED_ASSET = "DOT";

const fromAddress = "5GLFKUxSXTf8MDDKM1vqEFb5TuV1q642qpQT964mrmjeKz4w";
const toAddress = "5GLFKUxSXTf8MDDKM1vqEFb5TuV1q642qpQT964mrmjeKz4w";
const amount = 0.01;

export const PolkadotEco = () => {
  const { getAllChains } = new Thea();

  const queryBalances = async () => {
    const srcChain = getAllChains().find((c) => c.name === SOURCE_CHAIN);
    if (!srcChain) throw new Error(`${SOURCE_CHAIN} chain not found..`);
    console.log("Querying balances...");
    const srcChainConnector = getChainConnector(srcChain.genesis);
    const assets = srcChainConnector.getSupportedAssets();
    const balances = await srcChainConnector.getBalances(fromAddress, assets);
    console.log(balances);
  };
  const xcmTransfer = async () => {
    const { web3Enable, web3FromAddress } = await import(
      "@polkadot/extension-dapp"
    );

    await web3Enable("polkadex-thea");
    const injector = await web3FromAddress(fromAddress);

    if (!injector) throw new Error("Injector not found..");

    const srcChain = getAllChains().find((c) => c.name === SOURCE_CHAIN);
    if (!srcChain) throw new Error(`${SOURCE_CHAIN} chain not found..`);
    const srcChainConnector = getChainConnector(srcChain.genesis);

    const selectedAsset = srcChainConnector
      .getSupportedAssets()
      .find((a) => a.ticker === SELECTED_ASSET);

    if (!selectedAsset) throw new Error("Could not find asset...");

    const destChain = srcChainConnector
      .getDestinationChains(selectedAsset)
      .find((c) => c.name === DESTINATION_CHAIN);

    if (!destChain) throw new Error("Invalid destination chain..");

    console.log("Doing transfer...");
    const transferConfig = await srcChainConnector.getTransferConfig(
      destChain,
      selectedAsset,
      fromAddress,
      toAddress
    );

    console.log("Transfer config => ", transferConfig);

    const ext = await transferConfig.transfer<SubmittableExtrinsic>(amount);
    console.log(ext);

    await ext.signAndSend(fromAddress, {
      signer: injector.signer as Signer,
    });
  };

  return (
    <div className="mb-20">
      <h1 className="text-2xl underline decoration-dashed underline-offset-4 text-sky-400 text-center">
        Polkadot EcoSystem
      </h1>

      <p className="my-4 text-center">
        {SOURCE_CHAIN} to {DESTINATION_CHAIN} transfer ---- {amount}{" "}
        {SELECTED_ASSET}
      </p>

      <div className="flex justify-center items-center gap-4 my-10">
        <button
          className="bg-gray-800 text-white px-3 py-2 rounded"
          onClick={queryBalances}
        >
          Query Balances
        </button>
        <button
          className="bg-gray-800 text-white px-3 py-2 rounded"
          onClick={xcmTransfer}
        >
          Transfer
        </button>
      </div>
    </div>
  );
};
