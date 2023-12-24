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
            "group toast group-[.toaster]:bg-level-1 group-[.toaster]:border-primary group-[.toaster]:text-current group-[.toaster]:text-sm",
          description: "group-[.toast]:text-secondary",
          actionButton:
            "group-[.toast]:bg-primary-base group-[.toast]:hover:bg-primary-hover group-[.toast]:active:bg-primary-pressed group-[.toast]:transition-colors group-[.toast]:duration-300",
          cancelButton:
            "group-[.toast]:bg-secondary-base group-[.toast]:text-primary group-[.toast]:hover:text-current group-[.toast]:hover:bg-secondary-hover group-[.toast]:active:bg-secondary-pressed group-[.toast]:transition-colors group-[.toast]:duration-300",
          success:
            "group-[.toaster]:!text-success-base group-[.toaster]:border-none group-[.toaster]:!bg-success-base group-[.toaster]:!bg-opacity-40",
          warning:
            "group-[.toaster]:!text-attention-base group-[.toaster]:!border-none group-[.toaster]:!bg-attention-base group-[.toaster]:!bg-opacity-20",
          error:
            "group-[.toaster]:!text-danger-base group-[.toaster]:!border-none group-[.toaster]:!bg-danger-base group-[.toaster]:!bg-opacity-20",
          info: "group-[.toaster]:!text-info-base group-[.toaster]:!border-none group-[.toaster]:!bg-info-base group-[.toaster]:!bg-opacity-20",
        },
      }}
      {...props}
    />
  );
};
