import { useState } from "react";
import { InputChangeEvent } from "@progress/kendo-react-inputs";
import { useNavigate } from "react-router-dom";
import Breadcrumb from "@/views/userManage/Breadcrumb";
import StyledButton from "@/components/kendo/common/StyledButton.tsx";
import FlexBox from "@/components/kendo/common/FlexBox.tsx";
import StyledLabel from "@/components/kendo/common/StyledLabel.tsx";
import StyledInput from "@/components/kendo/common/StyledInput.tsx";
import StyledCheckbox from "@/components/kendo/common/StyledCheckbox.tsx";

export default function MyAccount() {
  const [value, setValue] = useState<string>("");
  const editorId = "firstName";

  const navigate = useNavigate();
  const onClick = () => {
    navigate("/main/userManage");
  };

  return (
    <>
      <Breadcrumb />
      <hr />
      <p>User Info</p>
      <FlexBox gap={10}>
        <StyledLabel editorId={editorId}>Role:&nbsp;</StyledLabel>
        <StyledLabel editorId={editorId}>Email:&nbsp;</StyledLabel>
        <StyledInput
          width={200}
          id={editorId}
          value={value}
          ariaDescribedBy="firstNameError"
          onChange={(e: InputChangeEvent) => setValue(e.value)}
        />
      </FlexBox>
      <FlexBox gap={10}>
        <StyledLabel editorId={editorId}>First Name&nbsp;</StyledLabel>
        <StyledInput
          width={200}
          id={editorId}
          value={value}
          ariaDescribedBy="firstNameError"
          onChange={(e: InputChangeEvent) => setValue(e.value)}
        />
        <StyledLabel editorId={editorId}>Last Name&nbsp;</StyledLabel>
        <StyledInput
          width={200}
          id={editorId}
          value={value}
          ariaDescribedBy="firstNameError"
          onChange={(e: InputChangeEvent) => setValue(e.value)}
        />
      </FlexBox>
      <FlexBox gap={10}>
        <StyledLabel editorId={editorId}>User Description&nbsp;</StyledLabel>
        <StyledInput
          width={1000}
          id={editorId}
          value={value}
          ariaDescribedBy="firstNameError"
          onChange={(e: InputChangeEvent) => setValue(e.value)}
        />
      </FlexBox>
      <p>Basic Info</p>
      <FlexBox gap={10}>
        <StyledLabel editorId={editorId}>Region&nbsp;</StyledLabel>
        <StyledLabel editorId={editorId}>
          여기에 값 넣어야 함 &nbsp;
        </StyledLabel>
      </FlexBox>
      <p>View Only</p>
      <FlexBox gap={10}>
        <StyledCheckbox style={{ margin: 10 }} label="View Only" />
      </FlexBox>
      <StyledCheckbox
        style={{ margin: 10 }}
        label="Only the system owner may provide access to their system. Without written approval from the system owner, installers may not 
        provide access to other companies and may not provide access to users outside of their company. I have read and agree to LG Energy Solution’s
         Terms of Service and have read LG Energy Solution’s Privacy Policy. I understand that violation of these conditions may result in suspension or termination of my Enblock Manager account."
      />
      <FlexBox gap={10}>
        <StyledButton onClick={onClick} cssType="main_01" width={150}>
          Cancel
        </StyledButton>
        <StyledButton onClick={onClick} cssType="main_01" width={150}>
          Save
        </StyledButton>
      </FlexBox>
    </>
  );
}
