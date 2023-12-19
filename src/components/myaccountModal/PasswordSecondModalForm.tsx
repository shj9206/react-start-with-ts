import {
  Form,
  Field,
  FormElement,
  FieldWrapper,
} from "@progress/kendo-react-form";

import { Button } from "@progress/kendo-react-buttons";

import LabelInput from "@/components/kendo/form/LabelInput.tsx";

type Props = {
  handleModalClose: () => void;
};

export default function PasswordSecondModalForm({ handleModalClose }: Props) {
  // const changeEmailVisible = useAppSelector(
  //   (state) => state.account.changeEmailVisible
  // );
  // console.log("changeEmailVisible", changeEmailVisible);

  const handleSubmit = (
    values: { [name: string]: unknown },
    event?: React.FormEvent<HTMLFormElement>
  ) => {
    event?.preventDefault();
    alert(JSON.stringify(values, null, 2));
  };

  return (
    <Form
      onSubmit={handleSubmit}
      render={(formRenderProps) => (
        <FormElement style={{ maxWidth: 650 }}>
          <fieldset className="k-form-fieldset">
            <FieldWrapper>
              <div className="k-form-field-wrap">
                <Field
                  name="newEmailAddress"
                  component={LabelInput}
                  labelClassName="k-form-label"
                  label="Current Password"
                />
              </div>
            </FieldWrapper>
            <FieldWrapper>
              <div className="k-form-field-wrap">
                <Field
                  name="newPassword"
                  component={LabelInput}
                  labelClassName="k-form-label"
                  label="New Password"
                />
              </div>
            </FieldWrapper>
            <FieldWrapper>
              <div className="k-form-field-wrap">
                <Field
                  name="confirmPassword"
                  component={LabelInput}
                  labelClassName="k-form-label"
                  label="Confirm Password"
                />
              </div>
            </FieldWrapper>
            <div className="k-form-buttons">
              <Button type="button" onClick={handleModalClose}>
                CANCEL
              </Button>
              <Button type="submit" disabled={!formRenderProps.allowSubmit}>
                SAVE
              </Button>
            </div>
          </fieldset>
        </FormElement>
      )}
    />
  );
}
