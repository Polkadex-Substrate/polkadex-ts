import {} from "@polkadex/thea";

const fromChain = "assethub";
const toChain = "polkadex";

const senderAddr = "15GYTpDWPEvbnkDqJeyqNQREKXUfXPcAvK8wJP48QrmAW8wL";
const destinationAddr = "esq2wFkRsic8WM4nstAtkjqWdCDnTrGHMpFjaGN2rEHnQXUNm";
const amount = 0.001;

export default function Home() {
  const crossChainTransfer = async () => {};

  return (
    <div className="flex flex-col items-center justify-center">
      <h1 className="text-3xl text-center my-4 text-blue-500 underline underline-offset-[5px] decoration-dashed">
        XCM transfer with Paraspell {"<>"} PoC
      </h1>
      <p className="text-lg">Sending AssetHub to Polkadex for {amount} USDT</p>
      <button
        className="bg-yellow-50 text-black px-4 py-2 my-4"
        onClick={crossChainTransfer}
      >
        Send Tx
      </button>
    </div>
  );
}
