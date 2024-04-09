"use client";

import Utils from "@polkadex/utils";
import { signAndSubmitPromiseWrapper } from "@polkadex/blockchain-api";
import { ConfigService, ConfigBuilder } from "@moonbeam-network/xcm-config";
import { Asset } from "@moonbeam-network/xcm-types";
import { ApiPromise, WsProvider } from "@polkadot/api";
import { Signer } from "@polkadot/api/types";
import { SubmittableExtrinsic } from "@polkadot/api/promise/types";
import { Sdk } from "@moonbeam-network/xcm-sdk";

import { chainsMap } from "./chains";
import { assetsMap } from "./assets";
import { chainsConfigMap } from "./assetHub";

const configService = new ConfigService({
  assets: assetsMap,
  chains: chainsMap,
  chainsConfig: chainsConfigMap,
});

const srcAddress = "15GYTpDWPEvbnkDqJeyqNQREKXUfXPcAvK8wJP48QrmAW8wL";
const destAddress = "esq2wFkRsic8WM4nstAtkjqWdCDnTrGHMpFjaGN2rEHnQXUNm";
const amount = 0.001;

export default function Page() {
  const crossChainTransfer = async () => {
    // Transfer params
    const asset = configService.getAsset("usdt");
    const srcChain = configService.getChain("assetHub");
    const destChain = configService.getChain("polkadex");

    console.log("Connecting to blockchain");
    const provider = new WsProvider(srcChain.ws);
    const api = new ApiPromise({ provider });
    await api.isReadyOrError;

    console.log("Connected...");

    const { source } = ConfigBuilder(configService)
      .assets()
      .asset(asset)
      .source(srcChain)
      .destination(destChain)
      .build();

    const assetId = source.chain.getAssetId(source.config.asset);

    const destFee = new Asset({ key: "pdex", originSymbol: "PDEX" });
    const feeAssetId = source.chain.getAssetId(destFee);
    const fee = BigInt(0);

    const balanceBuilder = source.config.balance.build({
      address: srcAddress,
      asset: assetId,
    });

    // <--------- Balance Fetching ---------->
    const balance = await api.query?.[balanceBuilder.module]?.[
      balanceBuilder.func
    ]?.(...balanceBuilder.args);
    console.log("Balance => ", balance.toJSON());

    const palletInstance = srcChain.getAssetPalletInstance(source.config.asset);
    const assetDecimal = srcChain.getAssetDecimals(source.config.asset);

    const destAccountId = api.createType("AccountId32", destAddress).toHex();
    const amountFormatted = BigInt(
      Utils.parseUnits(amount.toString(), assetDecimal)
    );

    console.log({ amountFormatted, destAccountId });

    const extrinsicBuilder = source.config.extrinsic?.build({
      address: destAccountId,
      amount: amountFormatted,
      asset: assetId,
      destination: destChain,
      fee,
      feeAsset: feeAssetId,
      palletInstance: palletInstance,
      source: source.chain,
    });

    if (!extrinsicBuilder) return;

    const call = api.tx?.[extrinsicBuilder.module]?.[extrinsicBuilder.func];

    if (!call) return;

    const tx = call(...extrinsicBuilder.getArgs()) as SubmittableExtrinsic;

    const { web3Enable, web3FromAddress } = await import(
      "@polkadot/extension-dapp"
    );

    await web3Enable("polkadex-thea");
    const injector = await web3FromAddress(srcAddress);
    const options = { signer: injector.signer as Signer, nonce: -1 };
    const finalizedTx = await signAndSubmitPromiseWrapper({
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      options,
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      tx,
      address: srcAddress,
      criteria: "IS_FINALIZED",
    });
    console.log("Tx hash =>", finalizedTx.txHash.toString());
  };

  const fromPolkadot = async () => {
    const { web3Enable, web3FromAddress } = await import(
      "@polkadot/extension-dapp"
    );

    const sdkInstance = Sdk();
    await web3Enable("polkadex-thea");
    const injector = await web3FromAddress(srcAddress);
    if (!injector) return;

    const data = await sdkInstance.getTransferData({
      // destinationAddress: evmSigner.address, // If using viem, use evmSigner.account.address
      destinationKeyOrChain: "moonbeam",
      keyOrAsset: "dot",
      polkadotSigner: injector.signer,
      sourceAddress: srcAddress,
      sourceKeyOrChain: "polkadot",
      destinationAddress: destAddress,
      // evmSigner,
    });

    const res = await data.transfer(0.0001);

    console.log(res);
  };

  const crossChainTransferWithSdk = async () => {
    const { web3Enable, web3FromAddress } = await import(
      "@polkadot/extension-dapp"
    );

    await web3Enable("polkadex-thea");
    const injector = await web3FromAddress(srcAddress);
    if (!injector) return;

    const sdkInstance = Sdk({ configService });

    const data = await sdkInstance.getTransferData({
      // destinationAddress: evmSigner.address, // If using viem, use evmSigner.account.address
      destinationKeyOrChain: "polkadot",
      keyOrAsset: "usdt",
      polkadotSigner: injector.signer,
      sourceAddress: srcAddress,
      sourceKeyOrChain: "assethub",
      destinationAddress: destAddress,
      // evmSigner,
    });

    console.log("Transfer data => ", data);

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
