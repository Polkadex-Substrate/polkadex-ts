import {TradingAccountExternalStorage, TradingAccountStore} from "./types";
import {CreateResult} from "@polkadot/ui-keyring/types";
import {KeyringPair, KeyringPair$Json} from "@polkadot/keyring/types";
import {keyring} from "@polkadot/ui-keyring";
import {cryptoWaitReady} from "@polkadot/util-crypto";

export class TradeWallet implements TradingAccountStore {
    private _isInit= false;
    _keyring= keyring;
    constructor() {
        this._keyring = keyring
    }
    public async init(): Promise<void> {
       if (!this._isInit) {
           await cryptoWaitReady();
           this._keyring.loadAll({ ss58Format: 88, type: "sr25519" });
           this._isInit = true;
       }
    }

    public isReady(): boolean {
        return this._isInit
    }

    public add(mnemonic: string, name: string, password: string | undefined): CreateResult {
        return keyring.addUri(mnemonic, password, { name });
    }

    public async addToExternalStorage(json: KeyringPair$Json, store: TradingAccountExternalStorage): Promise<void> {
       await store.add(json);
    }

    public async backupAllToExternalStorage(store: TradingAccountExternalStorage): Promise<void> {
        const accounts = this.getAll();
        const promises = accounts.map((pair) => {
            return this.addToExternalStorage(pair.toJson(), store);

        });
        await Promise.all(promises);
    }

    public getAll(): KeyringPair[] {
        return keyring.getPairs();
    }

    public import(json: KeyringPair$Json, password: string): KeyringPair {
        return keyring.restoreAccount(json, password);
    }

    public remove(address: string): void {
        return keyring.forgetAccount(address);
    }

}