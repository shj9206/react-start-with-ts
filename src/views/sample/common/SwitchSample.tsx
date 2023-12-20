import { useState } from "react";
import { SwitchChangeEvent } from "@progress/kendo-react-inputs";
import FlexBox from "@/components/kendo/common/FlexBox.tsx";
import StyledSwitch from "@/components/kendo/common/StyledSwitch.tsx";

function SwitchSample() {
  const [value, setValue] = useState<boolean>(false);

  return (
    <>
      <p> 6. Switch ({value.toString()})</p>
      <FlexBox gap={10}>
        <StyledSwitch
          onChange={(event: SwitchChangeEvent) => {
            setValue(event.value);
          }}
        />
      </FlexBox>
    </>
  );
}

export default SwitchSample;
