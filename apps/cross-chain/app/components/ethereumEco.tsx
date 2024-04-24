"use client";

import { Polkadex, Sepolia } from "@/core";
import { SimulateContractReturnType, createWalletClient, custom } from "viem";
import { sepolia } from "viem/chains";

export const EthereumEco = () => {
  const sepoliaConnector = new Sepolia();
  const destChain = new Polkadex();

  let walletClient = createWalletClient({
    chain: sepolia,
    // @ts-ignore
    transport: custom(window.ethereum!),
  });

  const authoizeMetamask = async () => {
    const addresses = await walletClient.requestAddresses();
    console.log("All addresses => ", addresses);
    return addresses[0];
  };

  const getAllBalances = async () => {
    console.log("Fetching balance...");
    const selectedAddress = await authoizeMetamask();
    const assets = sepoliaConnector.getSupportedAssets();
    const balances = await sepoliaConnector.getBalances(
      selectedAddress as string,
      assets
    );
    console.log(assets, balances);
  };

  const approveTransfer = async () => {
    const selectedAddress = await authoizeMetamask();
    const linkAsset = sepoliaConnector.getSupportedAssets()[1];
    const { request } =
      await sepoliaConnector.approveTokenTransfer<SimulateContractReturnType>(
        0.1,
        selectedAddress as string,
        linkAsset.id as string
      );

    // @ts-ignore
    let res = await walletClient.writeContract(request);
    console.log("Approved result => ", res);
  };

  const depositToThea = async () => {
    const selectedAddress = await authoizeMetamask();
    const linkAsset = sepoliaConnector.getSupportedAssets()[1];

    const transferConfig = await sepoliaConnector.getTransferConfig(
      destChain.getChain(),
      linkAsset,
      selectedAddress,
      "5GLFKUxSXTf8MDDKM1vqEFb5TuV1q642qpQT964mrmjeKz4w"
    );

    console.log(transferConfig);

    const { request } =
      await transferConfig.transfer<SimulateContractReturnType>(0.1);

    // @ts-ignore
    const res = await walletClient.writeContract(request);
    console.log("Deposited to THEA => ", res);
  };

  return (
    <div>
      <h1 className="text-2xl underline decoration-dashed underline-offset-4 text-sky-400 text-center">
        Ethereum EcoSystem
      </h1>

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
