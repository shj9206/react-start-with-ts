import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import CommonGrid from "@/views/sample/kendoGrid/commonGrid";
import products from "@/views/sample/kendoGrid/data/products.json";
import { getCompaniesList } from "@/utils/apiService/accountService";
import type { AccountResult } from "@/utils/apiService/accountService";

type CommonGridProps = {
  columnHeader: {
    field: string;
    title: string;
    width: number;
    align: string;
  }[];
  buttonCount: number;
  gridData: unknown;
  sortableGrid: boolean;
  unsorted: boolean;
  multipleSorting: boolean;
  filterable: boolean;
  resizable: boolean;
  displayCount: number[];
  // ... 나머지 속성
};
export default function Index() {
  const column = [
    { field: "name", title: "name", width: 150, align: "center" },
    { field: "modDate", title: "modDate", width: 150, align: "center" },

    // { field: "ProductName", title: "ProductName", width: 300 },
    // { field: "UnitPrice", title: "UnitPrice", width: 150 },
  ];
  const [commonGridProps, setCommonGridProps] = useState<CommonGridProps>({
    columnHeader: column,
    buttonCount: 5,
    gridData: products,
    sortableGrid: true,
    unsorted: true,
    multipleSorting: false,
    filterable: true,
    resizable: true,
    displayCount: [10, 20, 30],
  });
  const companyListQuery = () => ({
    queryKey: ["company"],
    queryFn: async () => {
      const result = await getCompaniesList();
      return result as AccountResult;
    },
  });
  const { data: company } = useQuery<AccountResult, Error>(companyListQuery());
  useEffect(() => {
    if (company && company.data) {
      console.log(company);
      setCommonGridProps((prevState) => ({
        ...prevState,
        gridData: company.data,
      }));
    }
  }, [company]);
  return (
    <CommonGrid
      columnHeader={commonGridProps.columnHeader}
      buttonCount={commonGridProps.buttonCount}
      gridData={commonGridProps.gridData}
      sortableGrid={commonGridProps.sortableGrid}
      unsorted={commonGridProps.unsorted}
      multipleSorting={commonGridProps.multipleSorting}
      filterable={commonGridProps.filterable}
      resizable={commonGridProps.resizable}
      displayCount={commonGridProps.displayCount}
    />
  );
}
