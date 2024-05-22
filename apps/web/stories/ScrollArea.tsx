import { ScrollArea as PolkadeScrollArea } from "@polkadex/ux";

const TAGS = Array.from({ length: 50 }).map(
  (_, i, a) => `v1.2.0-beta.${a.length - i}`
);
export interface Artwork {
  artist: string;
  art: string;
}

export const works: Artwork[] = [
  {
    artist: "Ornella Binni",
    art: "https://images.unsplash.com/photo-1465869185982-5a1a7522cbcb?auto=format&fit=crop&w=300&q=80",
  },
  {
    artist: "Tom Byrom",
    art: "https://images.unsplash.com/photo-1548516173-3cabfa4607e9?auto=format&fit=crop&w=300&q=80",
  },
  {
    artist: "Vladimir Malyavko",
    art: "https://images.unsplash.com/photo-1494337480532-3725c85fd2ab?auto=format&fit=crop&w=300&q=80",
  },
];

export const ScrollArea = () => {
  return (
    <div className="flex items-center gap-6">
      <PolkadeScrollArea className="h-72 w-48 rounded-md bg-level-0">
        <div className="p-4">
          <h4 className="mb-4 text-sm font-medium leading-none">Tags</h4>
          {TAGS.map((tag) => (
            <>
              <div key={tag} className="text-sm p-2">
                {tag}
              </div>
            </>
          ))}
        </div>
        <PolkadeScrollArea.Bar />
      </PolkadeScrollArea>
    </div>
  );
};
