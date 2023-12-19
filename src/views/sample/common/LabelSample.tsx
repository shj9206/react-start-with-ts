import { useState } from "react";
import { Error } from "@progress/kendo-react-labels";
import { InputChangeEvent } from "@progress/kendo-react-inputs";
import FlexBox from "@/components/kendo/common/FlexBox.tsx";
import StyledLabel from "@/components/kendo/common/StyledLabel.tsx";
import StyledInput from "@/components/kendo/common/StyledInput.tsx";

function LabelSample() {
  const [value, setValue] = useState<string>("");
  const editorId = "firstName";

  return (
    <>
      <p> 5. Label</p>
      <FlexBox gap={10}>
        <StyledLabel editorId={editorId}>First Name:&nbsp;</StyledLabel>
        <StyledInput
          width={200}
          id={editorId}
          value={value}
          ariaDescribedBy="firstNameError"
          onChange={(e: InputChangeEvent) => setValue(e.value)}
        />
        {!value && <Error id="firstNameError">This field is required.</Error>}
      </FlexBox>
    </>
  );
}

export default LabelSample;
