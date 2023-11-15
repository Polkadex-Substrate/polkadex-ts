/* eslint sort-keys: error */
/**
 * @type {import('nextra-theme-docs').DocsThemeConfig}
 */
import { Logo } from "@polkadex/ux";

import { Footer } from "./components";

export default {
  docsRepositoryBase: "https://github.com/Polkadex-Substrate/Polkadex-UI",
  editLink: {
    text: "Edit this page on GitHub",
  },
  faviconGlyph: "✦",
  footer: {
    text: <Footer />,
  },
  logo: (
    <div style={{ width: 70 }}>
      <Logo.Ux />
    </div>
  ),
  project: {
    link: "https://github.com/Polkadex-Substrate/polkadex-ts/tree/main/packages/ui",
  },
  // primaryHue: 100,
  // primarySaturation: 200,
  useNextSeoProps() {
    return {
      additionalLinkTags: [
        {
          href: "/apple-icon-180x180.png",
          rel: "apple-touch-icon",
          sizes: "180x180",
        },
        {
          href: "/android-icon-192x192.png",
          rel: "icon",
          sizes: "192x192",
          type: "image/png",
        },
        {
          href: "/favicon-96x96.png",
          rel: "icon",
          sizes: "96x96",
          type: "image/png",
        },
        {
          href: "/favicon-32x32.png",
          rel: "icon",
          sizes: "32x32",
          type: "image/png",
        },
        {
          href: "/favicon-16x16.png",
          rel: "icon",
          sizes: "16x16",
          type: "image/png",
        },
      ],
      additionalMetaTags: [
        { content: "en", httpEquiv: "Content-Language" },
        { content: "Polkadex UX", name: "apple-mobile-web-app-title" },
        { content: "#fff", name: "msapplication-TileColor" },
        { content: "/ms-icon-144x144.png", name: "msapplication-TileImage" },
      ],
      description: "The complete Polkadex development tools.",
      openGraph: {
        images: [{ url: "https://polkadex.trade/twitterCardImage.jpg" }],
      },
      titleTemplate: "%s – Polkadex UX",
      twitter: {
        cardType: "summary_large_image",
        site: "https://polkadex.trade",
      },
    };
  },
};
