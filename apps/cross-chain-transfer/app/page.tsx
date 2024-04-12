"use client";

import { ParachainTransferService } from "@polkadex/thea";

const fromChain = "assethub";
const toChain = "polkadex";

const sourceAddress = "15GYTpDWPEvbnkDqJeyqNQREKXUfXPcAvK8wJP48QrmAW8wL";
const destinationAddress = "esq2wFkRsic8WM4nstAtkjqWdCDnTrGHMpFjaGN2rEHnQXUNm";
const amount = 0.001;
const asset = "usdt";

export default function Home() {
  const crossChainTransfer = async () => {
    const parachainTransfer = new ParachainTransferService();

    const { web3Enable, web3FromAddress } = await import(
      "@polkadot/extension-dapp"
    );

    await web3Enable("polkadex-thea");
    const { signer } = await web3FromAddress(sourceAddress);
    if (!signer) throw new Error("Polkdot signer not found");

    const transferData = await parachainTransfer.getTransferData({
      sourceKeyOrChain: fromChain,
      sourceAddress,

      destinationAddress,
      destinationKeyOrChain: toChain,

      keyOrAsset: asset,
      polkadotSigner: signer,
    });

    console.log("Transfer data => ", transferData);
  };

  return (
    <div className="flex flex-col items-center justify-center">
      <h1 className="text-3xl text-center my-4 text-blue-500 underline underline-offset-[5px] decoration-dashed">
        XCM transfer
      </h1>
      <p className="text-lg">
        Sending from <span className="capitalize">{fromChain}</span> to{" "}
        <span className="capitalize">{toChain}</span> for {amount}{" "}
        <span className="uppercase">{asset}</span>
      </p>
      <button
        className="bg-yellow-50 text-black px-4 py-2 my-4"
        onClick={crossChainTransfer}
      >
        Send Tx
      </button>
    </div>
  );
}
