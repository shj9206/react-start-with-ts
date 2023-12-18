import React from "react";
import {
  Dialog,
  DialogActionsBar,
  DialogCloseEvent,
} from "@progress/kendo-react-dialogs";
import { Button } from "@progress/kendo-react-buttons";
import PropTypes from "prop-types";

interface ModalComponentProps {
  title?: string;
  onClose: (event: DialogCloseEvent) => void;
  showCloseButton?: boolean;
  children: React.ReactNode;
  buttons?: Array<"confirm" | "cancel" | "close">;
  noHeader?: boolean;
}

function ModalComponent({
  title,
  onClose,
  showCloseButton = true,
  children,
  buttons = [],
  noHeader = false,
}: ModalComponentProps) {
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
}

ModalComponent.defaultProps = {
  title: "Title",
  showCloseButton: true,
  buttons: [],
  noHeader: false,
};

ModalComponent.propTypes = {
  title: PropTypes.string,
  onClose: PropTypes.func.isRequired,
  showCloseButton: PropTypes.bool,
  children: PropTypes.node.isRequired,
  buttons: PropTypes.arrayOf(PropTypes.string),
  noHeader: PropTypes.bool,
};

export default ModalComponent;
