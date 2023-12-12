import {
  AppBar,
  AppBarSection,
  AppBarSpacer,
  Avatar,
} from "@progress/kendo-react-layout";
import {
  DropDownList,
  DropDownListChangeEvent,
} from "@progress/kendo-react-dropdowns";
import { Badge, BadgeContainer } from "@progress/kendo-react-indicators";
import { SvgIcon } from "@progress/kendo-react-common";
import { bellIcon } from "@progress/kendo-svg-icons";
import { useState } from "react";

export default function StatusBar() {
  const categories = [
    "HQ",
    "LG Region Admin",
    "Company Admin",
    "Branch Admin",
    "Employee",
    "View Only",
  ];
  const kendokaAvatar =
    "https://www.telerik.com/kendo-react-ui-develop/components/images/kendoka-react.png";

  const [state, setState] = useState({
    value: categories[0],
  });
  const handleChange = (event: DropDownListChangeEvent) => {
    setState((prevState) => ({
      ...prevState,
      value: event.target.value,
    }));
  };
  return (
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
  );
}
