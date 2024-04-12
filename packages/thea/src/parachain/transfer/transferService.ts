import { ConfigService } from "@moonbeam-network/xcm-config";
import {
  Sdk,
  SdkTransferParams,
  TransferData,
} from "@moonbeam-network/xcm-sdk";

import { chainsConfigMap, assetsMap, chainsMap } from "../";

import { TransferService } from "./types";

export const configService = new ConfigService({
  assets: assetsMap,
  chains: chainsMap,
  chainsConfig: chainsConfigMap,
});

export class ParachainTransferService implements TransferService {
  configService: ConfigService;
  private sdkInstance;

  constructor() {
    this.configService = configService;
    this.sdkInstance = Sdk({ configService });
  }

  async getTransferData(params: SdkTransferParams): Promise<TransferData> {
    const sourceChain = configService.getChain(params.sourceKeyOrChain);
    if (sourceChain.key === "polkadex") {
      throw new Error(
        "Not supported for transfer from polkadex to other chains.."
      );
    }
    return await this.sdkInstance.getTransferData(params);
  }

  async transferAsset(
    transferData: TransferData,
    amount: string | number | bigint
  ): Promise<string> {
    return await transferData.transfer(amount);
  }
}
