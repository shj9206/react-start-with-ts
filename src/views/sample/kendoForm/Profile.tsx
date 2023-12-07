import * as React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Form, Field, FormElement } from "@progress/kendo-react-form";
import { Button } from "@progress/kendo-react-buttons";
import { QueryClient, useQuery } from "@tanstack/react-query";
import Input from "@/components/kendo/form/Input.tsx";
import MaskedTextBox from "@/components/kendo/form/MaskedTextBox";
import DropDownList from "@/components/kendo/form/DropDownList";
import Editor from "@/components/kendo/form/Editor";
import Upload from "@/components/kendo/form/Upload";
import RadioGroup from "@/components/kendo/form/RadioGroup";
import Switch from "@/components/kendo/form/Switch";

import {
  requiredValidator,
  emailValidator,
  phoneValidator,
  biographyValidator,
} from "@/utils/Validators";
import countries from "@/utils/resources/countries";
import teams from "@/utils/resources/teams";
import type { AccountResult, User } from "@/utils/apiService/accountService";
import { getUserDetail } from "@/utils/apiService/accountService";

const countriesData = countries.map((country) => country.name);
const teamsData = teams.map((team) => ({
  value: team.teamID,
  label: team.teamName,
}));
interface Params {
  [key: string]: string | undefined;
  userId: string;
}
const userDetailQuery = (id: string) => ({
  queryKey: ["user", "detail", id],
  queryFn: async () => {
    const result = await getUserDetail(id);
    return result as AccountResult;
  },
});
export const loader =
  (queryClient: QueryClient) =>
  async ({ params }: { params: Params }) => {
    const query = userDetailQuery(params.userId);
    return (
      queryClient.getQueryData(query.queryKey) ??
      (await queryClient.fetchQuery(query))
    );
  };
export default function Profile() {
  const history = useNavigate();
  const params = useParams<Params>();

  const { data, isPending } = useQuery<AccountResult, Error>(
    userDetailQuery(params.userId ?? ""),
  );
  const userData = data ? (data.data as User) : null;
  const onSubmit = React.useCallback(() => {
    history("/");
  }, [history]);
  const onCancelClick = React.useCallback(() => {
    history("/");
  }, [history]);

  if (isPending) {
    return <div>Loading...</div>;
  }
  return (
    <div id="Profile" className="profile-page main-content">
      <div className="card-container">
        <div className="card-component">
          <Form
            onSubmit={onSubmit}
            initialValues={{
              firstName: userData?.firstName ?? "",
              lastName: userData?.lastName ?? "",
              country: userData?.country ?? "",
            }}
            render={(formRenderProps) => (
              <FormElement horizontal style={{ maxWidth: 700 }}>
                <Field
                  id="avatar"
                  name="avatar"
                  label=""
                  validator={requiredValidator}
                  component={Upload}
                />
                <Field
                  id="firstName"
                  name="firstName"
                  label="First Name"
                  validator={requiredValidator}
                  component={Input}
                />
                <Field
                  id="middleName"
                  name="middleName"
                  label="Middle Name"
                  component={Input}
                />
                <Field
                  id="lastName"
                  name="lastName"
                  label="Last Name"
                  validator={requiredValidator}
                  component={Input}
                />
                <Field
                  id="email"
                  name="email"
                  type="email"
                  placeholder="e.g.: peter@gmail.com"
                  label="Email Address"
                  validator={emailValidator}
                  component={Input}
                />
                <Field
                  id="phoneNumber"
                  name="phoneNumber"
                  label="Phone Number"
                  mask="(+9) 0000-000-00-00"
                  validator={phoneValidator}
                  component={MaskedTextBox}
                />
                <Field
                  id="country"
                  name="country"
                  label="Country"
                  data={countriesData}
                  component={DropDownList}
                />
                <Field
                  id="biography"
                  name="biography"
                  label="Short Biography"
                  validator={biographyValidator}
                  component={Editor}
                />
                <Field
                  labelId="isInPublicDirectoryLabel"
                  name="isInPublicDirectory"
                  label="Include in public directory"
                  component={Switch}
                />
                <Field
                  labelId="teamlabel"
                  name="teamId"
                  layout="horizontal"
                  label="Tema"
                  component={RadioGroup}
                  data={teamsData}
                />
                <hr />
                <div className="k-form-buttons">
                  <Button onClick={onCancelClick}>Cancel</Button>
                  <Button
                    themeColor="primary"
                    type="submit"
                    disabled={!formRenderProps.allowSubmit}
                  >
                    Save Changes
                  </Button>
                </div>
              </FormElement>
            )}
          />
        </div>
      </div>
    </div>
  );
}
