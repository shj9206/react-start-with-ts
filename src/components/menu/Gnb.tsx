import { Dispatch, SetStateAction } from "react";
import {
  AppBar,
  AppBarSection,
  AppBarSpacer,
} from "@progress/kendo-react-layout";
import { SvgIcon } from "@progress/kendo-react-common";
import { menuIcon } from "@progress/kendo-svg-icons";
import styled from "styled-components";

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
          <StyledUl>
            {subMenu.map((el) => (
                <StyledLi>
                  <span>{el.name}</span>
                </StyledLi>
            ))}
          </StyledUl>
        </AppBarSection>
      </AppBar>
    </>
  );
}
