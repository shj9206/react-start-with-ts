import FlexBox from "@/components/kendo/common/FlexBox.tsx";
import StyledInput from "@/components/kendo/common/StyledInput.tsx";

function InputSample() {
  return (
    <>
      <p> 4. Input</p>
      <FlexBox gap={10}>
        <StyledInput width={100} placeholder="입력하세요" />
        <StyledInput width={200} placeholder="disabled" disabled />
        <StyledInput width={300} placeholder="password" inputType="password" />
      </FlexBox>
    </>
  );
}

export default InputSample;
