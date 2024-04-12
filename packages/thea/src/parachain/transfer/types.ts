import { ConfigService } from "@moonbeam-network/xcm-config";
import { SdkTransferParams, TransferData } from "@moonbeam-network/xcm-sdk";

export interface TransferService {
  configService: ConfigService;

  // Gives back full transfer data
  getTransferData(params: SdkTransferParams): Promise<TransferData>;

  // Actually does the transfer and returns the tx hash
  transferAsset(
    transferData: TransferData,
    amount: string | number | bigint
  ): Promise<string>;
}
