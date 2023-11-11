import path from "path";

import type { Config } from "tailwindcss";

import { themeConfig } from "../../themeConfig";

export const config: Config = {
  ...themeConfig,
  content: [
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    path.join(
      path.dirname(require.resolve("@polkadex/ux")),
      "**/*.{js,ts,jsx,tsx,mdx}"
    ),
  ],
  plugins: [require("tailwindcss-animate")],
};

export default config;
