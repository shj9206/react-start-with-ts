import * as React from "react";
import {
  Breadcrumb,
  BreadcrumbLinkMouseEvent,
  BreadcrumbLinkKeyDownEvent,
} from "@progress/kendo-react-layout";
import { Button } from "@progress/kendo-react-buttons";
import { useLocation } from "react-router-dom";

interface DataModel {
  id: string;
  text?: string;
  icon?: React.ReactNode;
  iconClass?: string;
}

const items: DataModel[] = [
  {
    id: "products",
    text: "Products",
  },
  {
    id: "computer",
    text: "Computer",
  },
  {
    id: "gaming",
    text: "Gaming",
  },
  {
    id: "keyboard",
    text: "Keyboard",
  },
];

export default function App() {
  const [data, setData] = React.useState<DataModel[]>(items);
  const location = useLocation();
  const currentPath = location.pathname;
  const result = currentPath.split("/");

  // const handleItemSelect = (event: BreadcrumbLinkMouseEvent) => {
  //   const itemIndex: number = data.findIndex(
  //     (curValue) => curValue.id === event.id
  //   );
  //   const newData: DataModel[] = data.slice(0, itemIndex + 1);

  //   setData(newData);
  // };

  const handleButtonClick = (event: React.MouseEvent) => {
    if (event) {
      setData(items);
    }
  };

  const handleKeyDown = (event: BreadcrumbLinkKeyDownEvent) => {
    if (event.nativeEvent.keyCode === 13) {
      const itemIndex = data.findIndex((curValue) => curValue.id === event.id);
      const newData = data.slice(0, itemIndex + 1);

      setData(newData);
    }
  };

  return (
    <div style={{ display: "flex", justifyContent: "space-between" }}>
      <div>{result[3]}</div>
      <div>
        <Breadcrumb
          // style={{ justifyContent: "right" }}
          data={data}
          // disabled={false}
          // onItemSelect={handleItemSelect}
          // onKeyDown={handleKeyDown}
        />
      </div>
    </div>
  );
}
