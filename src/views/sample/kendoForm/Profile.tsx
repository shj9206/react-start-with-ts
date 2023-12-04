import * as React from "react";

import { useNavigate } from "react-router-dom";
import { Form, Field, FormElement } from "@progress/kendo-react-form";
import { Button } from "@progress/kendo-react-buttons";
import Input from "@/components/kendo/form/Input.tsx";
import MaskedTextBox from "@/components/kendo/form/MaskedTextBox";
import DropDownList from "@/components/kendo/form/DropDownList";
import Editor from "@/components/kendo/form/Editor";
import Upload from "@/components/kendo/form/Upload";
import RadioGroup from "@/components/kendo/form/RadioGroup";
import Switch from "@/components/kendo/form/Switch";
import AppContext from "@/utils/AppContext";
import {
  requiredValidator,
  emailValidator,
  phoneValidator,
  biographyValidator,
} from "@/utils/Validators";
import countries from "@/utils/resources/countries";
import teams from "@/utils/resources/teams";

const countriesData = countries.map((country) => country.name);
const teamsData = teams.map((team) => ({
  value: team.teamID,
  label: team.teamName,
}));
export default function Profile() {
  const history = useNavigate();
  const { languageId, onLanguageChange, onProfileChange, ...formValues } =
    React.useContext(AppContext);

  const onSubmit = React.useCallback(() => {
    history("/");
  }, [history]);
  const onCancelClick = React.useCallback(() => {
    history("/");
  }, [history]);

  return (
    <div id="Profile" className="profile-page main-content">
      <div className="card-container">
        <div className="card-component">
          <Form
            onSubmit={onSubmit}
            initialValues={{
              ...formValues,
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
