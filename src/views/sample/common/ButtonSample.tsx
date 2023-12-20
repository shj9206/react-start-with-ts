import FlexBox from "@/components/kendo/common/FlexBox.tsx";
import StyledButton from "@/components/kendo/common/StyledButton.tsx";

function ButtonSample() {
  return (
    <>
      <p> 1. Button</p>
      <FlexBox gap={10}>
        <StyledButton cssType="main_01" width={150}>
          Main 1번 버튼
        </StyledButton>
        <StyledButton cssType="main_02" width={250}>
          Main 2번 버튼
        </StyledButton>
        <StyledButton cssType="sub_01"> Sub 1번 버튼 </StyledButton>
        <StyledButton cssType="sub_02"> Sub 2번 버튼 </StyledButton>
        <StyledButton cssType="sub_03"> Sub 3번 버튼 </StyledButton>
      </FlexBox>
    </>
  );
}

export default ButtonSample;
