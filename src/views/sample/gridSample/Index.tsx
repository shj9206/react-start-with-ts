import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import CommonGrid from "@/components/kendo/grid/CommonGrid.tsx";
import { CommonGridProps } from "@/components/kendo/grid/interface/gridInterfaces.ts";
import type {
  AccountResult,
  Company,
} from "@/utils/apiService/accountService.ts";
import { getCompaniesList } from "@/utils/apiService/accountService.ts";
import { Editor } from "@progress/kendo-react-editor";

export default function Index() {
  const column = [
    {
      field: "name",
      title: "name",
      width: 200,
      align: "center",
      defaultFilter: true,
      cellType: "link",
    },
    {
      field: "foundedYear",
      title: "foundedYear",
      width: 200,
      align: "center",
      defaultFilter: true,
    },
    {
      field: "city",
      title: "city",
      width: 200,
      filterType: "select",
      defaultFilter: true,
    },
    {
      field: "state",
      title: "state",
      width: 200,
      align: "left",
      defaultFilter: true,
    },
    {
      field: "country",
      title: "country",
      width: 200,
      align: "left",
      defaultFilter: true,
    },
    {
      field: "zipCd",
      title: "zipCd",
      width: 200,
      align: "left",
      defaultFilter: false,
      filterType: "checkBox",
    },
    {
      field: "street",
      title: "street",
      width: 200,
      align: "left",
      defaultFilter: false,
      filterType: "checkBox",
    },
    {
      field: "adminFirstName",
      title: "adminFirstName",
      width: 200,
      align: "left",
      defaultFilter: false,
    },
    {
      field: "adminLastName",
      title: "adminLastName",
      width: 200,
      align: "left",
      defaultFilter: false,
    },
    {
      field: "adminEmail",
      title: "adminEmail",
      width: 200,
      align: "left",
      defaultFilter: false,
    },
    {
      field: "modDate",
      title: "modDate",
      width: 200,
      align: "left",
      defaultFilter: false,
    },
    {
      field: "branchCnt",
      title: "branchCnt",
      width: 200,
      defaultFilter: false,
    },
  ];
  const [commonGridProps, setCommonGridProps] = useState<CommonGridProps>({
    gridHeight: 0,
    gridWidth: 0,
    columnHeader: column,
    buttonCount: 5,
    gridData: null,
    sortableGrid: true,
    unsorted: true,
    multipleSorting: false,
    defaultFilter: true,
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
        gridData: company.data as Company[],
      }));
    }
  }, [company]);

  const cellClick = (e: any) => {
    console.log(e);
  };

  const addButtonTest = (e: any) => {
    alert("add Button Click Page Move");
    console.log(e);
  };

  const deleteButton = (e: any) => {
    alert("delete Button Click ");
    console.log(e);
  };

  const [value] = useState(JSON.stringify(column, null, 2));
  return (
    <div>
      <div style={{ marginBottom: 20 }}>
        <div style={{ marginBottom: 10 }}>
          <span>1. 모든 옵션이 적용된 상태</span>
        </div>
        <div style={{ marginBottom: 10 }}>
          <Editor
            value={value}
            contentStyle={{
              height: 300,
            }}
          />
        </div>
        <CommonGrid
          {...commonGridProps}
          check
          cellClick={cellClick}
          addButton={addButtonTest}
          deleteButton={deleteButton}
        />
      </div>
    </div>
  );
}
