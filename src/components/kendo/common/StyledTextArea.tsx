import styled from "styled-components";
import { TextArea, TextAreaProps } from "@progress/kendo-react-inputs";
import { useEffect, useState } from "react";

interface CustomTextAreaProps extends TextAreaProps {
  width?: number;
  height?: number;
}

const CustomTextArea = styled(TextArea)<CustomTextAreaProps>`
  // 추가 스타일
`;

const WrapDiv = styled.div<CustomTextAreaProps>`
  width: ${(props) => props.width}px;
  height: ${(props) => props.height}px;
`;

function StyledTextArea(props: CustomTextAreaProps) {
  const [componentWidth, setComponentWidth] = useState<number>(0);
  const [componentHeight, setComponentHeight] = useState<number>(0);

  useEffect(() => {
    const width = typeof props?.width === "number" ? props?.width : 0;
    const height = typeof props?.height === "number" ? props?.height : 0;
    setComponentWidth(width);
    setComponentHeight(height);
  }, [props]);
  return (
    <WrapDiv>
      <CustomTextArea
        {...props}
        style={{
          width: componentWidth,
          height: componentHeight,
        }}
      />
    </WrapDiv>
  );
}

StyledTextArea.defaultProps = {
  width: 200,
  height: 200,
};

export default StyledTextArea;
