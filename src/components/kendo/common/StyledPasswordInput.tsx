import { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import {
  Input,
  InputProps,
  InputWithoutContext,
} from "@progress/kendo-react-inputs";
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
  top: 2px;
  cursor: pointer;
  left: ${(props) => props.left}px;
`;

const PasswordInput = styled.div`
  position: relative;
`;

function StyledInput(props: InputProps) {
  const [showPassword, setShowPassword] = useState(false);
  const [eyeWidth, setEyeWidth] = useState<number>(0);
  const inputRef = useRef<InputWithoutContext>(null);

  useEffect(() => {
    const width = inputRef.current?.element?.offsetWidth;

    if (width !== undefined) {
      setEyeWidth(width);
    }
  }, []);

  return (
    <PasswordInput>
      <CustomInput
        type={showPassword ? "text" : "password"}
        {...props}
        ref={inputRef}
      />
      <PasswordEyeIcon
        onClick={() => setShowPassword(!showPassword)}
        left={eyeWidth - 20}
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
