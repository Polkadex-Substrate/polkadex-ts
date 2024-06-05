import { Input as PolkadeInput } from "@polkadex/ux";
import { useState } from "react";

export const Input = () => {
  const [price, setPrice] = useState("0");
  return (
    <div className="w-96">
      <PolkadeInput.Primary
        name={"Price"}
        type="text"
        placeholder="0.00"
        autoComplete="off"
        value={price}
        onChange={(e) => setPrice(e.target.value)}
      >
        <PolkadeInput.Label size="xs">Price</PolkadeInput.Label>
        <PolkadeInput.Ticker>PDEX</PolkadeInput.Ticker>
        <PolkadeInput.Button
          variant="increase"
          onClick={() => setPrice(String(Number(price) + 1))}
        />
        <PolkadeInput.Button
          variant="decrease"
          onClick={() => setPrice(String(Number(price) - 1))}
        />
      </PolkadeInput.Primary>
    </div>
  );
};
