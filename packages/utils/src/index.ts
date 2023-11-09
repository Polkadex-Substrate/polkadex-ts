import {AnyFunction, AnyJson} from "./types";

export const withTimeout = (fn: AnyFunction, args: AnyJson, timeout: number) => {
    return new Promise((resolve, reject) => {
        fn(...args).then(resolve, reject);
        setTimeout(() => {
            reject();
        }, timeout);
    });
};