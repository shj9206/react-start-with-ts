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
import { Outlet, useNavigate } from "react-router-dom";
import { mainMenu, SubMenuType } from "@/utils/resources/menu.ts";

export default function Gnb() {
  const navigate = useNavigate();

  const [expanded, setExpanded] = useState<boolean>(true);
  const [subMenuList, setSubMenuList] = useState<SubMenuType[]>([]);
  const handleClick = () => {
    setExpanded((prevState) => !prevState);
  };
  const moveToMenu = (path: string) => {
    mainMenu.forEach((el) => {
      if (el.value === path) {
        setSubMenuList(el.subMenu);
      }
    });
    navigate(`/main/${path}`);
  };
  const [selectedId, setSelectedId] = useState<number>(
    subMenuList.findIndex((x) => x.selected),
  );

  const handleSelect = (ev: DrawerSelectEvent) => {
    setSelectedId(ev.itemIndex);
    const target = subMenuList[ev.itemIndex].value;
    navigate(`/main/${target}`);
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
          <ul>
            {mainMenu.map((el) => (
              <li>
                <div onClick={() => moveToMenu(el.value)}>{el.name}</div>
              </li>
            ))}
          </ul>
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
        </DrawerContent>
      </Drawer>
    </>
  );
}
