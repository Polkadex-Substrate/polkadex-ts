import { Interaction, Typography } from "../../components";
import { WalletNotFound } from "../../illustrations";
import { WalletCard } from "../../readyToUse";

export const Wallets = ({
  wallets = [
    {
      name: "Orderbook Testing",
      address: "5GC6vwNE8FdToic5iVKnrZrycMLnGJBJVSdXcnqrMbDs1LJC",
    },
    {
      name: "Thea Testing",
      address: "5Toic5iVKnrZryToic5iVKnrZrycMLnGJBJVSdXcnVKnrZry",
    },
  ],
}) => {
  const hasWallet = !!wallets?.length;
  return (
    <Interaction className="gap-10">
      {hasWallet && (
        <Interaction.Title onClose={() => window.alert("Close")}>
          Select funding wallet
        </Interaction.Title>
      )}
      <Interaction.Content
        className="flex flex-col gap-1 flex-1"
        withPadding={false}
      >
        {!hasWallet ? (
          <div className="flex flex-col gap-10 items-center">
            <div className="max-w-[13rem]">
              <WalletNotFound className="w-full text-disabled" />
            </div>
            <div className="flex flex-col items-center gap-1">
              <Typography.Text bold size="lg">
                No wallets found
              </Typography.Text>
              <Typography.Text variant="primary">
                Oops, it looks like you don&apos;t have any wallet.
              </Typography.Text>
            </div>
          </div>
        ) : (
          <div className="min-h-[15rem]">
            <Typography.Text variant="secondary" size="xs" className="px-7 ">
              Available wallets
            </Typography.Text>
            <div className="flex flex-col px-3 max-h-[20rem] overflow-hidden hover:overflow-auto">
              {wallets.map((value, i) => (
                <WalletCard key={i} name={value.name} address={value.address} />
              ))}
            </div>
          </div>
        )}
      </Interaction.Content>
      <Interaction.Footer>
        <Interaction.Action variant="secondary">
          {hasWallet ? "Refresh" : "Try again"}
        </Interaction.Action>
        <Interaction.Close>Connect other wallet</Interaction.Close>
      </Interaction.Footer>
    </Interaction>
  );
};
