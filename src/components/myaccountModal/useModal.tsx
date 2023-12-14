import { useState } from "react";

export type ModalType = "email" | "password" | "history";

export interface ModalProps {
  type: ModalType;
  title: string;
  message: string;
  isVisible: boolean;
  onConfirm: () => void;
  onCancel: () => void;
}

export function useModal() {
  const [modalProps, setModalProps] = useState<ModalProps>({
    type: "email",
    title: "",
    message: "",
    isVisible: false,
    onConfirm: () => {},
    onCancel: () => {},
  });

  function hideModal() {
    setModalProps((prev) => ({ ...prev, isVisible: false }));
  }

  function showModal(
    type: ModalType,
    title: string,
    message: string,
    onConfirm: () => void,
    onCancel: () => void
  ) {
    setModalProps({
      type,
      title,
      message,
      isVisible: true,
      onConfirm: () => {
        onConfirm();
        hideModal(); // Confirm 후 모달 숨기기
      },
      onCancel: () => {
        onCancel();
        hideModal(); // Cancel 후 모달 숨기기
      },
    });
  }

  return {
    modalProps,
    showModal,
    hideModal,
  };
}
