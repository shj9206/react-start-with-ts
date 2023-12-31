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
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { setContent } from "@/store/contentWidthSlice.ts";
import AlertComponent from "@/components/kendo/dialog/AlertComponent.tsx";
import AccuntModal from "@/components/myaccountModal/accountModal";

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
  const dispatch = useAppDispatch();
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
    // if (menuValue.length > 0) {
    //   navigate(`/main/${menuValue}/${target}`);
    // } else {
    //   navigate(`/main/${target}`);
    // }
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
      <AccuntModal setSubMenuList={setSubMenuList} />
      <AlertComponent />
    </>
  );
}
