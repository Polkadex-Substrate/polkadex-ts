"use client";

import { ComponentProps } from "react";
import { Toaster as Sonner } from "sonner";

export const Toaster = ({ theme, ...props }: ComponentProps<typeof Sonner>) => {
  return (
    <Sonner
      theme={theme}
      className="toaster group"
      toastOptions={{
        classNames: {
          toast:
            "group toast group-[.toaster]:p-3 group-[.toaster]:bg-level-1 group-[.toaster]:border-primary group-[.toaster]:text-primary group-[.toaster]:text-sm",
          description: "group-[.toast]:text-white",
          actionButton:
            "group-[.toast]:bg-primary-base group-[.toast]:hover:bg-primary-hover group-[.toast]:active:bg-primary-pressed group-[.toast]:transition-colors group-[.toast]:duration-300 group-[.toast]:text-medium group-[.toast]:text-xs",
          cancelButton:
            "group-[.toast]:bg-secondary-base group-[.toast]:text-primary group-[.toast]:hover:text-white group-[.toast]:hover:bg-secondary-hover group-[.toast]:active:bg-secondary-pressed group-[.toast]:transition-colors group-[.toast]:duration-300 group-[.toast]:text-medium group-[.toast]:text-xs",
          success: "[&_svg]:text-success-base",
          warning: "[&_svg]:text-attention-base",
          error: "[&_svg]:text-danger-base",
          info: "[&_svg]:text-info-base",
        },
      }}
      {...props}
    />
  );
};
