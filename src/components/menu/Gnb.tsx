import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
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
// import { SubMenuType } from "@/utils/resources/menu.ts";
import { useAppDispatch } from "@/store/hooks";
import { setContent } from "@/store/contentWidthSlice.ts";
import AlertComponent from "@/components/kendo/dialog/AlertComponent.tsx";
import AccountModal from "@/components/myaccountModal/AccountModal";
import NotificationComponent from "@/components/kendo/notification/NotificationComponent.tsx";
import {
  getMenuList,
  MenuList,
  MenuListResponse,
} from "@/utils/apiService/authService.ts";

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
  const [subMenuList, setSubMenuList] = useState<MenuList[]>([]);

  const navigate = useNavigate();

  const dispatch = useAppDispatch();

  const [menu, setMenu] = useState<MenuList[]>();

  const getUserMenuListQuery = () => ({
    queryKey: ["menuList"],
    queryFn: (): Promise<MenuListResponse> => getMenuList("123@ag"),
  });

  const { data: menuListResponse } = useQuery<MenuListResponse, Error>(
    getUserMenuListQuery(),
  );

  useEffect(() => {
    if (menuListResponse !== undefined && menuListResponse !== null)
      setMenu(menuListResponse.data);
  }, [menuListResponse]);

  const handleClick = () => {
    setExpanded((prevState) => !prevState);
  };

  useEffect(() => {
    dispatch(setContent(expanded));
  }, [dispatch, expanded]);

  const [selectedId, setSelectedId] = useState<number>(
    subMenuList.findIndex((x) => x.selected),
  );

  const moveToMenu = (path: string) => {
    const resultPath = path.replace(/\s+/g, "");
    menu?.forEach((el) => {
      if (el.name.replace(/\s+/g, "") === resultPath) {
        setMenuValue(resultPath);
        setSubMenuList(el.menuList as MenuList[]);
      }
    });
    setSelectedId(0);
    navigate(`/main/${resultPath}`);
  };

  const handleSelect = (ev: DrawerSelectEvent) => {
    setSelectedId(ev.itemIndex);
    const target = subMenuList[ev.itemIndex].name;
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
            {menu?.map((el) =>
              el.useYn === "Y" ? (
                <StyledLi key={el.code} onClick={() => moveToMenu(el.name)}>
                  <span>{el.name}</span>
                </StyledLi>
              ) : null,
            )}
          </StyledUl>
        </AppBarSection>
      </AppBar>
      <Drawer
        expanded={expanded}
        position="start"
        mode="push"
        items={subMenuList.map((item, index) => ({
          id: item.code,
          text: item.name,
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
      <AccountModal />
      <AlertComponent />
      <NotificationComponent />
    </>
  );
}
