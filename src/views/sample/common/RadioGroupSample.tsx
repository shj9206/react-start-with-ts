import FlexBox from "@/components/kendo/common/FlexBox.tsx";
import StyledRadioGroup from "@/components/kendo/common/StyledRadioGroup.tsx";

function RadioGroupSample() {
  const sampleData = [
    { label: "Female", value: "female" },
    { label: "Male", value: "male" },
    { label: "Other", value: "other", disabled: true },
  ];

  return (
    <>
      <p> 5. RadioGroup</p>
      <FlexBox gap={10} direction="column">
        <StyledRadioGroup data={sampleData} layout="horizontal" />
        <StyledRadioGroup
          data={sampleData}
          layout="horizontal"
          defaultValue="male"
        />
      </FlexBox>
    </>
  );
}

export default RadioGroupSample;
