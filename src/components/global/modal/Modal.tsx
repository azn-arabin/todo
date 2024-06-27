import React from "react";
import cn from "../../../lib/utils/cn.ts";
import { IconButton } from "../buttons/Buttons.tsx";
import { PlusIcon } from "../../icons/ToolsIcons.tsx";
import "react-datepicker/dist/react-datepicker.css";

interface ModalProps {
  modal: boolean;
  onClose?: () => void;
  children: React.ReactNode;
}

const Modal = ({ modal, onClose, children }: ModalProps) => {
  const modalClassName = modal ? "modal open" : "modal";

  return (
    <div className={modalClassName}>
      <div
        className="overlay"
        onClick={(e) => {
          onClose && onClose();
          e.stopPropagation();
        }}
      />
      <div className="modalContent">{children}</div>
    </div>
  );
};

export const ModalContent = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => (
  <div
    className={cn(
      "flex flex-col max-h-screen gap-2 bg-background rounded-md py-4 w-screen sm:w-[640px]",
      className,
    )}
    onClick={(e) => e.stopPropagation()}
  >
    {children}
  </div>
);

interface ModalCloseButtonProps {
  setModal: (value: boolean) => void;
  className?: string;
}

export const ModalCloseButton = ({
  setModal,
  className,
}: ModalCloseButtonProps) => (
  <IconButton
    type="button"
    className={cn("self-end hover:opacity-90 transition-all p-1", className)}
    onClick={() => setModal(false)}
  >
    <PlusIcon className="w-8 h-8 rotate-45" />
  </IconButton>
);

export const ModalBody = ({
  clasName,
  children,
}: {
  clasName?: string;
  children: React.ReactNode;
}) => (
  <div
    className={cn(
      "flex flex-col gap-3 h-full overflow-y-auto py-2 px-5",
      clasName,
    )}
  >
    {children}
  </div>
);

interface ModalHeaderProps {
  children: React.ReactNode;
  closeButton?: boolean;
  className?: string;
  titleClassName?: string;
  setModal: (open: boolean) => void;
}

export const ModalHeader = ({
  children,
  closeButton = true,
  className,
  titleClassName,
  setModal,
}: ModalHeaderProps) => (
  <div
    className={cn(
      "flex flex-row gap-2 justify-between items-center px-5",
      className,
    )}
  >
    <h3 className={cn("font-title font-bold text-2xl", titleClassName)}>
      {children}
    </h3>
    {closeButton && (
      <ModalCloseButton className="self-center" setModal={setModal} />
    )}
  </div>
);
export default Modal;
