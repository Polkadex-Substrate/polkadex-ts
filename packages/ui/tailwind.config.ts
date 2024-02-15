/** @type {import('tailwindcss').Config} */

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
  plugins: [require("tailwindcss-animate")],
};
export default config;
