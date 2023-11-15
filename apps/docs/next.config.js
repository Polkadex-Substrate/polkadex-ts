/** @type {import('next').NextConfig} */

// eslint-disable-next-line prettier/prettier, @typescript-eslint/no-var-requires
const withNextra = require("nextra")({
  theme: "nextra-theme-docs",
  themeConfig: "./src/theme.config.js",
  defaultShowCopyCode: true,
  staticImage: true,
  latex: true,
  flexsearch: {
    codeblock: false,
  },
});

const nextConfig = {
  reactStrictMode: false,
  transpilePackages: ["@polkadex/ux", "react-providers"],
};

module.exports = withNextra(nextConfig);
