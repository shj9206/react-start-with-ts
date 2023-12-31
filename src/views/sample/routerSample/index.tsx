import GridComponent from "@/components/kendo/grid/GridComponent.tsx";

export default function Index() {
  const column = [
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
  ];
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
      <GridComponent {...commonGridProps} />
      <br />
    </div>
  );
}
