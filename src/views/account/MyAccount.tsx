import {
  Form,
  Field,
  FormElement,
  FormRenderProps,
  FieldWrapper,
} from "@progress/kendo-react-form";
import { Button } from "@progress/kendo-react-buttons";
import { Label } from "@progress/kendo-react-labels";
import { QueryClient, useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { setChangeEmailAddress } from "@/store/accountSlice";
// import { RadioGroup } from "@progress/kendo-react-inputs";
import LabelInput from "@/components/kendo/form/LabelInput.tsx";
import RadioGroup from "@/components/kendo/form/RadioGroup";
import TextBoxEmail from "@/components/myaccount/TextBoxEmail";
import {
  AccountResult,
  getUserDetail,
} from "@/utils/apiService/accountService.ts";

export default function MyAccount() {
  const changeEmailAddress = useAppSelector(
    (state) => state.account.changeEmailAddress
  );
  const dispatch = useAppDispatch();

  const [userId, setUserId] = useState("");
  const myAccountQuery = () => ({
    queryKey: ["userDetail"],
    queryFn: async () => {
      const result = await getUserDetail(userId);
      return result as AccountResult;
    },
  });
  const { data: userDetail } = useQuery<AccountResult, Error>(myAccountQuery());

  const loader = (queryClient: QueryClient) => async () => {
    // Companies 쿼리 가져오기
    const companiesQuery = myAccountQuery();
    const companiesData =
      queryClient.getQueryData(companiesQuery.queryKey) ??
      (await queryClient.fetchQuery(companiesQuery));

    // 두 쿼리의 데이터 반환
    return { companiesData };
  };
  const radioData = [
    { label: "F", value: "f" },
    { label: "C", value: "c" },
  ];
  const userDetailData = userDetail ? (userDetail.data as AccountResult) : null;

  const initialFormValues = userDetailData || {
    role: "Employee",
    firstName: "Kyung Dong",
    company: "LG Inotec",
    region: "US",
    email: "realvoice79@widetns.com",
    lastName: "Choi",
    branch: "Seoul",
    country: "South Korea",
    temperature: "f",
  };

  const handleSubmit = async (dataItem: { [name: string]: unknown }) => {
    alert(JSON.stringify(dataItem, null, 2));
  };

  const changeSetCancel = () => {
    dispatch(setChangeEmailAddress(false));
  };
  return (
    <Form
      onSubmit={handleSubmit}
      initialValues={initialFormValues}
      render={(formRenderProps: FormRenderProps) => (
        <FormElement horizontal>
          <fieldset className="k-form-fieldset">
            <legend className="k-form-legend">My Account</legend>
            <div>Account Detail</div>
            <FieldWrapper>
              <div className="k-form-field-wrap">
                <Field
                  name="role"
                  component={LabelInput}
                  labelClassName="k-form-label"
                  label="Role"
                  disabled
                />
              </div>
            </FieldWrapper>
            <FieldWrapper>
              <div className="k-form-field-wrap">
                <Field
                  name="firstName"
                  component={LabelInput}
                  labelClassName="k-form-label"
                  label="First Name"
                />
              </div>
            </FieldWrapper>
            <FieldWrapper>
              <div className="k-form-field-wrap">
                <Field
                  name="company"
                  component={LabelInput}
                  labelClassName="k-form-label"
                  label="Company"
                  disabled
                />
              </div>
            </FieldWrapper>
            <FieldWrapper>
              <div className="k-form-field-wrap">
                <Field
                  name="region"
                  component={LabelInput}
                  labelClassName="k-form-label"
                  label="Region"
                  disabled
                />
              </div>
            </FieldWrapper>
            <FieldWrapper>
              <div className="k-form-field-wrap">
                <Field
                  name="email"
                  component={TextBoxEmail}
                  labelClassName="k-form-label"
                  label="Email"
                  disabled
                />
              </div>
            </FieldWrapper>
            {changeEmailAddress && (
              <div>
                <Label>{`We’ve sent a Confirmation email to ${
                  initialFormValues.email ? initialFormValues.email : null
                } You must
                 click the link that message before your email change will take effect.`}</Label>
                <div className="k-form-field-wrap">
                  <Button
                    type="button"
                    fillMode="outline"
                    onClick={changeSetCancel}
                  >
                    Resend Confirmation Email
                  </Button>
                  <Button
                    type="button"
                    fillMode="outline"
                    onClick={changeSetCancel}
                  >
                    CANCEL this Change
                  </Button>
                </div>
              </div>
            )}
            <FieldWrapper>
              <div className="k-form-field-wrap">
                <Field
                  name="lastName"
                  component={LabelInput}
                  labelClassName="k-form-label"
                  label="Last Name"
                />
              </div>
            </FieldWrapper>
            <FieldWrapper>
              <div className="k-form-field-wrap">
                <Field
                  name="branch"
                  component={LabelInput}
                  labelClassName="k-form-label"
                  label="Branch"
                  disabled
                />
              </div>
            </FieldWrapper>
            <FieldWrapper>
              <div className="k-form-field-wrap">
                <Field
                  name="country"
                  component={LabelInput}
                  labelClassName="k-form-label"
                  label="Country"
                  disabled
                />
              </div>
            </FieldWrapper>
            <Field
              // id="confirmationType"
              name="temperature"
              label="Temperature"
              component={RadioGroup}
              data={radioData}
              layout="horizontal"
              // validator={radioGroupValidator}
            />
            <div className="k-form-buttons">
              <button
                type="submit"
                className="k-button k-button-md k-rounded-md k-button-solid k-button-solid-base"
                disabled={!formRenderProps.allowSubmit}
              >
                SAVE
              </button>
            </div>
          </fieldset>
        </FormElement>
      )}
    />
  );
}
