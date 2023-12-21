import { useEffect, useState } from "react";
import styled from "styled-components";
import { Input, InputProps } from "@progress/kendo-react-inputs";
import { SvgIcon } from "@progress/kendo-react-common";
import { eyeIcon, eyeSlashIcon } from "@progress/kendo-svg-icons";

interface CustomInputProps extends InputProps {
  left?: number;
  width?: number;
  styledType?: "password" | "text";
}

const CustomInput = styled(Input)<CustomInputProps>`
  // 추가 스타일
`;

const PasswordEyeIcon = styled.div<CustomInputProps>`
  position: absolute;
  top: 2px;
  cursor: pointer;
  left: ${(props) => props.left}px;
`;

const WrapDiv = styled.div<CustomInputProps>`
  position: relative;
  width: ${(props) => props.width}px;
`;

function StyledInput({ styledType, ...props }: CustomInputProps) {
  const [showPassword, setShowPassword] = useState(false);
  const [componentWidth, setComponentWidth] = useState<number>(0);

  useEffect(() => {
    const width = typeof props?.width === "number" ? props?.width : 0;
    setComponentWidth(width);
  }, [props]);

  return (
    <WrapDiv width={componentWidth}>
      {styledType && styledType === "password" ? (
        <>
          {/* <CustomInput type={showPassword ? "text" : "password"} {...props} /> */}
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

StyledInput.defaultProps = {
  left: 0,
  width: 100,
  styledType: "text",
};

export default StyledInput;
