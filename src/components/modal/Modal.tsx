import React from "react";
import {
  ModalOverlay,
  ModalBox,
  ModalHeader,
  CloseButton,
  ModalBody,
  ModalFooter,
  CancelButton,
  ConfirmButton,
} from "./ModalStyle.ts";
import { useModal } from "./useModal.tsx";

type ModalType = "inform" | "warn" | "error" | "confirm";

interface ModalProps {
  type: ModalType;
  title: string;
  message: string;
  onCancel: () => void;
  onConfirm: () => void;
}

const ModalIcons: Record<ModalType, string> = {
  inform: "icon-info-sign", // 해당하는 아이콘 클래스명 또는 경로
  warn: "icon-warning-sign",
  error: "icon-error-sign",
  confirm: "icon-confirm-sign",
};

export default function Modal({
  type,
  title,
  message,
  onCancel,
  onConfirm,
}: ModalProps) {
  return (
    <ModalOverlay>
      <ModalBox>
        <ModalHeader>
          <h2>{title}</h2>
          <CloseButton onClick={onCancel}>&times;</CloseButton>
        </ModalHeader>
        <ModalBody>
          {/* 아이콘을 적절히 렌더링하세요. */}
          <p>{message}</p>
        </ModalBody>
        <ModalFooter>
          {type !== "warn" && (
            <CancelButton onClick={onCancel}>CANCEL</CancelButton>
          )}
          <ConfirmButton onClick={onConfirm}>OK</ConfirmButton>
        </ModalFooter>
      </ModalBox>
    </ModalOverlay>
  );
}
