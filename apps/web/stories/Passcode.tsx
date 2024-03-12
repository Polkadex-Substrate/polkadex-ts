import { Button, Passcode as PasscodePolkadex } from "@polkadex/ux";
import { useState } from "react";

export const Passcode = () => {
  const [password, setPassword] = useState("");

  return (
    <div className="flex flex-col gap-4">
      <PasscodePolkadex.Outline
        focusOnInit
        value={password}
        onValuesChange={(e) => setPassword(e)}
        name="password"
        error={password.replace(/\s/g, "") === "00000"}
      />
      <Button.Solid size="sm" onClick={() => setPassword("")}>
        Reset
      </Button.Solid>
    </div>
  );
};
