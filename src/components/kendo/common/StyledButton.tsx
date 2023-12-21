import styled, { css } from "styled-components";
import { Button, ButtonProps } from "@progress/kendo-react-buttons";
import { useEffect, useState } from "react";

// 버튼 유형에 따른 스타일을 정의합니다.
const buttonStyles = {
  main_01: css`
    margin: 5px;
    background-color: #666; // 메인 버튼의 배경색
    color: white; // 메인 버튼의 글자색
    &:hover {
      background-color: #666; // 동일한 배경색을 유지합니다.
      color: white; // 동일한 글자색을 유지합니다.
    }
  `,
  main_02: css`
    margin: 5px;
    background-color: #840e0e; // 메인 버튼의 배경색
    color: white; // 메인 버튼의 글자색
    // 여기에 메인 버튼에 대한 추가 스타일을 정의합니다.
  `,
  sub_01: css`
    margin: 5px;
    background-color: #00bcd4; // 서브 버튼1의 배경색
    color: black; // 서브 버튼1의 글자색
  `,
  sub_02: css`
    margin: 5px;
    background-color: #00bcd4; // 서브 버튼1의 배경색
    color: black; // 서브 버튼1의 글자색
  `,
};

// 버튼 유형을 입력받아 해당하는 스타일을 반환하는 함수
const getTypeStyle = (csstype?: string) =>
  buttonStyles[csstype as keyof typeof buttonStyles] || null;

interface StyledButtonProps extends ButtonProps {
  csstype?: "main_01" | "main_02" | "sub_01" | "sub_02" | "sub_03";
  width?: number;
}

const CustomButton = styled(Button)<StyledButtonProps>`
  ${(props) => getTypeStyle(props.csstype)} : null
`;

function StyledButton({ width, csstype, ...props }: StyledButtonProps) {
  const [buttonWidth, setButtonWidth] = useState<number>(0);

  useEffect(() => {
    if (typeof width === "number") {
      setButtonWidth(width);
    }
  }, [width]);

  return (
    <CustomButton {...props} csstype={csstype} style={{ width: buttonWidth }} />
  );
}

StyledButton.defaultProps = {
  csstype: "main_01",
  width: 100,
};

export default StyledButton;
