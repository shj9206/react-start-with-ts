import { useState } from "react";
import styled from "styled-components";
import { Input, InputProps } from "@progress/kendo-react-inputs";
import { SvgIcon } from "@progress/kendo-react-common";
import { eyeIcon, eyeSlashIcon } from "@progress/kendo-svg-icons";

interface PasswordEyeIconProps {
  left: number;
}

const CustomInput = styled(Input)<InputProps>`
  // 추가 스타일
`;
const PasswordEyeIcon = styled.div<PasswordEyeIconProps>`
  position: absolute;
  top: 11px;
  cursor: pointer;
  left: ${(props) => props.left}px;
`;

const PasswordInput = styled.div`
  position: relative;
`;

function StyledInput(props: InputProps) {
  const [showPassword, setShowPassword] = useState(false);

  const { style } = props;
  const width = style?.width ?? 0;

  return (
    <PasswordInput>
      <CustomInput type={showPassword ? "text" : "password"} {...props} />
      <PasswordEyeIcon
        onClick={() => setShowPassword(!showPassword)}
        left={typeof width === "number" ? width - 10 : 0}
      >
        {showPassword ? (
          <SvgIcon icon={eyeIcon} />
        ) : (
          <SvgIcon icon={eyeSlashIcon} />
        )}
      </PasswordEyeIcon>
    </PasswordInput>
  );
}

export default StyledInput;
