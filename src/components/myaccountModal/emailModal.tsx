import {
  Form,
  Field,
  FormElement,
  FormRenderProps,
  FieldWrapper,
} from "@progress/kendo-react-form";
import {
  ModalOverlay,
  ModalBox,
  ModalHeader,
  CloseButton,
  ModalBody,
  ModalFooter,
  CancelButton,
  ConfirmButton,
} from "./ModalStyle.ts";
import LabelInput from "@/components/kendo/form/LabelInput.tsx";
import TextBoxEmail from "@/components/myaccount/TextBoxEmail";

// import { useAppSelector, useAppDispatch } from "@/store/hooks";
// import {
//   setAccountVisible,
//   setChangeEmailVisible,
//   setPasswordVisible,
// } from "@/store/accountSlice";

type ModalType = "email" | "password" | "history";

interface ModalProps {
  type: ModalType;
  title: string;
  message: string;
  onCancel: () => void;
  onConfirm: () => void;
}

export default function Modal({
  type,
  title,
  message,
  onCancel,
  onConfirm,
}: ModalProps) {
  // const changeEmailVisible = useAppSelector(
  //   (state) => state.account.changeEmailVisible
  // );
  // console.log("changeEmailVisible", changeEmailVisible);
  console.log("1");

  const handleSubmit = (
    values: { [name: string]: unknown },
    event?: React.FormEvent<HTMLFormElement>
  ) => {
    console.log("te!!!11111!st");
    event?.preventDefault();
    console.log("te!!!2222!st", values);
    alert(JSON.stringify(values, null, 2));
    onConfirm();
  };

  return (
    <Form
      onSubmit={handleSubmit}
      render={(formRenderProps) => (
        <FormElement style={{ maxWidth: 650 }}>
          <fieldset className="k-form-fieldset">
            <ModalOverlay>
              <ModalBox>
                <ModalHeader>
                  <h2>{title}</h2>
                  <CloseButton onClick={onCancel}>&times;</CloseButton>
                </ModalHeader>
                <ModalBody>
                  <p>{message}</p>
                  {/* 아이콘을 적절히 렌더링하세요. */}
                  {type === "email" && (
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
                  )}
                </ModalBody>
                {type !== "history" && (
                  <ModalFooter>
                    <CancelButton type="button" onClick={onCancel}>
                      CANCEL
                    </CancelButton>
                    <ConfirmButton
                      type="submit"
                      disabled={!formRenderProps.allowSubmit}
                      onClick={formRenderProps.onSubmit}
                    >
                      OK
                    </ConfirmButton>
                  </ModalFooter>
                )}
              </ModalBox>
            </ModalOverlay>
          </fieldset>
        </FormElement>
      )}
    />
  );
}
