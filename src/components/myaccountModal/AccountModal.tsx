import { useAppDispatch, useAppSelector } from "@/store/hooks";
import {
  setAccountVisible,
  setChangeEmailVisible,
  setPasswordVisible,
  setHistoryVisible,
} from "@/store/accountSlice";
import { SubMenuType } from "@/utils/resources/menu.ts";
import { useModal } from "@/components/myaccountModal/useModal";
import Modal from "@/components/myaccountModal/emailModal";

interface PropsType {
  setSubMenuList: React.Dispatch<React.SetStateAction<SubMenuType[]>>;
}

export default function AccuntModal({ setSubMenuList }: PropsType) {
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
  const { modalProps, showModal } = useModal();

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
    showModal(
      "password",
      "Confirm Current Password",
      "Current Password",
      modalProps.onCancel,
      modalProps.onConfirm
    );
    dispatch(setPasswordVisible(false));
  }
  if (changeEmailVisible) {
    showModal(
      "email",
      "Change Email",
      "An activation link will be sent to your new email address. Input your new email address on the box below.",
      modalProps.onCancel,
      modalProps.onConfirm
    );
    dispatch(setChangeEmailVisible(false));
  }
  if (historyVisible) {
    showModal(
      "history",
      "Change Email",
      "An activation link will be sent to your new email address. Input your new email address on the box below.",
      modalProps.onCancel,
      modalProps.onConfirm
    );
    dispatch(setHistoryVisible(false));
  }

  return (
    <div>
      {modalProps.isVisible && (
        <Modal
          type={modalProps.type}
          title={modalProps.title}
          message={modalProps.message}
          onCancel={modalProps.onCancel}
          onConfirm={modalProps.onConfirm}
        />
      )}
    </div>
  );
}
