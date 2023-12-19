import {
  Form,
  Field,
  FormElement,
  FieldWrapper,
} from "@progress/kendo-react-form";

import { Button } from "@progress/kendo-react-buttons";

import { useDispatch } from "react-redux";
import { setChangeEmailAddress } from "@/store/accountSlice";
import LabelInput from "@/components/kendo/form/LabelInput.tsx";

type Props = {
  handleModalClose: () => void;
};

export default function EmailModalForm({ handleModalClose }: Props) {
  // const changeEmailVisible = useAppSelector(
  //   (state) => state.account.changeEmailVisible
  // );
  // console.log("changeEmailVisible", changeEmailVisible);

  const dispatch = useDispatch();

  const handleSubmit = (
    values: { [name: string]: unknown },
    event?: React.FormEvent<HTMLFormElement>
  ) => {
    event?.preventDefault();
    alert(JSON.stringify(values, null, 2));
    handleModalClose();
    dispatch(setChangeEmailAddress(true));
  };

  return (
    <Form
      onSubmit={handleSubmit}
      render={(formRenderProps) => (
        <FormElement>
          <fieldset className="k-form-fieldset">
            An activation link will be sent to your new email address. Input
            your new email address on the box below.
            <FieldWrapper>
              <div className="k-form-field-wrap">
                <Field
                  name="newEmailAddress"
                  component={LabelInput}
                  labelClassName="k-form-label"
                  label="New Email Address"
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
