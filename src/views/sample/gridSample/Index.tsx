import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import CommonGrid, {
  CommonGridProps,
} from "@/components/kendo/grid/commonGrid.tsx";
import type {
  AccountResult,
  Companie,
} from "@/utils/apiService/accountService.ts";
import { getCompaniesList } from "@/utils/apiService/accountService.ts";

export default function Index() {
  const column = [
    { field: "name", title: "name", width: 200, align: "center" },
    { field: "country", title: "country", width: 200 },
    { field: "state", title: "state", width: 200 },
    { field: "city", title: "city", width: 200, filterType: "select" },
    { field: "street", title: "street", width: 200, filterable: false },
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
        gridData: company.data as Companie[],
      }));
    }
  }, [company]);

  return (
    <div>
      <CommonGrid {...commonGridProps} />
    </div>
  );
}
