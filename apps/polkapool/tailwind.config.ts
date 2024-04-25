/** @type {import('tailwindcss').Config} */

import type { Config } from "tailwindcss";
import plugin from "tailwindcss/plugin";

export const common = {
  "primary-base": "#E6007A",
  "primary-hover": "#EA268E",
  "primary-pressed": "#9F005F",
  "primary-ghost": "#EA268E22",
  "primary-disabled": "#2B303A",
  "secondary-base": "#252932",
  "secondary-hover": "#3D4452",
  "secondary-pressed": "#454E5E",
  "tertiary-base": "#343A46",
  "tertiary-hover": "#373E4A",
  "tertiary-pressed": "#2B303A",
  "danger-base": "#EB5757",
  "danger-hover": "#EE6D6D",
  "danger-pressed": "#A41313",
  "success-base": "#02B671",
  "success-hover": "#02CA7D",
  "success-pressed": "#018D58",
  "attention-base": "#F08205",
  "attention-hover": "#FA8C0F",
  "attention-pressed": "#DC7704",
  "info-base": "#077EED",
  "info-hover": "#4DA6F9",
  "info-pressed": "#065FB2",
};

const commonBg = {
  "level-0": "#0D0D10",
  "level-1": "#131419",
  "level-2": "#252932",
  "level-3": "#1F2229",
  "level-4": "#2B303A",
  "level-5": "#3D4452",
};

const overlay = {
  "overlay-1": "#0000007F",
  "overlay-2": "#00000033",
  "overlay-3": "#000000CC",
};

const border = {
  primary: "#1F2229",
  secondary: "#2B303A",
  tertiary: "#343A46",
};

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/screens/**/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      screens: {
        "1xl": "1380px",
      },
      minHeight: {
        webKit: "-webkit-fill-available",
      },
      height: {
        webKit: "-webkit-fill-available",
      },
      backgroundImage: {
        "hero-pattern": "url('/heroMask.svg')",
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
        skeleton: `linear-gradient(
            -90deg,
            rgba(255, 255, 255, 0.1) 0%,
            rgba(255, 255, 255, 0.12) 25%,
            rgba(255, 255, 255, 0.20) 50%,
            rgba(255, 255, 255, 0.14) 75%,
            rgba(255, 255, 255, 0.1) 100%
          )`,
        grayscale: `linear-gradient(272.45deg, rgba(139, 161, 190, 0.1) -0.85%, rgba(139, 161, 190, 0) 81.69%);
          `,
      },
      colors: {
        ...common,
        textBase: "#FFFFFF",
        primary: "#8B909A",
        secondary: "#575A60",
        placeholder: "#FFFFFF7F",
        actionInput: "#FFFFFF33",
        disabled: "#2B303A",
      },
      backgroundColor: {
        ...common,
        ...commonBg,
        ...overlay,
        backgroundBase: "#06070A",
      },
      outlineColor: {
        ...common,
      },
      backgroundSize: {
        skeletonSize: "400% 400%",
      },
      fill: {
        ...common,
        ...commonBg,
      },
      boxShadow: {
        baseShadow: "0px 20px 23px rgba(0, 0, 0, 0.05)",
      },
      borderColor: {
        ...common,
        ...commonBg,
        ...border,
      },
      backdropBlur: {
        primary: "5px",
        secondary: "40px",
      },
      maxWidth: {
        "8xl": "90rem",
      },
      fontSize: {
        heading: "0.95rem",
        md: "0.9rem",
        base: "0.80rem",
      },
      animation: {
        infiniteHorizontalScroll: "30s linear infinite infiniteHorizontal ",
        skeletonAnimation:
          "skeletonPulse 2s cubic-bezier(0.2, 0.8, 0.2, 1) infinite",
        accordionDown: "accordionDown 300ms cubic-bezier(0.87, 0, 0.13, 1)",
        accordionUp: "accordionUp 300ms cubic-bezier(0.87, 0, 0.13, 1)",
      },
      keyframes: {
        infiniteHorizontal: {
          from: {
            transform: "translate3d(0px, 0px, 0px)",
          },
          to: {
            transform: "translate3d(-50%, 0px, 0px)",
          },
        },
        skeletonPulse: {
          from: {
            backgroundPosition: "0% 0%",
          },
          to: {
            backgroundPosition: "-135% 0%",
          },
        },
        accordionDown: {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        accordionUp: {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
      },
    },
  },
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
  corePlugins: {
    preflight: false,
  },
};
export default config;
