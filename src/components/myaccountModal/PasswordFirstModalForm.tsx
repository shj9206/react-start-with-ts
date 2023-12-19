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
  setOpenModal: React.Dispatch<React.SetStateAction<ModalState>>;
  openModal: ModalState;
};

type ModalState = {
  emailModal: boolean;
  passwordModalFirst: boolean;
  passwordModalSecond: boolean;
  hitoryModal: boolean;
};

export default function PasswordFirstModalForm({
  handleModalClose,
  setOpenModal,
  openModal,
}: Props) {
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
    console.log("openModal", openModal);
    setOpenModal({
      ...openModal,
      passwordModalFirst: false,
      passwordModalSecond: true,
    });
  };

  return (
    <Form
      onSubmit={handleSubmit}
      render={(formRenderProps) => (
        <FormElement horizontal>
          <fieldset className="k-form-fieldset">
            <FieldWrapper>
              <div className="k-form-field-wrap">
                <Field
                  name="currentPassword"
                  component={LabelInput}
                  labelClassName="k-form-label"
                  label="Current Password"
                />
              </div>
            </FieldWrapper>
            <div className="k-form-buttons">
              <Button type="button" onClick={handleModalClose}>
                CANCEL
              </Button>
              <Button type="submit" disabled={!formRenderProps.allowSubmit}>
                OK
              </Button>
            </div>
          </fieldset>
        </FormElement>
      )}
    />
  );
}
