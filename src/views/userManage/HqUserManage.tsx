import React, { useEffect, useRef, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import GridComponent from "@/components/kendo/grid/GridComponent.tsx";
import { CommonGridProps } from "@/components/kendo/grid/interface/gridInterfaces.ts";
import type {
  AccountResult,
  Company,
} from "@/utils/apiService/accountService.ts";
import { getCompaniesList } from "@/utils/apiService/accountService.ts";
import Breadcrumb from "@/views/userManage/Breadcrumb";
import HqUserManageDetail from "@/views/userManage/HqUserManageDetail";

export default function Index() {
  const column = [
    {
      // field: "Role",
      field: "name",
      title: "Role",
      width: 200,
      align: "center",
      cellType: "link",
      filterable: false,
    },
    {
      // field: "Admin Name",
      field: "foundedYear",
      title: "Admin Name",
      width: 200,
      align: "center",
    },
    {
      // field: "HQ Admin ID",
      field: "city",
      title: "HQ Admin ID",
      width: 200,
    },
    {
      // field: "Activation",
      field: "state",
      title: "Activation",
      width: 200,
      align: "left",
      filterable: true,
      filterType: "select",
    },
    {
      // field: "Created Time(Local Time)",
      field: "modDate",
      title: "Created Time(Local Time)",
      width: 200,
      align: "left",
      filterable: false,
    },
    {
      // field: "Created Time(UTC+0)",
      field: "modDate",
      title: "Created Time(UTC+0)",
      width: 200,
      align: "left",
      filterable: false,
    },
  ];
  const [showPopup, setShowPopup] = useState(false);
  const [showPage, setShowPage] = useState(false);

  const popupRef = useRef<HTMLDivElement>(null);

  const handleOutsideClick = (event: MouseEvent) => {
    if (popupRef.current && !popupRef.current.contains(event.target as Node)) {
      setShowPopup(false);
    }
  };

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const cellClick = () => {
    setShowPage((a) => !a);
  };

  useEffect(() => {
    if (showPopup) {
      document.addEventListener("mousedown", handleOutsideClick);
    } else {
      document.removeEventListener("mousedown", handleOutsideClick);
    }

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, [showPopup]);

  const [commonGridProps, setCommonGridProps] = useState<
    CommonGridProps<Company>
  >({
    gridHeight: 0,
    columnHeader: column,
    defaultFilter: true,
    sortableGrid: true,
    unsorted: true,
    reorder: true,
    resizable: true,
    girdToolBar: true,
    cellClick,
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
      {!showPage && (
        <div style={{ marginBottom: 20 }}>
          <div style={{ marginBottom: 10 }}>
            <Breadcrumb />
            <hr />
          </div>
          <GridComponent {...commonGridProps} />
        </div>
      )}
      {showPage && <HqUserManageDetail setShowPage={setShowPage} />}
      {/* {showPage && <LegionAdminAdd setShowPage={setShowPage} />} */}
    </div>
  );
}
