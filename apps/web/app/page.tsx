"use client";

import { ConfigService } from "@moonbeam-network/xcm-config";
import { Sdk, getBalance } from "@moonbeam-network/xcm-sdk";
import { Signer } from "@polkadot/api/types";

import { chainsMap } from "./chains";
import { assetsMap } from "./assets";
import { chainsConfigMap } from "./assetHub";

const configService = new ConfigService({
  assets: assetsMap,
  chains: chainsMap,
  chainsConfig: chainsConfigMap,
});

const srcAddress = "5GLFKUxSXTf8MDDKM1vqEFb5TuV1q642qpQT964mrmjeKz4w";
const destAddress = "5GLFKUxSXTf8MDDKM1vqEFb5TuV1q642qpQT964mrmjeKz4w";
const amount = 0.001;

export default function Page() {
  const crossChainTransferWithSdk = async () => {
    const { web3Enable, web3FromAddress } = await import(
      "@polkadot/extension-dapp"
    );

    await web3Enable("polkadex-thea");
    const injector = await web3FromAddress(srcAddress);
    if (!injector) return;

    const sdkInstance = Sdk({ configService });

    const data = await sdkInstance.getTransferData({
      sourceKeyOrChain: "assethub",
      sourceAddress: srcAddress,
      destinationKeyOrChain: "polkadex",
      destinationAddress: destAddress,
      keyOrAsset: "usdt",
      polkadotSigner: injector.signer as Signer,
    });

    console.log("Transfer data => ", data);
    return;

    const res = await data.transfer(amount);

    console.log(res);
  };

  return (
    <div className="wrapper">
      <h2>THEA Deposit with Moonbeam SDK</h2>
      <p>Sending from AssetHub to Polkadex for {amount} USDT</p>
      <button onClick={crossChainTransferWithSdk}>Submit Tx</button>
    </div>
  );
}
