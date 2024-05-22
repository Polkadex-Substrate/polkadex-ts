import { ToggleGroup as PolkadeToggleGroup } from "@polkadex/ux";

export const ToggleGroup = () => {
  return (
    <PolkadeToggleGroup type="single">
      <PolkadeToggleGroup.Item value="all">All</PolkadeToggleGroup.Item>
      <PolkadeToggleGroup.Item value="recent">Recent</PolkadeToggleGroup.Item>
    </PolkadeToggleGroup>
  );
};
