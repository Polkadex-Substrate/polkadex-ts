import { ExtensionAccount } from "@polkadex/react-providers";
import { ApiPromise } from "@polkadot/api";
import { SubmittableExtrinsic } from "@polkadot/api/types";
import { ISubmittableResult } from "@polkadot/types/types";
import { EventRecord } from "@polkadot/types/interfaces";

type ExtrinsicProps = {
  api: ApiPromise;
  extrinsic: SubmittableExtrinsic<"promise", ISubmittableResult>;
  account: ExtensionAccount;
  waitForFinalization?: boolean;
};

export interface ExtrinsicResult {
  isSuccess: boolean;
  message?: string;
  eventMessages?: EventRecord[];
  hash: string;
}

export const signAndSend = async ({
  api,
  extrinsic,
  account,
  waitForFinalization,
}: ExtrinsicProps) => {
  const signedExt = await extrinsic.signAsync(account.address, {
    signer: account.signer,
  });

  await new Promise<ExtrinsicResult>((resolve, reject) =>
    signedExt.send(({ status, events, dispatchError }) => {
      if (dispatchError) {
        if (dispatchError.isModule) {
          // for module errors, we have the section indexed, lookup
          const decoded = api.registry.findMetaError(dispatchError.asModule);
          const { docs, name, section } = decoded;

          const errMsg = `${section}.${name}: ${docs.join(" ")}`;
          reject(new Error(errMsg));
        } else {
          // Other, CannotLookup, BadOrigin, no extra info
          const errMsg = dispatchError.toString();
          reject(new Error(errMsg));
        }
      } else if (status.isInBlock && waitForFinalization) {
        handleExtrinsicErrors(events, api);
        resolve({
          isSuccess: true,
          eventMessages: events,
          hash: extrinsic.hash.toHex(),
        });
      } else if (status.isFinalized && waitForFinalization) {
        handleExtrinsicErrors(events, api);
        resolve({
          isSuccess: true,
          eventMessages: events,
          hash: extrinsic.hash.toHex(),
        });
      }
    })
  );
};

export const handleExtrinsicErrors = (
  events: EventRecord[],
  api: ApiPromise
) => {
  events
    .filter(({ event }) => api.events.system.ExtrinsicFailed.is(event))
    .forEach(
      ({
        event: {
          data: [error],
        },
      }) => {
        throw Error(`Error: ${error.toHuman()}`);
      }
    );
};
