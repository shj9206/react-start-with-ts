import { useRef, useState } from "react";
import FlexBox from "@/components/kendo/common/FlexBox.tsx";
import StyledButton from "@/components/kendo/common/StyledButton.tsx";
import ModalComponent from "@/components/kendo/modal/ModalComponent.tsx";
import useAlert from "@/hooks/useAlert.tsx";
import useNotification from "@/hooks/useNotification.tsx";

function ModalSample() {
  const [openModal, setOpenModal] = useState(false);
  const showAlert = useAlert();
  const showNotification = useNotification();
  const buttonRef = useRef(null);

  const handleClick = () => {
    showAlert({ message: "이것은 경고 메시지입니다!" });
  };

  const handleNotificationClick = () => {
    showNotification({ message: "이것은 Notification 입니다!" });
  };

  const handleModalClose = () => {
    setOpenModal(false);
  };

  return (
    <>
      <p> 6. Input</p>
      <FlexBox gap={10}>
        <StyledButton onClick={handleClick} csstype="main_01">
          alert Test Button
        </StyledButton>
        <StyledButton onClick={handleNotificationClick} csstype="main_01">
          Notification Test Button
        </StyledButton>
        <StyledButton
          ref={buttonRef}
          onClick={() => {
            setOpenModal(!openModal);
          }}
        >
          모달
        </StyledButton>
        {openModal && (
          <ModalComponent
            onClose={handleModalClose}
            title={"공지사항"}
            buttons={["cancel", "confirm"]}
            showCloseButton={false}
          >
            여기에 모달 컨텐츠만 넣으세요.
          </ModalComponent>
        )}
      </FlexBox>
    </>
  );
}

export default ModalSample;
