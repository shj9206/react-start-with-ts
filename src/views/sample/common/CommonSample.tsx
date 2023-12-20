import FlexBox from "@/components/kendo/common/FlexBox.tsx";
import InputSample from "@/views/sample/common/InputSample.tsx";
import ChekBoxSample from "@/views/sample/common/ChekBoxSample.tsx";
import ButtonSample from "@/views/sample/common/ButtonSample.tsx";
import RadioSample from "@/views/sample/common/RadioSample.tsx";
import RadioGroupSample from "@/views/sample/common/RadioGroupSample.tsx";
import DropDownListSample from "@/views/sample/common/DropDownSample.tsx";
import LabelSample from "@/views/sample/common/LabelSample.tsx";
import SwitchSample from "@/views/sample/common/SwitchSample.tsx";
import TextAreaSample from "@/views/sample/common/TextAreaSample.tsx";

function CommonSample() {
  return (
    <FlexBox direction="column">
      <ButtonSample />
      <ChekBoxSample />
      <DropDownListSample />
      <InputSample />
      <RadioSample />
      <RadioGroupSample />
      <LabelSample />
      <SwitchSample />
      <TextAreaSample />
    </FlexBox>
  );
}

export default CommonSample;
