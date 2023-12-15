import React from "react";
import { Dialog, DialogActionsBar } from "@progress/kendo-react-dialogs";
import { Button } from "@progress/kendo-react-buttons";

interface ModalComponentProps {
  title?: string;
  onClose: (action?: string) => void;
  showCloseButton?: boolean;
  children: React.ReactNode;
  buttons?: Array<"confirm" | "cancel" | "close">;
  noHeader?: boolean;
}

const ModalComponent: React.FC<ModalComponentProps> = ({
  title,
  onClose,
  showCloseButton = true,
  children,
  buttons = [],
  noHeader = false,
}) => {
  const hasHeader = title || showCloseButton;
  const hasFooter = buttons.length > 0;

  return (
    <Dialog
      title={hasHeader && !noHeader ? title : ""}
      onClose={onClose}
      open={true}
    >
      <p>{children}</p>
      {hasFooter && (
        <DialogActionsBar>
          {buttons.includes("cancel") && (
            <Button onClick={() => onClose("cancel")}>취소</Button>
          )}
          {buttons.includes("close") && (
            <Button onClick={() => onClose("close")}>닫기</Button>
          )}
          {buttons.includes("confirm") && (
            <Button onClick={() => onClose("confirm")}>확인</Button>
          )}
        </DialogActionsBar>
      )}
    </Dialog>
  );
};

export default ModalComponent;
