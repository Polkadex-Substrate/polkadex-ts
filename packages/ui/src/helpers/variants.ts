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
  "center left": "top-1/2 left-0 transform -translate-y-1/2",
  "center right": "top-1/2 right-0 transform translate-x-1/2 -translate-y-1/2",
  "top center": "top-0 left-1/2 transform -translate-x-1/2",
  "top left": "top-0 left-0",
  "top right": "top-0 right-0",
  "bottom center": "bottom-0 left-1/2 transform -translate-x-1/2",
  "bottom left": "bottom-0 left-0",
  "bottom right": "bottom-0 right-0",
};

export const appearanceVariants = {
  base: "text-current",
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

export const fontSizes = {
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
  PDEX: "bg-transparent",
  GLMR: "bg-transparent",
  DOT: "bg-dot",
  ASTR: "bg-transparent",
  IBTC: "bg-white",
};
