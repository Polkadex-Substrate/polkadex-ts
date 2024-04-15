import {
  Chain,
  createPublicClient,
  erc20Abi,
  formatEther,
  formatUnits,
  http,
  parseUnits,
  PublicClient,
  SimulateContractReturnType,
} from "viem";
import { sepolia } from "viem/chains";

import { ForeignChain, ForeignNetwork, Transaction } from "../types";

import { ETHEREUM_ASSETS } from "./assets";
import { LINK_CONTRACT, THEA_CONTRACT } from "./contracts";
import { TheaAbi } from "./theaAbi";

export class Sepolia implements ForeignChain<SimulateContractReturnType> {
  id = "ethereum";
  publicClient: PublicClient;
  decimalsCache: Map<string, number> = new Map();
  constructor({ network }: { network?: Chain }) {
    this.publicClient = createPublicClient({
      transport: http(),
      chain: network || sepolia,
    });
  }

  contractFromAssetId(assetId: string): string {
    switch (assetId) {
      case ETHEREUM_ASSETS.LINK:
        return LINK_CONTRACT;
      case ETHEREUM_ASSETS.ETH:
        return "0x0000000";
      default:
        throw new Error(`Unsupported asset id: ${assetId}`);
    }
  }

  async getDecimals(assetId: string): Promise<number> {
    if (this.decimalsCache.has(assetId)) {
      return this.decimalsCache.get(assetId) as number;
    }
    if (assetId === ETHEREUM_ASSETS.ETH) {
      return 18;
    }
    const decimals = await this.publicClient.readContract({
      address: this.contractFromAssetId(assetId) as `0x${string}`,
      abi: erc20Abi,
      functionName: "decimals",
    });
    this.decimalsCache.set(assetId, decimals);
    return decimals;
  }

  async approveTokenTransfer(
    amount: number,
    address: string,
    assetId: string
  ): Promise<SimulateContractReturnType> {
    return await this.publicClient.simulateContract({
      address: this.contractFromAssetId(assetId) as `0x${string}`,
      abi: erc20Abi,
      functionName: "approve",
      args: [
        THEA_CONTRACT as `0x${string}`,
        parseUnits(amount.toString(), await this.getDecimals(assetId)),
      ],
      account: address as `0x${string}`,
    });
  }

  async checkApproval(
    amount: number,
    address: string,
    assetId: string
  ): Promise<boolean> {
    const allowance = await this.publicClient.readContract({
      address: this.contractFromAssetId(assetId) as `0x${string}`,
      abi: erc20Abi,
      functionName: "allowance",
      args: [address as `0x${string}`, THEA_CONTRACT],
    });
    const amt = parseUnits(amount.toString(), await this.getDecimals(assetId));
    return BigInt(allowance) >= BigInt(amt);
  }

  public async createDepositTransaction(
    from: string,
    to: string,
    assetId: string,
    amount: number
  ): Promise<Transaction<SimulateContractReturnType>> {
    // check if balance is enough
    const balance = await this.getBalance(from, assetId);
    if (balance < amount) {
      throw new Error(
        `Insufficient balance, need ${amount} but have ${balance}`
      );
    }
    const tokenContract = this.contractFromAssetId(assetId);

    // if deposit is erc20 then check for approval of token transfer
    if (assetId !== ETHEREUM_ASSETS.ETH) {
      // check if approval is done
      if (!(await this.checkApproval(amount, from, assetId))) {
        throw new Error("Approval not done");
      }
    }
    const decimals = await this.getDecimals(assetId);
    const tx = await this.publicClient.simulateContract({
      address: THEA_CONTRACT as `0x${string}`,
      abi: TheaAbi,
      functionName: "deposit",
      args: [tokenContract, parseUnits(amount.toString(), decimals), to],
      account: from as `0x${string}`,
    });
    return { tx, network: ForeignNetwork.Ethereum };
  }

  public getAllAssets(): string[] {
    // loop through eth assets and return their asset ids
    return Object.values(ETHEREUM_ASSETS);
  }

  public async getBalance(address: string, assetId: string): Promise<number> {
    if (assetId === ETHEREUM_ASSETS.ETH) {
      const balance = await this.publicClient.getBalance({
        address: address as `0x${string}`,
      });
      // format from wei to ether
      return Number(formatEther(balance));
    }

    // get balance of erc20 token
    const balance = await this.publicClient.readContract({
      address: this.contractFromAssetId(assetId) as `0x${string}`,
      abi: erc20Abi,
      functionName: "balanceOf",
      args: [address as `0x${string}`],
    });
    const decimals = await this.getDecimals(assetId);
    return Number(formatUnits(balance, decimals));
  }

  public async claimWithdrawal(
    address: string,
    nonce: number,
    index: number
  ): Promise<Transaction<SimulateContractReturnType>> {
    const tx = await this.publicClient.simulateContract({
      address: THEA_CONTRACT as `0x${string}`,
      abi: TheaAbi,
      functionName: "claimWithdrawal",
      args: [nonce, index],
      account: address as `0x${string}`,
    });
    return { tx, network: ForeignNetwork.Ethereum };
  }

  public getMaxDepositAmount(
    address: string,
    assetId: string
  ): Promise<number> {
    return this.getBalance(address, assetId);
  }

  public getMinDepositAmount(
    _address: string,
    _assetId: string
  ): Promise<number> {
    return Promise.resolve(0);
  }

  public getNativeAssetId(): string {
    return ETHEREUM_ASSETS.ETH;
  }
}
