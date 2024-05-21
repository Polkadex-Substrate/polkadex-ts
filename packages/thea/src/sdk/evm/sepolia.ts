import {
  createPublicClient,
  http,
  erc20Abi,
  formatEther,
  formatUnits,
  parseUnits,
  PublicClient,
  SimulateContractReturnType,
} from "viem";
import { sepolia } from "viem/chains";
import { u8aToHex } from "@polkadot/util";
import { Keyring } from "@polkadot/keyring";

import {
  THEA_CONTRACT,
  LINK_CONTRACT,
  ETHEREUM_ASSETS,
  Asset,
  Chain,
  changeSubstrateToBaseChain,
  sepolia as sepoliaChain,
  polkadex,
} from "../../config";
import { AssetAmount, EVMChainAdapter, TransferConfig } from "../types";

import { TheaAbi } from "./theaAbi";

export class Sepolia implements EVMChainAdapter {
  private id = "ethereum";
  private publicClient: PublicClient;
  private decimalsCache: Map<string, number> = new Map();

  constructor() {
    this.publicClient = createPublicClient({
      transport: http(),
      chain: sepolia,
    });
  }

  getChain(): Chain {
    return sepoliaChain;
  }

  getSupportedAssets(): Asset[] {
    return [ETHEREUM_ASSETS.ETH, ETHEREUM_ASSETS.LINK];
  }

  getDestinationChains(): Chain[] {
    const substrate_chains = [polkadex].map((c) =>
      changeSubstrateToBaseChain(c)
    );
    return [...substrate_chains];
  }

  async getTransferConfig(
    destChain: Chain,
    asset: Asset,
    fromAddress: string,
    toAddress: string
  ): Promise<TransferConfig> {
    const sourceFeeToken = ETHEREUM_ASSETS.ETH;
    const destFeeToken = ETHEREUM_ASSETS.ETH;
    const sourceChain = this.getChain();
    const assetBalance = await this.getBalance(fromAddress, asset.id as string);

    const nativeTokenBalance = await this.getBalance(
      fromAddress,
      sourceFeeToken.id as string
    );

    const min: AssetAmount = {
      amount: 0,
      ticker: asset.ticker,
    };

    const max: AssetAmount = {
      amount: assetBalance,
      ticker: asset.ticker,
    };

    const gasPrice = await this.publicClient.getGasPrice();
    const gasLimit = await this.publicClient.estimateGas({});
    const transactionFee = +formatUnits(gasPrice * gasLimit, asset.decimal);

    const sourceFee: AssetAmount = {
      amount: transactionFee,
      ticker: sourceFeeToken.ticker,
    };

    const destinationFee: AssetAmount = {
      amount: 0,
      ticker: destFeeToken.ticker,
    };

    const sourceFeeBalance: AssetAmount = {
      amount: nativeTokenBalance,
      ticker: sourceFeeToken.ticker,
    };

    // TODO: Calculate balance for fee token of selected asset
    const destinationFeeBalance: AssetAmount = {
      amount: 0,
      ticker: destFeeToken.ticker,
    };

    return {
      sourceChain,
      destinationChain: destChain,
      min,
      max,
      sourceFee,
      destinationFee,
      sourceFeeBalance,
      destinationFeeBalance,

      transfer: async <SimulateContractReturnType>(
        amount: number
      ): Promise<SimulateContractReturnType> =>
        await this.transfer(
          destChain,
          asset.id as string,
          fromAddress,
          toAddress,
          amount
        ),
    };
  }

  async approveTokenTransfer<SimulateContractReturnType>(
    amount: number,
    address: string,
    assetId: string
  ): Promise<SimulateContractReturnType> {
    return (await this.publicClient.simulateContract({
      address: this.contractFromAssetId(assetId) as `0x${string}`,
      abi: erc20Abi,
      functionName: "approve",
      args: [
        THEA_CONTRACT as `0x${string}`,
        parseUnits(amount.toString(), await this.getDecimals(assetId)),
      ],
      account: address as `0x${string}`,
    })) as SimulateContractReturnType;
  }

  async claimWithdrawal<SimulateContractReturnType>(
    address: string,
    nonce: number,
    index: number
  ): Promise<SimulateContractReturnType> {
    const tx = await this.publicClient.simulateContract({
      address: THEA_CONTRACT as `0x${string}`,
      abi: TheaAbi,
      functionName: "claimWithdrawal",
      args: [nonce, index],
      account: address as `0x${string}`,
    });
    return tx as SimulateContractReturnType;
  }

  async getBalances(address: string, assets: Asset[]): Promise<AssetAmount[]> {
    const balances = assets.map(async (a): Promise<AssetAmount> => {
      const amount = await this.getBalance(address, a.id as string);
      return {
        amount,
        ticker: a.ticker,
      };
    });
    return Promise.all(balances);
  }

  // ------------------------------------------------------------ //

  private async transfer<T>(
    destChain: Chain,
    assetId: string,
    fromAddress: string,
    toAddress: string,
    amount: number
  ): Promise<T> {
    const keyring = new Keyring();
    const encodedToAddress = u8aToHex(keyring.decodeAddress(toAddress));
    return (await this.createDepositTransaction(
      fromAddress,
      encodedToAddress,
      assetId,
      amount
    )) as T;
  }

  private contractFromAssetId(assetId: string): string {
    switch (assetId) {
      case ETHEREUM_ASSETS.LINK.id:
        return LINK_CONTRACT;
      case ETHEREUM_ASSETS.ETH.id:
        return "0x0000000";
      default:
        throw new Error(`Unsupported asset id: ${assetId}`);
    }
  }

  private async getDecimals(assetId: string): Promise<number> {
    if (this.decimalsCache.has(assetId)) {
      return this.decimalsCache.get(assetId) as number;
    }
    if (assetId === ETHEREUM_ASSETS.ETH.id) {
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

  private async checkApproval(
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

  private async createDepositTransaction(
    fromAddress: string,
    toAddress: string,
    assetId: string,
    amount: number
  ): Promise<SimulateContractReturnType> {
    // check if balance is enough
    const balance = await this.getBalance(fromAddress, assetId);
    if (balance < amount) {
      throw new Error(
        `Insufficient balance, need ${amount} but have ${balance}`
      );
    }
    const tokenContract = this.contractFromAssetId(assetId);

    // if deposit is erc20 then check for approval of token transfer
    if (assetId !== ETHEREUM_ASSETS.ETH.id) {
      // check if approval is done
      if (!(await this.checkApproval(amount, fromAddress, assetId))) {
        throw new Error("Approval not done");
      }
    }
    const decimals = await this.getDecimals(assetId);
    const tx = await this.publicClient.simulateContract({
      address: THEA_CONTRACT as `0x${string}`,
      abi: TheaAbi,
      functionName: "deposit",
      args: [tokenContract, parseUnits(amount.toString(), decimals), toAddress],
      account: fromAddress as `0x${string}`,
    });
    return tx;
  }

  private async getBalance(address: string, assetId: string): Promise<number> {
    if (assetId === ETHEREUM_ASSETS.ETH.id) {
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
}
