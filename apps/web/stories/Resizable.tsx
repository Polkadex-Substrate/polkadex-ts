import { Resizable as PolkadeResizable } from "@polkadex/ux";

export const Resizable = () => {
  return (
    <div className="w-[500px]">
      <PolkadeResizable
        direction="horizontal"
        className="min-h-[400px] w-[400px] rounded-md bg-level-0 border border-primary"
      >
        <PolkadeResizable.Panel defaultSize={30} minSize={20}>
          <div className="flex h-full items-center justify-center p-6">
            <span className="font-semibold">Example 1</span>
          </div>
        </PolkadeResizable.Panel>
        <PolkadeResizable.Handle />
        <PolkadeResizable.Panel defaultSize={30} minSize={29}>
          <PolkadeResizable direction="vertical">
            <PolkadeResizable.Panel defaultSize={30} minSize={20}>
              <div className="flex h-full items-center justify-center p-6">
                <span className="font-semibold">Example 2</span>
              </div>
            </PolkadeResizable.Panel>
            <PolkadeResizable.Handle />
            <PolkadeResizable.Panel defaultSize={30} minSize={29}>
              <div className="flex h-full items-center justify-center p-6">
                <span className="font-semibold">Example 3</span>
              </div>
            </PolkadeResizable.Panel>
          </PolkadeResizable>
        </PolkadeResizable.Panel>
      </PolkadeResizable>
    </div>
  );
};
