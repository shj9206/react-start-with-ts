import FlexBox from "@/components/kendo/common/FlexBox.tsx";
import StyledRadio from "@/components/kendo/common/StyledRadio.tsx";

function RadioSample() {
  return (
    <>
      <p> 5. Radio</p>
      <FlexBox gap={10}>
        <StyledRadio name="group1" value="1" label="1번" />
        <StyledRadio name="group1" value="2" label="2번" />
        <StyledRadio name="group1" value="3" label="Disabled" disabled />
      </FlexBox>
    </>
  );
}

export default RadioSample;
