import { useNavigate } from "react-router-dom";
import {
  SwitchChangeEvent,
  InputChangeEvent,
} from "@progress/kendo-react-inputs";
import { useState } from "react";
import Breadcrumb from "@/views/userManage/Breadcrumb";
import StyledButton from "@/components/kendo/common/StyledButton.tsx";
import FlexBox from "@/components/kendo/common/FlexBox.tsx";
import StyledLabel from "@/components/kendo/common/StyledLabel.tsx";
import StyledInput from "@/components/kendo/common/StyledInput.tsx";
import StyledSwitch from "@/components/kendo/common/StyledSwitch.tsx";

export default function MyAccount() {
  const Activation = "Activation";
  const editorId = "firstName";
  const navigate = useNavigate();
  const [value, setValue] = useState<boolean>(false);
  const [valueInput, setValueInput] = useState<string>("");

  const onClick = () => {
    navigate("/main/userManage");
  };
  return (
    <>
      <Breadcrumb />
      <hr />
      <br />
      <br />
      <FlexBox gap={10}>
        <StyledLabel>Activation&nbsp;</StyledLabel>
        <StyledSwitch
          onChange={(event: SwitchChangeEvent) => {
            setValue(event.value);
          }}
        />
      </FlexBox>
      <p>User Info</p>
      <FlexBox gap={10}>
        <StyledLabel>Role&nbsp;</StyledLabel>
        <StyledLabel>{Activation}</StyledLabel>
        <StyledLabel>Email&nbsp;</StyledLabel>
        <StyledLabel>{Activation}</StyledLabel>
        <StyledButton onClick={onClick} cssType="main_01">
          change Email
        </StyledButton>
      </FlexBox>
      <FlexBox gap={10}>
        <StyledLabel>First Name&nbsp;</StyledLabel>
        <StyledInput
          width={200}
          id={editorId}
          value={valueInput}
          ariaDescribedBy="firstNameError"
          onChange={(e: InputChangeEvent) => setValueInput(e.value)}
        />
        <StyledLabel>Last Name&nbsp;</StyledLabel>
        <StyledInput
          width={200}
          id={editorId}
          value={valueInput}
          ariaDescribedBy="LastNameError"
          onChange={(e: InputChangeEvent) => setValueInput(e.value)}
        />
      </FlexBox>
      <FlexBox gap={10}>
        <StyledLabel>User Description&nbsp;</StyledLabel>
        <StyledInput
          width={200}
          id={editorId}
          value={valueInput}
          ariaDescribedBy="firstNameError"
          onChange={(e: InputChangeEvent) => setValueInput(e.value)}
        />
      </FlexBox>
      <p>Basic Info</p>
      <FlexBox gap={10}>
        <StyledLabel>Region&nbsp;</StyledLabel>
        <StyledLabel>{Activation}</StyledLabel>
      </FlexBox>
      <FlexBox gap={10}>
        <FlexBox direction="column" gap={10}>
          <StyledLabel>Updated Time&nbsp;</StyledLabel>
          <FlexBox gap={10}>
            <StyledLabel>{Activation}</StyledLabel>
            <StyledLabel>{Activation}</StyledLabel>
          </FlexBox>
        </FlexBox>
        <FlexBox direction="column" gap={10}>
          <StyledLabel>Updater ID(Role)&nbsp;</StyledLabel>
          <StyledLabel>{Activation}</StyledLabel>
        </FlexBox>
      </FlexBox>
      <StyledButton onClick={onClick} cssType="main_01">
        Back to List
      </StyledButton>
      <StyledButton onClick={onClick} cssType="main_01">
        Save
      </StyledButton>
    </>
  );
}
