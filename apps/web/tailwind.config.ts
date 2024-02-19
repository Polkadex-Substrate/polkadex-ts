/** @type {import('tailwindcss').Config} */

import { themeConfig } from "../../themeConfig";

export const config = {
  ...themeConfig,
  content: [
    "./app/*.{js,ts,jsx,tsx,mdx,md}",
    "./app/**/*.{js,ts,jsx,tsx,mdx,md}",
    "./stories/*.{js,ts,jsx,tsx,mdx,md}",
    "!./node_modules",
  ],
  plugins: [require("tailwindcss-animate")],
  darkMode: ["class", '[data-mode="dark"]'],
};
export default config;
