import Keyring from "@polkadot/keyring";
import { localStorageOrDefault } from "@polkadex/utils";

// Gets local `active_acount` for a network.
export const getActiveAccountLocal = (network: string, ss58: number) => {
  const keyring = new Keyring();
  keyring.setSS58Format(ss58);
  let account = localStorageOrDefault(`${network}_active_account`, null);
  if (account !== null) {
    account = keyring.addFromAddress(account).address;
  }
  return account;
};

// Adds an extension to local `active_extensions`.
export const addToLocalExtensions = (id: string) => {
  const localExtensions = localStorageOrDefault<string[]>(
    `active_extensions`,
    [],
    true
  );
  if (Array.isArray(localExtensions)) {
    if (!localExtensions.includes(id)) {
      localExtensions.push(id);
      localStorage.setItem(
        "active_extensions",
        JSON.stringify(localExtensions)
      );
    }
  }
};

// Check if an extension exists in local `active_extensions`.
export const extensionIsLocal = (id: string) => {
  const localExtensions = localStorageOrDefault<string[]>(
    `active_extensions`,
    [],
    true
  );
  let foundExtensionLocally = false;
  if (Array.isArray(localExtensions)) {
    foundExtensionLocally = localExtensions.find((l) => l === id) !== undefined;
  }
  return foundExtensionLocally;
};

// Removes extension from local `active_extensions`.
export const removeFromLocalExtensions = (id: string) => {
  let localExtensions = localStorageOrDefault<string[]>(
    `active_extensions`,
    [],
    true
  );
  if (Array.isArray(localExtensions)) {
    localExtensions = localExtensions.filter((l: string) => l !== id);
    localStorage.setItem("active_extensions", JSON.stringify(localExtensions));
  }
};
