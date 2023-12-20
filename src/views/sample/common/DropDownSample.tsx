import FlexBox from "@/components/kendo/common/FlexBox.tsx";
import StyledDropDownList from "@/components/kendo/common/StyledDropDownList.tsx";
import { useState } from "react";

function DropDownListSample() {
  const sizes = [
    { id: 1, name: "X-Small" },
    { id: 2, name: "Small" },
    { id: 3, name: "Medium", disabled: true },
    { id: 4, name: "Large" },
    { id: 5, name: "X-Large", disabled: true },
    { id: 6, name: "2X-Large" },
  ];

  const [value, setValue] = useState();

  return (
    <>
      <p> 3. DropDownList ({value})</p>
      <FlexBox gap={10}>
        <StyledDropDownList
          width={100}
          data={sizes}
          dataItemKey="id"
          textField="name"
          onChange={(event) => {
            setValue(event.value.name);
          }}
        />

        <StyledDropDownList
          data={sizes}
          dataItemKey="id"
          textField="name"
          defaultValue="Small"
          disabled
        />
      </FlexBox>
    </>
  );
}

export default DropDownListSample;
