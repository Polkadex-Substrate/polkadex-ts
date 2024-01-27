import { CreateResult } from "@polkadot/ui-keyring/types";
import { KeyringPair, KeyringPair$Json } from "@polkadot/keyring/types";
import { keyring } from "@polkadot/ui-keyring";
import { cryptoWaitReady } from "@polkadot/util-crypto";

import { LocalAccountStore, LocalAccountExternalStorage } from "./types";

export class BrowserWallet implements LocalAccountStore {
  _keyring = keyring;
  private _isInit = false;

  constructor() {
    this._keyring = keyring;
  }

  public async init(): Promise<void> {
    if (this._isInit) {
      return;
    }
    await cryptoWaitReady();
    this._keyring.loadAll({ ss58Format: 88, type: "sr25519" });
    this._isInit = true;
  }

  public isReady(): boolean {
    return this._isInit;
  }

  add(pair: KeyringPair, password: string): CreateResult {
    return this._keyring.addPair(pair, password);
  }

  public addFromMnemonic(
    mnemonic: string,
    name: string,
    password: string | undefined
  ): CreateResult {
    return keyring.addUri(mnemonic, password, { name });
  }

  public async addToExternalStorage(
    json: KeyringPair$Json,
    store: LocalAccountExternalStorage
  ): Promise<void> {
    await store.addFromJson(json);
  }

  public async backupAllToExternalStorage(
    store: LocalAccountExternalStorage
  ): Promise<void> {
    const accounts = this.getAll();
    const promises = accounts.map((pair) => {
      return this.addToExternalStorage(pair.toJson(), store);
    });
    await Promise.all(promises);
  }

  public getAll(): KeyringPair[] {
    return keyring.getPairs();
  }

  public getPair(address: string): KeyringPair | undefined {
    return keyring.getPair(address);
  }

  public import(json: KeyringPair$Json, password: string): KeyringPair {
    return keyring.restoreAccount(json, password);
  }

  public remove(address: string): void {
    return keyring.forgetAccount(address);
  }

  public subscribeAddresses(cb: (addresses: string[]) => void): void {
    keyring.accounts.subject.subscribe((item) => {
      const allAddress: string[] = [];
      for (const key in item) {
        allAddress.push(key);
      }
      cb(allAddress);
    });
  }

  isLocked(address: string): boolean {
    return keyring.getPair(address)?.isLocked;
  }

  sign(address: string, data: Uint8Array | string): Uint8Array | undefined {
    const pair = keyring.getPair(address);
    return pair ? pair.sign(data) : undefined;
  }
}
