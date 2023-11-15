import type { AppProps } from "next/app";
import type { ReactElement } from "react";
import "../styles/globals.scss";
export default function Nextra({
  Component,
  pageProps,
}: AppProps): ReactElement {
  return <Component {...pageProps} />;
}
