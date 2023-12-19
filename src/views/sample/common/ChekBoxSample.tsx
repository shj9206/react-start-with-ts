import FlexBox from "@/components/kendo/common/FlexBox.tsx";
import StyledCheckbox from "@/components/kendo/common/StyledCheckbox.tsx";

function ChekBoxSample() {
  return (
    <>
      <p> 2. CheckBox</p>
      <FlexBox gap={10}>
        <StyledCheckbox style={{ margin: 10 }} label="체크박스" />
        <StyledCheckbox style={{ margin: 10 }} disabled label="Disabled" />
        <StyledCheckbox
          style={{ margin: 10 }}
          defaultChecked
          label="defaultChecked"
        />
      </FlexBox>
    </>
  );
}

export default ChekBoxSample;
