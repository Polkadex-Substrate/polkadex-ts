"use client";

import dynamic from "next/dynamic";

const Pools = dynamic(() => import("@/screens").then((mod) => mod.Pools), {
  ssr: false,
});
export default function Page() {
  return <Pools />;
}
