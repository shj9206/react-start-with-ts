import { useState } from "react";
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
import Modal from "@/components/modal/Modal";
import { useModal } from "@/components/modal/useModal";
import { useAppSelector, useAppDispatch } from "@/store/hooks";
import { setVisible } from "@/store/accountSlice";

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
  const navigate = useNavigate();
  const visible = useAppSelector((state) => state.account.visible);
  const dispatch = useAppDispatch();
  const { modalProps, showModal, hideModal } = useModal();
  if (visible) {
    showModal(
      "inform",
      "modalProps.title",
      "modalProps.message",
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
    dispatch(setVisible());
  }

  const [expanded, setExpanded] = useState<boolean>(true);
  const [menuValue, setMenuValue] = useState<string>("");
  const [subMenuList, setSubMenuList] = useState<SubMenuType[]>([]);
  const handleClick = () => {
    setExpanded((prevState) => !prevState);
  };
  const [selectedId, setSelectedId] = useState<number>(
    subMenuList.findIndex((x) => x.selected)
  );
  const moveToMenu = (path: string) => {
    mainMenu.forEach((el) => {
      console.log("el.value", el.value);
      console.log("el.path", path);

      if (el.value === path) {
        setMenuValue(path);
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
            {mainMenu.map((el) => (
              <StyledLi>
                <span onClick={() => moveToMenu(el.value)}>{el.name}</span>
              </StyledLi>
            ))}
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
          <Outlet />
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
        </DrawerContent>
      </Drawer>
    </>
  );
}
