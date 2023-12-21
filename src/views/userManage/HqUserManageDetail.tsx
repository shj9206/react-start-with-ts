import Breadcrumb from "@/views/userManage/Breadcrumb";
import StyledButton from "@/components/kendo/common/StyledButton.tsx";
import FlexBox from "@/components/kendo/common/FlexBox.tsx";
import StyledLabel from "@/components/kendo/common/StyledLabel.tsx";

interface PropsType {
  setShowPage: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function MyAccount({ setShowPage }: PropsType) {
  const Activation = "Activation";

  const onClick = () => {
    setShowPage(false);
  };
  return (
    <>
      <Breadcrumb />
      <hr />
      <br />
      <br />
      <FlexBox gap={10}>
        <StyledLabel>Activation&nbsp;</StyledLabel>
        <StyledLabel>{Activation}</StyledLabel>
      </FlexBox>
      <p>User Info</p>
      <FlexBox gap={10}>
        <StyledLabel>Role&nbsp;</StyledLabel>
        <StyledLabel>{Activation}</StyledLabel>
      </FlexBox>
      <FlexBox gap={10}>
        <StyledLabel>Email&nbsp;</StyledLabel>
        <StyledLabel>{Activation}</StyledLabel>
      </FlexBox>
      <FlexBox gap={10}>
        <StyledLabel>First Name&nbsp;</StyledLabel>
        <StyledLabel>{Activation}</StyledLabel>
      </FlexBox>
      <FlexBox gap={10}>
        <StyledLabel>Last Name&nbsp;</StyledLabel>
        <StyledLabel>{Activation}</StyledLabel>
      </FlexBox>
      <StyledButton onClick={onClick} cssType="main_01">
        Back to List
      </StyledButton>
    </>
  );
}
