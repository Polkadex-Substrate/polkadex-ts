import { Button, Passcode } from "@polkadex/ux";
import { useState } from "react";

export const Input = () => {
  const [password, setPassword] = useState("");

  return (
    <div className="flex flex-col gap-4">
      <Passcode.Outline
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
