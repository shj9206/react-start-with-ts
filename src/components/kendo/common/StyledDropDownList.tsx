import styled from "styled-components";
import {
  DropDownList,
  DropDownListProps,
} from "@progress/kendo-react-dropdowns";

interface CustomDropDownListProps extends DropDownListProps {
  width?: number;
}

const CustomDropDownList = styled(DropDownList)<CustomDropDownListProps>`
  width: ${(props) => props.width}px;
`;

function StyledDropDownList(props: CustomDropDownListProps) {
  return <CustomDropDownList {...props} skipDisabledItems />;
}

StyledDropDownList.defaultProps = {
  width: 150,
};

export default StyledDropDownList;
