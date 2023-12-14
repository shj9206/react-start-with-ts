import { useEffect, useState } from "react";
import {
  AppBar,
  AppBarSection,
  AppBarSpacer,
  Drawer,
  DrawerContent,
  DrawerSelectEvent,
} from "@progress/kendo-react-layout";
import { SvgIcon } from "@progress/kendo-react-common";
import { menuIcon } from "@progress/kendo-svg-icons";
import styled from "styled-components";
import { Outlet, useNavigate } from "react-router-dom";
import { mainMenu, SubMenuType } from "@/utils/resources/menu.ts";
import Modal from "@/components/myaccountModal/emailModal";
import { useModal } from "@/components/myaccountModal/useModal";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import {
  setAccountVisible,
  setChangeEmailVisible,
  setPasswordVisible,
  setHistoryVisible,
} from "@/store/accountSlice";
import { setContent } from "@/store/contentWidthSlice.ts";
import AlertComponent from "@/components/kendo/dialog/AlertComponent.tsx";

const StyledUl = styled.ul`
  font-size: 14px;
  list-style-type: none;
  padding: 0;
  margin: 0;
  display: flex;
`;

const StyledLi = styled.li`
  margin: 0 10px;
`;
export default function Gnb() {
  const [expanded, setExpanded] = useState<boolean>(true);
  const [menuValue, setMenuValue] = useState<string>("");
  const [subMenuList, setSubMenuList] = useState<SubMenuType[]>([]);

  const navigate = useNavigate();

  const showMenuCheck = useAppSelector((state) => state.auth.showMenuCheck);
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
  const { modalProps, showModal, hideModal } = useModal();
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
    // showModal(
    //   modalProps.type,
    //   modalProps.title,
    //   modalProps.message,
    //   modalProps.onCancel,
    //   modalProps.onConfirm
    // );
    dispatch(setHistoryVisible(false));
  }
  const handleClick = () => {
    setExpanded((prevState) => !prevState);
  };

  useEffect(() => {
    dispatch(setContent(expanded));
  }, [dispatch, expanded]);

  const [selectedId, setSelectedId] = useState<number>(
    subMenuList.findIndex((x) => x.selected)
  );
  const moveToMenu = (path: string) => {
    mainMenu.forEach((el) => {
      console.log("el.value", el.value);
      console.log("el.path", path);

      if (el.value === path) {
        setMenuValue(path);
        console.log("el.subMenu");
        console.log(el.subMenu);
        console.log("el.s//////");
        setSubMenuList(el.subMenu);
      }
    });
    setSelectedId(0);
    navigate(`/main/${path}`);
  };

  const handleSelect = (ev: DrawerSelectEvent) => {
    setSelectedId(ev.itemIndex);
    const target = subMenuList[ev.itemIndex].value;
    navigate(`/main/${menuValue}/${target}`);
  };
  return (
    <>
      <AppBar>
        <AppBarSection>
          <button
            className="k-button k-button-md k-rounded-md k-button-flat k-button-flat-base"
            aria-label="1"
            type="button"
            onClick={handleClick}
          >
            <SvgIcon icon={menuIcon} />
          </button>
        </AppBarSection>
        <AppBarSpacer style={{ width: 4 }} />
        <AppBarSection>
          <StyledUl>
            {mainMenu.map((el) =>
              el.showCheck.includes(showMenuCheck) ? (
                <StyledLi>
                  <span onClick={() => moveToMenu(el.value)}>{el.name}</span>
                </StyledLi>
              ) : null
            )}
          </StyledUl>
        </AppBarSection>
      </AppBar>
      <Drawer
        expanded={expanded}
        position="start"
        mode="push"
        items={subMenuList.map((item, index) => ({
          ...item,
          selected: index === selectedId,
        }))}
        onSelect={handleSelect}
      >
        <DrawerContent>
          <div style={{ overflow: "auto", height: "87vh" }}>
            <Outlet />
          </div>
        </DrawerContent>
      </Drawer>
      {modalProps.isVisible && (
        <Modal
          type={modalProps.type}
          title={modalProps.title}
          message={modalProps.message}
          onCancel={modalProps.onCancel}
          onConfirm={modalProps.onConfirm}
        />
      )}
      {/* <Modal /> */}
      <AlertComponent />
    </>
  );
}
