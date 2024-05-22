import { Checkbox as PolkadexCheckbox } from "@polkadex/ux";

export const Checkbox = ({
  type = "Solid",
}: {
  type?: "Outline" | "Solid";
}) => {
  const Comp = PolkadexCheckbox[type];
  return (
    <Comp id="test">
      <PolkadexCheckbox.Label htmlFor="test">
        Checkbox solid
      </PolkadexCheckbox.Label>
    </Comp>
  );
};
