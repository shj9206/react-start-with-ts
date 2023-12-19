import { useEffect, useState } from "react";
import styled from "styled-components";
import { Input, InputProps } from "@progress/kendo-react-inputs";
import { SvgIcon } from "@progress/kendo-react-common";
import { eyeIcon, eyeSlashIcon } from "@progress/kendo-svg-icons";

interface StyleType {
  left?: number;
  width?: number;
}

const CustomInput = styled(Input)<InputProps>`
  // 추가 스타일
`;
const PasswordEyeIcon = styled.div<StyleType>`
  position: absolute;
  top: 2px;
  cursor: pointer;
  left: ${(props) => props.left}px;
`;

const WrapDiv = styled.div<StyleType>`
  position: relative;
  width: ${(props) => props.width}px;
`;

function StyledInput(props: InputProps) {
  const [showPassword, setShowPassword] = useState(false);
  const [componentWidth, setComponentWidth] = useState<number>(0);

  useEffect(() => {
    const width = typeof props?.width === "number" ? props?.width : 0;
    setComponentWidth(width);
  }, [props]);

  return (
    <WrapDiv width={componentWidth}>
      {props?.type && props?.type === "password" ? (
        <>
          <CustomInput type={showPassword ? "text" : "password"} {...props} />
          <PasswordEyeIcon
            onClick={() => setShowPassword(!showPassword)}
            left={componentWidth - 20}
          >
            {showPassword ? (
              <SvgIcon icon={eyeIcon} />
            ) : (
              <SvgIcon icon={eyeSlashIcon} />
            )}
          </PasswordEyeIcon>
        </>
      ) : (
        <CustomInput {...props} />
      )}
    </WrapDiv>
  );
}

export default StyledInput;
