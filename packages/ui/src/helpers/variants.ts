import { themeConfig } from "../../../../themeConfig";

export const placements = [
  "center",
  "center left",
  "center right",
  "top center",
  "top left",
  "top right",
  "bottom center",
  "bottom left",
  "bottom right",
] as const;

export const placementsStyles = {
  center: "top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2",
  "center left":
    "top-1/2 left-0 transform -translate-y-1/2 data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%] data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%]",
  "center right":
    "top-1/2 right-0 transform -translate-y-1/2 data-[state=closed]:slide-out-to-right-1/2 data-[state=closed]:slide-out-to-top-[48%] data-[state=open]:slide-in-from-right-1/2 data-[state=open]:slide-in-from-top-[48%]",
  "top center": "top-0 left-1/2 transform -translate-x-1/2",
  "top left": "top-0 left-0",
  "top right": "top-0 right-0",
  "bottom center": "bottom-0 left-1/2 transform -translate-x-1/2",
  "bottom left": "bottom-0 left-0",
  "bottom right": "bottom-0 right-0",
};

export const appearanceVariantsClasses = {
  base: "text-white",
  "primary-base": "text-primary-base",
  primary: "text-primary",
  secondary: "text-secondary",
  tertiary: "text-tertiary-base",
  placeholder: "text-placeholder",
  actionInput: "text-actionInput",
  disabled: "text-disabled",
  danger: "text-danger-base",
  success: "text-success-base",
  attention: "text-attention-base",
  info: "text-info-base",
};
export type AppearanceVariants = keyof typeof appearanceVariantsClasses;

export const fontSizeClasses = {
  "3xs": "text-3xs",
  "2xs": "text-2xs",
  xs: "text-xs",
  sm: "text-sm",
  base: "text-base",
  md: "text-md",
  lg: "text-lg",
  xl: "text-xl",
  "2xl": "text-2xl",
  "3xl": "text-3xl",
  "4xl": "text-4xl",
  "5xl": "text-5xl",
  "6xl": "text-6xl",
  "7xl": "text-7xl",
  "8xl": "text-8xl",
  "9xl": "text-9xl",
  "10xl": "text-10xl",
  "11xl": "text-11xl",
};

export const tokenAppearance = {
  PHA: "bg-black",
  USDT: "bg-usdt",
  PDEX: "bg-level-1",
  GLMR: "bg-level-1",
  DOT: "bg-dot",
  ASTR: "bg-level-1",
  IBTC: "bg-white",
  USDC: "bg-level-1",
  UNQ: "bg-level-1",
  DED: "bg-level-1",
  PINK: "bg-level-1",
  UNKN: "bg-white",
};

export type TokenAppearance = keyof typeof tokenAppearance;

export const sizesVariants = {
  "2xs": "h-5 w-5 p",
  xs: "h-6 w-6 p-0.5",
  sm: "h-7 w-7 p-1",
  md: "h-8 w-8 p-1",
  lg: "h-10 w-10 p-1",
  xl: "h-12 w-12 p-1",
  "2xl": "h-14 w-14 p-1",
  "3xl": "h-16 w-16 p-1.5",
};

export type SizesVariants = keyof typeof sizesVariants;

export const appearanceBackground = themeConfig.theme.extend.backgroundColor;
export type AppearanceBackgroundVariants = keyof typeof appearanceBackground;

export const appearanceText = themeConfig.theme.extend.colors;
export type AppearanceTextVariants = keyof typeof appearanceText;
