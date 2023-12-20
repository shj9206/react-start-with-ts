import styled from "styled-components";
import { Checkbox, CheckboxProps } from "@progress/kendo-react-inputs";

const CustomCheckbox = styled(Checkbox)<CheckboxProps>`
  // 추가 스타일
`;

function StyledCheckbox(props: CheckboxProps) {
  return <CustomCheckbox {...props} />;
}
export default StyledCheckbox;
