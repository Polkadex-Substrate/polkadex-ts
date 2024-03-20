"use client";

import {
  ComponentProps,
  ComponentPropsWithoutRef,
  ElementRef,
  forwardRef,
  PropsWithChildren,
  useEffect,
  useRef,
  useState,
} from "react";
import * as AlertDialog from "@radix-ui/react-alert-dialog";
import classNames from "classnames";
import { twMerge } from "tailwind-merge";

import { placements, placementsStyles } from "../helpers";

interface TitleProps extends AlertDialog.DialogTitleProps {
  onBack?: () => void;
}

const Title = forwardRef<
  ElementRef<typeof AlertDialog.Title>,
  ComponentPropsWithoutRef<typeof AlertDialog.Title>
>(({ children, className, ...props }: PropsWithChildren<TitleProps>) => {
  return (
    <AlertDialog.Title
      className={twMerge(classNames("flex items-center gap-2"), className)}
      {...props}
    >
      {children}
    </AlertDialog.Title>
  );
});
Title.displayName = "Title";

const Footer = ({ children, ...props }: ComponentProps<"div">) => {
  return <div {...props}>{children}</div>;
};

const Content = ({ children, ...props }: ComponentProps<"div">) => {
  return <div {...props}>{children}</div>;
};

type ModalProps = {
  closeOnClickOutside?: boolean;
  placement?: (typeof placements)[number];
} & Pick<AlertDialog.DialogProps, "defaultOpen" | "open" | "onOpenChange"> &
  AlertDialog.DialogContentProps;

const Modal = ({
  children,
  open,
  onOpenChange,
  defaultOpen,
  closeOnClickOutside,
  className,
  placement = "center",
  ...props
}: PropsWithChildren<ModalProps>) => {
  const containerRef = useRef<HTMLElement | null>(null);

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [_, forceRender] = useState(0);
  useEffect(() => {
    containerRef.current = document.body;
    forceRender((prev) => prev + 1);
  }, []);

  return (
    <AlertDialog.Root
      onOpenChange={onOpenChange}
      open={open}
      defaultOpen={defaultOpen}
      {...props}
    >
      <AlertDialog.Portal container={containerRef.current}>
        <AlertDialog.Overlay
          className={classNames(
            "backdrop-blur-primary inset-0 fixed z-[15]",
            "data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0"
          )}
          onClick={
            closeOnClickOutside ? () => onOpenChange?.(false) : undefined
          }
        />
        <AlertDialog.Content
          className={twMerge(
            classNames(
              "fixed z-50 max-sm:w-full max-md:w-auto h-auto overflow-auto max-h-screen duration-200 shadow-lg scrollbar-hide",
              "data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=open]:zoom-in-95",
              "data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95",
              "flex flex-col bg-level-0",
              placementsStyles[placement]
            ),
            className
          )}
          {...props}
        >
          {children}
        </AlertDialog.Content>
      </AlertDialog.Portal>
    </AlertDialog.Root>
  );
};

Modal.Title = Title;
Modal.Content = Content;
Modal.Footer = Footer;

export { Modal };
