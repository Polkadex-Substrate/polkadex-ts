import { ConfigService } from "@moonbeam-network/xcm-config";
import { SdkTransferParams, TransferData } from "@moonbeam-network/xcm-sdk";

export interface TransferService {
  configService: ConfigService;

  getTransferData(params: SdkTransferParams): Promise<TransferData>;

  transferAsset(
    transferData: TransferData,
    amount: string | number | bigint
  ): Promise<string>;
}
