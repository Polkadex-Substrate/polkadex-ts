import path from "path";

import type { Config } from "tailwindcss";

import { themeConfig } from "../../themeConfig";

export const config: Config = {
  ...themeConfig,
  content: [
    "./src/components/**/*.{js,ts,jsx,tsx,mdx,md}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx,md}",
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx,md}",
    "./src/**/*.{js,jsx,ts,tsx,md,mdx}",
    path.join(
      path.dirname(require.resolve("@polkadex/ux")),
      "**/*.{js,ts,jsx,tsx,mdx,md}"
    ),
  ],
  plugins: [require("tailwindcss-animate")],
};

export default config;
