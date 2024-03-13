/** @type {import('tailwindcss').Config} */

import plugin from "tailwindcss/plugin";

import { themeConfig } from "../../themeConfig";

export const config = {
  ...themeConfig,
  content: [
    "./src/components/*.{js,ts,jsx,tsx,mdx,md}",
    "./src/icons/*.{js,ts,jsx,tsx,mdx,md}",
    "./src/illustrations/*.{js,ts,jsx,tsx,mdx,md}",
    "./src/tokens/*.{js,ts,jsx,tsx,mdx,md}",
    "./src/plugAndPlay/**/*.{js,ts,jsx,tsx,mdx,md}",
    "./src/readyToUse/**/*.{js,ts,jsx,tsx,mdx,md}",
    "./src/helpers/*.{js,ts,jsx,tsx,mdx,md}",
  ],
  plugins: [
    require("tailwindcss-animate"),
    plugin(function ({ addUtilities, addBase, theme }) {
      addBase({
        html: { color: theme("colors.white") },
      });
      addUtilities({
        ".scrollbar-hide": {
          "-ms-overflow-style": "none",
          "scrollbar-width": "none",
          "&::-webkit-scrollbar": {
            display: "none",
          },
        },
      });
    }),
  ],
};
export default config;
