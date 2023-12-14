import {
  DropDownList,
  DropDownListChangeEvent,
} from "@progress/kendo-react-dropdowns";
import { useState } from "react";
import { Input, InputChangeEvent } from "@progress/kendo-react-inputs";
import { Button } from "@progress/kendo-react-buttons";

export default function SearchSystem() {
  const list = ["System Name", "Status", "Alert", "City", "State/Prov"];
  const statusList = ["All", "Normal", "Disconnect"];
  const alertList = ["All", "Warning", "Error", "Fault"];
  const [dropDownValue, setDropDownValue] = useState<string>("System Name");
  const [searchValue, setSearchValue] = useState<string>("");
  const handleChange = (e: DropDownListChangeEvent) => {
    setDropDownValue(e.target.value);
  };
  const handleSearchChange = (e: DropDownListChangeEvent) => {
    setSearchValue(e.target.value);
  };
  const inputChange = (e: InputChangeEvent) => {
    setSearchValue(e.target.value as string);
  };
  const searchEvent = () => {
    alert(`click event : ${dropDownValue},${searchValue}`);
  };
  const dropDownOptions = [
    {
      value: "System Name",
      result: (
        <div className="col-12 col-md-6 example-col">
          <Input onChange={(e) => inputChange(e)} />
        </div>
      ),
    },

    {
      value: "Status",
      result: (
        <div className="col-12 col-md-6 example-col">
          <DropDownList
            style={{ width: "200px" }}
            data={statusList}
            defaultValue="All"
            onChange={(e) => handleSearchChange(e)}
          />
        </div>
      ),
    },

    {
      value: "Alert",
      result: (
        <div className="col-12 col-md-6 example-col">
          <DropDownList
            style={{ width: "200px" }}
            data={alertList}
            defaultValue="All"
            onChange={(e) => handleSearchChange(e)}
          />
        </div>
      ),
    },
    {
      value: "City",
      result: (
        <div className="col-12 col-md-6 example-col">
          <Input onChange={(e) => inputChange(e)} />
        </div>
      ),
    },
    {
      value: "State/Prov",
      result: (
        <div className="col-12 col-md-6 example-col">
          <Input onChange={(e) => inputChange(e)} />
        </div>
      ),
    },
  ];

  return (
    <div>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "flex-start",
          gap: "10px",
        }}
      >
        <div className="col-xs-12 col-sm-7 example-col">
          <DropDownList
            style={{ width: "200px" }}
            data={list}
            defaultValue="System Name"
            onChange={(e) => handleChange(e)}
          />
        </div>
        {dropDownOptions.map((el) =>
          el.value === dropDownValue ? (
            <div key={el.value}>{el.result}</div>
          ) : null,
        )}
        <Button onClick={() => searchEvent()}>Search</Button>
      </div>
      <p>Move to SystemPage</p>
    </div>
  );
}
