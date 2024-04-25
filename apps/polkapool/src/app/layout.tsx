import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.scss";
import "@polkadex/ux/dist/index.css";
import classNames from "classnames";
import { ReactNode } from "react";

import { DynamicProvider } from "@/providers";

const font = Inter({ subsets: ["latin"] });
export const metadata: Metadata = {
  title: "Connect for Decentralized Swaps",
  description:
    "Polkapool offers a user-friendly platform for effortless decentralized asset swaps.",
};
export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body
        className={classNames(
          "relative flex min-h-screen flex-col bg-backgroundBase",
          font.className
        )}
      >
        <DynamicProvider>
          <main className="relative flex-1 flex items-center justify-center md:p-24 max-md:p-2 max-md:pb-6">
            {children}
            {/* <div className="max-lg:hidden z-[-1] absolute w-full bottom-0 h-2/3 bg-hero-pattern bg-no-repeat bg-bottom bg-contain" /> */}
          </main>
        </DynamicProvider>
      </body>
    </html>
  );
}
