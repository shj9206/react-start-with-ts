import styled from "styled-components";
import { Label, LabelProps } from "@progress/kendo-react-labels";

const CustomLabel = styled(Label)<LabelProps>`
  // 추가 스타일
`;

function StyledLabel(props: LabelProps) {
  return <CustomLabel {...props} />;
}

export default StyledLabel;
