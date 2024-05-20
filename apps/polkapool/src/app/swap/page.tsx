"use client";

import dynamic from "next/dynamic";

const Swap = dynamic(() => import("@/screens").then((mod) => mod.Swap), {
  ssr: false,
});
export default function Page() {
  return <Swap />;
}
