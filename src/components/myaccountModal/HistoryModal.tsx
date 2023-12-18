import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import CommonGrid from "@/components/kendo/grid/GridComponent";
import { CommonGridProps } from "@/components/kendo/grid/interface/gridInterfaces.ts";
import type {
  AccountResult,
  Company,
} from "@/utils/apiService/accountService.ts";
import { getCompaniesList } from "@/utils/apiService/accountService.ts";

export default function HistoryModal() {
  const column = [
    {
      field: "name",
      title: "name",
      width: 200,
      align: "center",
      cellType: "link",
    },
    {
      field: "foundedYear",
      title: "foundedYear",
      width: 200,
      align: "center",
    },
  ];
  const [commonGridProps, setCommonGridProps] = useState<
    CommonGridProps<Company>
  >({
    gridHeight: 500,
    gridWidth: 695,
    columnHeader: column,
    girdToolBar: false,
    resizable: false,
    reorder: false,
    displayCount: [10],
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
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-expect-error
      setCommonGridProps((prevState) => ({
        ...prevState,
        gridData: company.data as Company[],
      }));
    }
  }, [company]);

  return (
    <div>
      최근 N 개월간의 로그인 이력만 확인이 가능합니다.
      <CommonGrid {...commonGridProps} />;
    </div>
  );
}
