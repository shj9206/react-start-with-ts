import { useState } from "react";
import CommonGrid from  "@/components/kendo/grid/commonGrid.tsx";
import products from "../kendoGrid/data/products.json";

export default function Index() {
  const [column, setColumnHeader] = useState([
    // {field: 'adminEmail', title: 'adminEmail', width: 150, align: 'center', filter: false},
    {
      field: "ProductName",
      title: "ProductName",
      filterable: false,
      width: 300,
    },
    {
      field: "UnitPrice",
      title: "UnitPrice",
      width: 150,
      filterable: true,
      filterType: "text",
    },
    {
      field: "Discontinued",
      title: "Discontinued",
      width: 200,
      filterable: true,
      filterType: "boolean",
    },
  ]);
  const commonGridProps = {
    columnHeader: column,
    buttonCount: 5,
    gridData: products,
    sortableGrid: true,
    unsorted: true,
    multipleSorting: false,
    filterable: true,
    resizable: true,
    displayCount: [10, 20, 30, 0],
  };

  return (
    <div id="zero-state">
      This is a demo for React Router.
      <br />
      Check out{" "}
      <a href="https://reactrouter.com">the docs at reactrouter.com</a>.
      {/* eslint-disable-next-line max-len */}
      <CommonGrid {...commonGridProps} />
      <br />
    </div>
  );
}
