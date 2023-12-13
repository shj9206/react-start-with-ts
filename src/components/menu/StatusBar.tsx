import {
  AppBar,
  AppBarSection,
  AppBarSpacer,
} from "@progress/kendo-react-layout";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import {
  DropDownList,
  DropDownListChangeEvent,
} from "@progress/kendo-react-dropdowns";
import { Badge, BadgeContainer } from "@progress/kendo-react-indicators";
import { SvgIcon } from "@progress/kendo-react-common";
import { bellIcon, userIcon } from "@progress/kendo-svg-icons";
import { useRef, useState } from "react";
import { DropDownButton } from "@progress/kendo-react-buttons";
import { Popup } from "@progress/kendo-react-popup";
import { setRegion } from "@/store/authSlice.ts";

export default function StatusBar() {
  const { i18n } = useTranslation("translation");
  const dispatch = useDispatch();
  const anchor = useRef<HTMLButtonElement | null>(null);
  const regions = [
    "HQ",
    "LG Region Admin",
    "Company Admin",
    "Branch Admin",
    "Employee",
    "View Only",
  ];
  const locales = ["en", "kr"];
  const user = ["My Account", "Change Password", "Sigh in History", "Sign Out"];

  const [state, setState] = useState({
    region: regions[0],
    locale: locales[0],
    alamShow: false,
  });
  const handleChangeRegion = (event: DropDownListChangeEvent) => {
    setState((prevState) => ({
      ...prevState,
      region: event.target.value,
    }));
    dispatch(setRegion(event.target.value));
  };
  const handleChangeLocale = (e: DropDownListChangeEvent) => {
    const lng = e.target.value;
    setState((prevState) => ({
      ...prevState,
      locale: e.target.value,
    }));
    i18n.changeLanguage(lng);
  };
  const onClickAlamPopup = () => {
    setState((prevState) => ({
      ...prevState,
      alamShow: !state.alamShow,
    }));
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
          data={regions}
          value={state.region}
          onChange={(e) => handleChangeRegion(e)}
        />
        <AppBarSpacer />
        <AppBarSection className="actions">
          <button
            className="k-button k-button-md k-rounded-md k-button-flat k-button-flat-base"
            aria-label="1"
            type="button"
            ref={anchor}
            onClick={() => onClickAlamPopup()}
          >
            <BadgeContainer>
              <SvgIcon icon={bellIcon} />
              <Badge themeColor="info" size="small" position="inside" />
            </BadgeContainer>
            <Popup
              anchor={anchor.current}
              show={state.alamShow}
              popupClass="popup-content"
            >
              Popup content.
            </Popup>
          </button>
        </AppBarSection>
        <AppBarSection>
          <span className="k-appbar-separator" />
        </AppBarSection>

        <AppBarSection>
          <DropDownButton items={user} svgIcon={userIcon} />
        </AppBarSection>

        <AppBarSpacer style={{ width: 4 }} />
        <DropDownList
          style={{ width: "70px" }}
          data={locales}
          value={state.locale}
          onChange={(e) => handleChangeLocale(e)}
        />
      </AppBar>
      <style>
        {` .popup-content {
            padding: 250px;
            color: #787878;
            background-color: #fcf7f8;
            border: 1px solid rgba(0,0,0,.05);
        }`}
      </style>
    </>
  );
}
