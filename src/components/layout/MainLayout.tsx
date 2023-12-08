import { useState } from "react";
import {
  AppBar,
  AppBarSection,
  AppBarSpacer,
  Avatar,
  Drawer,
  DrawerContent,
  DrawerSelectEvent,
} from "@progress/kendo-react-layout";
import { Badge, BadgeContainer } from "@progress/kendo-react-indicators";
import { SvgIcon } from "@progress/kendo-react-common";
import { bellIcon, menuIcon } from "@progress/kendo-svg-icons";
import {
  DropDownList,
  DropDownListChangeEvent,
} from "@progress/kendo-react-dropdowns";
import { Outlet, useNavigate } from "react-router-dom";

export default function MainLayout() {
  const navigate = useNavigate();
  const kendokaAvatar =
    "https://www.telerik.com/kendo-react-ui-develop/components/images/kendoka-react.png";
  const categories = [
    "HQ",
    "LG Region Admin",
    "Company Admin",
    "Branch Admin",
    "Employee",
    "View Only",
  ];
  const subMenu = [
    { name: "Dash Board" },
    { name: "User Managerment" },
    { name: "FOTA" },
    { name: "Device" },
    { name: "Settings" },
  ];
  const items = [
    { text: "Chart", icon: "k-i-inbox", selected: true },
    { text: "Grid", icon: "k-i-bell" },
    { text: "Form", icon: "k-i-calendar" },
  ];
  const [state, setState] = useState({
    value: categories[0],
  });
  const [expanded, setExpanded] = useState<boolean>(true);
  const [selectedId, setSelectedId] = useState<number>(
    items.findIndex((x) => x.selected === true),
  );

  const handleChange = (event: DropDownListChangeEvent) => {
    setState((prevState) => ({
      ...prevState,
      value: event.target.value,
    }));
  };
  const handleClick = () => {
    setExpanded((prevState) => !prevState);
  };

  const handleSelect = (ev: DrawerSelectEvent) => {
    setSelectedId(ev.itemIndex);
    const target = items[ev.itemIndex].text;
    navigate(`/main/${target}`);
  };

  return (
    <>
      <AppBar>
        <AppBarSection>
          <h1 className="title">Enblock Manager</h1>
        </AppBarSection>
        <AppBarSpacer style={{ width: 4 }} />
        <DropDownList
          style={{ width: "150px" }}
          data={categories}
          value={state.value}
          onChange={(e) => handleChange(e)}
        />
        <AppBarSpacer />
        <AppBarSection className="actions">
          <button
            className="k-button k-button-md k-rounded-md k-button-flat k-button-flat-base"
            aria-label="1"
            type="button"
          >
            <BadgeContainer>
              <SvgIcon icon={bellIcon} />
              <Badge themeColor="info" size="small" position="inside" />
            </BadgeContainer>
          </button>
        </AppBarSection>
        <AppBarSection>
          <span className="k-appbar-separator" />
        </AppBarSection>

        <AppBarSection>
          <Avatar type="image">
            <img src={kendokaAvatar} alt="KendoReact Layout Kendoka Avatar" />
          </Avatar>
        </AppBarSection>
      </AppBar>
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
            {subMenu.map((el) => (
              <li>
                <span>{el.name}</span>
              </li>
            ))}
          </ul>
        </AppBarSection>
      </AppBar>
      <style>{`
                body {
                    background: #dfdfdf;
                }
                .title {
                    font-size: 18px;
                    margin: 0;
                }
                ul {
                    font-size: 14px;
                    list-style-type: none;
                    padding: 0;
                    margin: 0;
                    display: flex;
                }
                li {
                    margin: 0 10px;
                }
                li:hover {
                    cursor: pointer;
                    color: #84cef1;
                }
                .k-button k-button-md k-rounded-md k-button-solid k-button-solid-base {
                    padding: 0;
                }
                .k-badge-container {
                    margin-right: 8px;
                }
                .k-drawer-content { padding: 20px; }
                .k-drawer-container {
                    position: fixed;
                    width: 100%;
                    height: 100%;
                }
                .k-drawer-item {
                    user-select: none;
                }
            `}</style>
      <Drawer
        expanded={expanded}
        position="start"
        mode="push"
        items={items.map((item, index) => ({
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
