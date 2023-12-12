import { Dispatch, SetStateAction } from "react";
import {
  AppBar,
  AppBarSection,
  AppBarSpacer,
} from "@progress/kendo-react-layout";
import { SvgIcon } from "@progress/kendo-react-common";
import { menuIcon } from "@progress/kendo-svg-icons";

type GnbProps = {
  setExpanded: Dispatch<SetStateAction<boolean>>;
};

export default function Gnb({ setExpanded }: GnbProps) {
  const subMenu = [
    { name: "Dash Board" },
    { name: "User Managerment" },
    { name: "FOTA" },
    { name: "Device" },
    { name: "Settings" },
  ];

  const handleClick = () => {
    setExpanded((prevState) => !prevState);
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
            {subMenu.map((el) => (
              <li>
                <span>{el.name}</span>
              </li>
            ))}
          </ul>
        </AppBarSection>
      </AppBar>
    </>
  );
}
