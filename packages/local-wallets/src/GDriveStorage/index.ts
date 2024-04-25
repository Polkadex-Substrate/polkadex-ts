import { KeyringPair$Json } from "@polkadot/keyring/types";
import { localStorageOrDefault, removeLocalStorage } from "@polkadex/utils";

import { LocalAccountExternalStorage, Token } from "../types";

import { GDriveStorage } from "./GDrive/drive";
import { GoogleDriveAccount } from "./types";
export const GOOGLE_LOCAL_STORAGE_KEY = "gDrive";

export const localToken = localStorageOrDefault(
  GOOGLE_LOCAL_STORAGE_KEY,
  null,
  true
) as Token;

export class GDriveExternalAccountStore implements LocalAccountExternalStorage {
  private initialized = false;
  private list: GoogleDriveAccount<KeyringPair$Json>[] = [];
  private readonly ACCOUNT_PREFIX = "account:";

  id = "google-drive";
  name = "GoogleDrive";
  constructor(apiKey: string, clientId: string) {
    GDriveStorage.setOptions(apiKey, clientId);
  }

  isReady(): boolean {
    return this.initialized;
  }

  async init() {
    try {
      this.list = [];
      const files = await GDriveStorage.getAll();
      const jsons = files
        ?.filter((file) => file?.name?.includes(this.ACCOUNT_PREFIX))
        .map(async (file): Promise<GoogleDriveAccount<KeyringPair$Json>> => {
          return {
            id: file.id as string,
            name: file.name as string,
            description: file.description as string,
            data: await GDriveStorage.get<KeyringPair$Json>(file.id as string),
          };
        });
      this.list = jsons ? await Promise.all(jsons) : [];
      this.initialized = true;
    } catch (error) {
      if (localToken) removeLocalStorage(GOOGLE_LOCAL_STORAGE_KEY);
      throw error;
    }
  }

  async getFiles() {
    if (this.initialized) return this.list;
    await this.init();
    return this.list;
  }

  private async createAccount(key: string, json: KeyringPair$Json) {
    const file = {
      name: key,
      description: json.meta?.name || "",
      json: JSON.stringify(json),
    };
    await GDriveStorage.create(file);
    await this.init();
  }

  async getAll(): Promise<KeyringPair$Json[]> {
    const files = await this.getFiles();
    return files.map((item) => item.data);
  }

  async remove(address: string) {
    const jsons = await this.getFiles();
    const item = jsons.find((item) => item.data.address === address);
    if (item) {
      GDriveStorage.delete(item.id).then(() => {
        this.list = this.list.filter((item) => item.data.address !== address);
      });
    }
  }

  async addFromJson(json: KeyringPair$Json): Promise<void> {
    await this.createAccount(this.ACCOUNT_PREFIX + json.address, json);
  }

  async get(address: string): Promise<KeyringPair$Json> {
    const jsons = await this.getFiles();
    const item = jsons.find((item) => item.data.address === address);
    if (!item)
      throw new Error(`[${this.constructor.name}]: Unable to find account`);
    return item.data;
  }
}
