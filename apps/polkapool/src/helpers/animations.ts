import { Variants } from "framer-motion";

export const variants: Variants = {
  initial: {
    y: 150,
    opacity: 0.5,
    transition: {
      duration: 0.6,
    },
  },
  animate: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.4,
    },
  },
  exit: {
    opacity: 0.5,
    y: 150,
    transition: {
      duration: 0.8,
    },
  },
};

export const sizeAnimations: Variants = {
  initial: {
    width: 0,
    height: 0,
    opacity: 0.5,
    transition: {
      duration: 0.6,
      ease: "easeOut",
    },
  },
  animate: {
    width: 8,
    height: 8,
    opacity: 1,
    transition: {
      duration: 0.4,
    },
  },
  exit: {
    width: 0,
    height: 0,
    opacity: 0.5,
    transition: {
      duration: 0.8,
    },
  },
};
