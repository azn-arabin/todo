import React from "react";
import Modal, { ModalBody, ModalContent, ModalHeader } from "./Modal";
import { Button } from "../buttons/Buttons";

export interface ConfirmationMessages {
  title?: string;
  confirmText?: string;
  cancelText?: string;
}

interface ConfirmationModalProps {
  messages?: ConfirmationMessages;
  onConfirm: () => void;
  onCancel?: () => void;
  modal: boolean;
  setModal: (modal: boolean) => void;
  children?: React.ReactNode;
  loading?: boolean;
}

const ConfirmationModal = ({
  messages = {},
  onConfirm,
  onCancel,
  modal,
  setModal,
  children,
  loading,
}: ConfirmationModalProps) => {
  const {
    title = "Are you sure?",
    confirmText = "Confirm",
    cancelText = "Cancel",
  } = messages;

  return (
    <Modal modal={modal}>
      <ModalContent className="text-text">
        <ModalHeader setModal={setModal}>{title}</ModalHeader>
        <ModalBody>
          {children}
          <div className="self-end flex flex-row gap-2 items-center text-light">
            <Button
              onClick={onCancel ? onCancel : () => setModal(false)}
              className="bg-secondary py-2 px-4 text-xs"
            >
              {cancelText}
            </Button>
            <Button
              className="py-2 px-4 text-xs "
              onClick={onConfirm}
              loading={loading}
            >
              {confirmText}
            </Button>
          </div>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default ConfirmationModal;
