/** @type {import('tailwindcss').Config} */

import plugin from "tailwindcss/plugin";

import { themeConfig } from "../../themeConfig";

export const config = {
  ...themeConfig,
  content: [
    "./app/*.{js,ts,jsx,tsx,mdx,md}",
    "./app/**/*.{js,ts,jsx,tsx,mdx,md}",
    "./stories/*.{js,ts,jsx,tsx,mdx,md}",
    "!./node_modules",
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
  darkMode: ["class", '[data-mode="dark"]'],
};
export default config;
