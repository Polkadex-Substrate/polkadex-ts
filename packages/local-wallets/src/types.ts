import { CreateResult } from "@polkadot/ui-keyring/types";
import { KeyringPair, KeyringPair$Json } from "@polkadot/keyring/types";

interface Base {
  init: () => Promise<void>;
  isReady: () => boolean;
}
export interface LocalAccountExternalStorage extends Base {
  id: string;
  getAll(): Promise<KeyringPair$Json[]>;
  get(address: string): Promise<KeyringPair$Json>;
  add(json: KeyringPair$Json): Promise<void>;
  remove(address: string): Promise<void>;
}

export interface LocalAccountStore extends Base {
  import(json: KeyringPair$Json, password: string): KeyringPair;
  remove(address: string): void;
  getAll(): KeyringPair[];
  getPair(address: string): KeyringPair | undefined;
  isLocked(address: string): boolean;
  sign(address: string, data: Uint8Array | string): Uint8Array | undefined;
  add(
    mnemonic: string,
    name: string,
    password: string | undefined
  ): CreateResult;
  addToExternalStorage(
    json: KeyringPair$Json,
    store: LocalAccountExternalStorage
  ): Promise<void>;
  backupAllToExternalStorage(store: LocalAccountExternalStorage): Promise<void>;
  subscribeAddresses(cb: (addresses: string[]) => void): void;
}
