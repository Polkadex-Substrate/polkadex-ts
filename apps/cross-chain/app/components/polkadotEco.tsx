"use client";

import { SubmittableExtrinsic } from "@polkadot/api/promise/types";

import { AssetHub } from "@/core";

const fromAddress = "5GLFKUxSXTf8MDDKM1vqEFb5TuV1q642qpQT964mrmjeKz4w";
const toAddress = "5GLFKUxSXTf8MDDKM1vqEFb5TuV1q642qpQT964mrmjeKz4w";
const amount = 0.01;

export const PolkadotEco = () => {
  const queryBalances = async () => {
    const assetHub = new AssetHub();
    const assets = assetHub.getSupportedAssets();
    const balances = await assetHub.getBalances(fromAddress, assets);
    console.log(balances);
  };
  const xcmTransfer = async () => {
    const { web3Enable, web3FromAddress } = await import(
      "@polkadot/extension-dapp"
    );

    await web3Enable("polkadex-thea");
    const injector = await web3FromAddress(fromAddress);

    if (!injector) return;

    console.log("Doing transfer...");

    const assetHub = new AssetHub();
    const usdtAsset = assetHub.getSupportedAssets()[1];
    const destChain = assetHub.getDestinationChains(usdtAsset)[0];

    const transferConfig = await assetHub.getTransferConfig(
      destChain,
      usdtAsset,
      fromAddress,
      toAddress
    );

    const ext = await transferConfig.transfer<SubmittableExtrinsic>(amount);
    console.log(ext);

    const res = await ext.signAndSend(fromAddress, { signer: injector.signer });
    console.log(res);
  };

  return (
    <div className="mb-20">
      <h1 className="text-2xl underline decoration-dashed underline-offset-4 text-sky-400 text-center">
        Polkadot EcoSystem
      </h1>

      <p className="my-4 text-center">
        AssetHub to Polkadex transfer ---- {amount} USDT
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
