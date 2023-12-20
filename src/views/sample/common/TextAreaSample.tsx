import FlexBox from "@/components/kendo/common/FlexBox.tsx";
import StyledTextArea from "@/components/kendo/common/StyledTextArea.tsx";

function TextAreaSample() {
  return (
    <>
      <p> 7. Input</p>
      <FlexBox gap={10}>
        <StyledTextArea
          width={150}
          height={150}
          placeholder="입력하세요"
          autoSize
        />
        <StyledTextArea
          width={300}
          height={300}
          placeholder="입력하세요"
          disabled
        />
        <StyledTextArea width={200} height={200} placeholder="입력하세요" />
      </FlexBox>
    </>
  );
}

export default TextAreaSample;
