import { Children, ComponentProps, PropsWithChildren } from "react";
import * as AlertDialog from "@radix-ui/react-alert-dialog";
import classNames from "classnames";
import { twMerge } from "tailwind-merge";

import { isValidComponent, placements } from "../helpers";

interface TitleProps extends AlertDialog.DialogTitleProps {
  onBack?: () => void;
}

const Title = ({
  children,
  className,
  ...props
}: PropsWithChildren<TitleProps>) => {
  return (
    <AlertDialog.Title
      className={twMerge(classNames("flex items-center gap-2", className))}
      {...props}
    >
      {children}
    </AlertDialog.Title>
  );
};

const Footer = ({
  children,
  ...props
}: PropsWithChildren<ComponentProps<"div">>) => {
  return <div {...props}>{children}</div>;
};

const Content = ({
  children,
  ...props
}: PropsWithChildren<AlertDialog.DialogDescriptionProps>) => {
  return (
    <AlertDialog.Description {...props}>{children}</AlertDialog.Description>
  );
};

type ModalProps = {
  closeOnClickOutside?: boolean;
  placement?: (typeof placements)[number];
} & Pick<AlertDialog.DialogProps, "defaultOpen" | "open" | "onOpenChange"> &
  AlertDialog.DialogContentProps;

const modalPlace = {
  center: "left-[50%] top-[50%] translate-x-[-50%] translate-y-[-50%]",
  "center left": "left-[1%] top-[50%] translate-y-[-50%]",
  "center right": "right-[1%] top-[50%] translate-y-[-50%]",
  "top center": "left-[50%] top-[1%] translate-x-[-50%]",
  "top left": "left-[1%] top-[1%]",
  "top right": "right-[1%] top-[1%]",
  "bottom center": "left-[50%] bottom-[1%] translate-x-[-50%]",
  "bottom left": "left-[1%] bottom-[1%]",
  "bottom right": "right-[1%] bottom-[1%]",
};

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
  const [TitleComponent, ContentComponent, FooterComponent] =
    Children.toArray(children);
  // const [TitleComponent] = isValidComponent(children, Title);
  // const [ContentComponent] = isValidComponent(children, Content);
  // const [FooterComponent] = isValidComponent(children, Footer);

  return (
    <AlertDialog.Root
      onOpenChange={onOpenChange}
      open={open}
      defaultOpen={defaultOpen}
      {...props}
    >
      <AlertDialog.Portal>
        <AlertDialog.Overlay
          className="backdrop-blur-primary inset-0 fixed"
          onClick={
            closeOnClickOutside ? () => onOpenChange?.(!open) : undefined
          }
        />
        <AlertDialog.Content
          className={classNames(
            "fixed z-50 ",
            "duration-200 w-full max-w-lg shadow-lg md:w-full",
            "sm:rounded-lg p-4 border border-primary",
            "data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=open]:zoom-in-95 data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%]",
            "data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%]",
            modalPlace[placement],
            className
          )}
          {...props}
        >
          {TitleComponent}
          {ContentComponent}
          {FooterComponent}
        </AlertDialog.Content>
      </AlertDialog.Portal>
    </AlertDialog.Root>
  );
};

Modal.Title = Title;
Modal.Content = Content;
Modal.Footer = Footer;

export { Modal };
