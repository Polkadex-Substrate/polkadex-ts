"use client";

import "./globals.scss";

import { Inter } from "next/font/google";
import classNames from "classnames";
import { ReactNode } from "react";

const font = Inter({ subsets: ["latin"] });

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body
        className={classNames(
          font.className,
          "flex flex-col max-h-screen min-h-screen mx-auto border-x border-primary overflow-x-hidden"
        )}
      >
        {children}
      </body>
    </html>
  );
}
