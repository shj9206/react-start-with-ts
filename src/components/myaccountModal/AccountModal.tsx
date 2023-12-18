import { useState } from "react";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import {
  setAccountVisible,
  setChangeEmailVisible,
  setPasswordVisible,
  setHistoryVisible,
} from "@/store/accountSlice";
import { SubMenuType } from "@/utils/resources/menu.ts";
import ModalComponent from "@/components/kendo/modal/ModalComponent.tsx";
import EmailModalForm from "@/components/myaccountModal/emailModalForm";
import PasswordFirstModalForm from "@/components/myaccountModal/PasswordFirstModalForm";
import PasswordSecondModalForm from "@/components/myaccountModal/PasswordSecondModalForm";
import HistoryModal from "@/components/myaccountModal/HistoryModal";

interface PropsType {
  setSubMenuList: React.Dispatch<React.SetStateAction<SubMenuType[]>>;
}

export default function AccuntModal({ setSubMenuList }: PropsType) {
  const [openModal, setOpenModal] = useState({
    emailModal: false,
    passwordModalFirst: false,
    passwordModalSecond: false,
    hitoryModal: false,
  });

  const accountVisible = useAppSelector(
    (state) => state.account.accountVisible
  );
  const passwordVisible = useAppSelector(
    (state) => state.account.passwordVisible
  );
  const changeEmailVisible = useAppSelector(
    (state) => state.account.changeEmailVisible
  );
  const historyVisible = useAppSelector(
    (state) => state.account.historyVisible
  );

  const dispatch = useAppDispatch();

  if (accountVisible) {
    setSubMenuList([
      {
        id: 61,
        selected: false,
        text: "My Account",
        value: "myAccount",
      },
    ]);
    dispatch(setAccountVisible(false));
  }
  if (passwordVisible) {
    setOpenModal({ ...openModal, passwordModalFirst: true });
    dispatch(setPasswordVisible(false));
  }
  if (changeEmailVisible) {
    setOpenModal({ ...openModal, emailModal: true });
    dispatch(setChangeEmailVisible(false));
  }
  if (historyVisible) {
    setOpenModal({ ...openModal, hitoryModal: true });
    dispatch(setHistoryVisible(false));
  }

  const handleModalClose = () => {
    setOpenModal({
      emailModal: false,
      passwordModalFirst: false,
      passwordModalSecond: false,
      hitoryModal: false,
    });
  };

  return (
    <div>
      {openModal.emailModal && (
        <ModalComponent
          onClose={handleModalClose}
          title="Change Email"
          showCloseButton={false}
        >
          <EmailModalForm handleModalClose={handleModalClose} />
        </ModalComponent>
      )}
      {openModal.passwordModalFirst && (
        <ModalComponent
          onClose={handleModalClose}
          title="Confirm Current Password"
          showCloseButton={false}
        >
          <PasswordFirstModalForm
            setOpenModal={setOpenModal}
            handleModalClose={handleModalClose}
            openModal={openModal}
          />
        </ModalComponent>
      )}
      {openModal.passwordModalSecond && (
        <ModalComponent
          onClose={handleModalClose}
          title="Change Password"
          showCloseButton={false}
        >
          <PasswordSecondModalForm handleModalClose={handleModalClose} />
        </ModalComponent>
      )}
      {openModal.hitoryModal && (
        <ModalComponent
          onClose={handleModalClose}
          title="Sign In History"
          showCloseButton={false}
        >
          <HistoryModal />
        </ModalComponent>
      )}
    </div>
  );
}
