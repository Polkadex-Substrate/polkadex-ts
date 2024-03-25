import {
  createPublicClient,
  erc20Abi,
  http,
  parseUnits,
  PublicClient,
  SimulateContractReturnType,
} from "viem";
import { sepolia } from "viem/chains";
import { Extrinsic } from "@polkadot/types/interfaces";

import { ForeignChain, ForeignNetwork, Transaction } from "../types";

import { LINK_CONTRACT, THEA_CONTRACT } from "./contracts";
import { TheaAbi } from "./theaAbi";

class Ethereum implements ForeignChain<SimulateContractReturnType> {
  id = "ethereum";
  publicClient: PublicClient;
  constructor() {
    this.publicClient = createPublicClient({
      transport: http(),
      chain: sepolia,
    });
  }

  contractFromAssetId(assetId: string): string {
    switch (assetId) {
      case "0x":
        return LINK_CONTRACT;
      default:
        throw new Error(`Unsupported asset id: ${assetId}`);
    }
  }

  async createDepositTransaction(
    from: string,
    to: string,
    assetId: string,
    amount: number
  ): Promise<Transaction<SimulateContractReturnType>> {
    const tokenContract = this.contractFromAssetId(assetId);
    // TODO: check if balance is enough

    // TODO: check if approval has been done. if not, do it.

    const decimals = await this.publicClient.readContract({
      address: tokenContract as `0x${string}`,
      abi: erc20Abi,
      functionName: "decimals",
    });
    const tx = await this.publicClient.simulateContract({
      address: THEA_CONTRACT as `0x${string}`,
      abi: TheaAbi,
      functionName: "deposit",
      args: [tokenContract, parseUnits(amount.toString(), decimals), to],
      account: from as `0x${string}`,
    });
    return { tx, network: ForeignNetwork.Ethereum };
  }

  getAllAssets(): string[] {
    return [];
  }

  getBalance(address: string, assetId: string): Promise<number> {
    return Promise.resolve(0);
  }

  getMaxDepositAmount(address: string, assetId: string): Promise<number> {
    return Promise.resolve(0);
  }

  getMaxWithdrawAmount(address: string, assetId: string): Promise<number> {
    return Promise.resolve(0);
  }

  getMinAmountTakenForCreation(assetId: string): Promise<number | null> {
    return Promise.resolve(undefined);
  }

  getMinDepositAmount(address: string, assetId: string): Promise<number> {
    return Promise.resolve(0);
  }

  getNativeAssetId(): string {
    return "";
  }

  withdrawTransaction(
    to: string,
    assetId: string,
    amount: number
  ): Promise<Extrinsic> {
    return Promise.resolve(undefined);
  }
}
