import { useState } from "react";
import { Button } from "@progress/kendo-react-buttons";
import { TextBox, TextBoxProps } from "@progress/kendo-react-inputs";
import { FieldRenderProps, FieldWrapper } from "@progress/kendo-react-form";
import { Label } from "@progress/kendo-react-labels";
import { useAppDispatch } from "@/store/hooks";
import { setChangeEmailVisible } from "@/store/accountSlice";

export default function TextBoxEmail(fieldRenderProps: FieldRenderProps) {
  const { validationMessage, visited, label, id, valid, ...others } =
    fieldRenderProps;
  const [valueDate, setValueDate] = useState<TextBoxProps["value"]>(
    others.value
  );

  const dispatch = useAppDispatch();

  const handleChange = () => {
    dispatch(setChangeEmailVisible(true));
  };

  const suffixButton = () => (
    <Button type="button" fillMode="outline" onClick={handleChange}>
      Change Email
    </Button>
  );

  return (
    <FieldWrapper>
      <Label editorId={id} editorValid={valid}>
        {label}
      </Label>
      <div className="k-form-field-wrap">
        <TextBox
          value={valueDate}
          // onChange={handleChange}
          suffix={suffixButton}
        />
      </div>
    </FieldWrapper>
  );
}
