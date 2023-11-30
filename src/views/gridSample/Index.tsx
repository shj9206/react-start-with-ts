import {useState, useLayoutEffect, useEffect} from "react";
import { useQuery } from "@tanstack/react-query";
import CommonGrid, {
  CommonGridProps,
} from "@/views/sample/kendoGrid/commonGrid";
// import products from "@/views/sample/kendoGrid/data/products.json";
import { getCompaniesList } from "@/utils/apiService/accountService";
import type { AccountResult } from "@/utils/apiService/accountService";

export default function Index() {
  const column = [
    { field: "name", title: "name", width: 200, align: "center" },
    { field: "country", title: "country", width: 200 },
    { field: "state", title: "state", width: 200 },
    { field: "city", title: "city", width: 200 },
    { field: "street", title: "street", width: 200 },
  ];
  const [commonGridProps, setCommonGridProps] = useState<CommonGridProps>({
    columnHeader: column,
    buttonCount: 5,
    gridData: null,
    sortableGrid: true,
    unsorted: true,
    multipleSorting: false,
    filterable: true,
    resizable: true,
    displayCount: [10, 20, 30, 0],
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
      setCommonGridProps((prevState) => ({
        ...prevState,
        gridData: company.data as object[] | null,
      }));
    }
  }, [company]);


  return (
    <CommonGrid {...commonGridProps}/>
  );
}
