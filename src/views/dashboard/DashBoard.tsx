import { useState } from "react";
import {
  TileLayout,
  TileLayoutRepositionEvent,
} from "@progress/kendo-react-layout";
import { QueryClient, useQuery } from "@tanstack/react-query";
import GlobalUserNumber from "@/views/dashboard/tiles/GlobalUserNumber.tsx";
import GlobalStatusNumber from "@/views/dashboard/tiles/GlobalStatusNumber.tsx";

import {
  AccountResult,
  Branch,
  Company,
  getBranchesList,
  getCompaniesList,
} from "@/utils/apiService/accountService.ts";
import GlobalNumberCompany from "@/views/dashboard/tiles/GlobalNumberCompany.tsx";
import GlobalNumberSystem from "@/views/dashboard/tiles/GlobalNumberSystem.tsx";
import GlobalMonthlySystem from "@/views/dashboard/tiles/GlobalMonthlySystem.tsx";
import GlobalNumberModel from "@/views/dashboard/tiles/GlobalNumberModel.tsx";

const getCompaniesQuery = () => ({
  queryKey: ["companies"],
  queryFn: async () => {
    const result = await getCompaniesList();
    return result as AccountResult;
  },
});
const getBranchesQuery = () => ({
  queryKey: ["branches"],
  queryFn: async () => {
    const result = await getBranchesList();
    return result as AccountResult;
  },
});
export const loader = (queryClient: QueryClient) => async () => {
  // Companies 쿼리 가져오기
  const companiesQuery = getCompaniesQuery();
  const companiesData =
    queryClient.getQueryData(companiesQuery.queryKey) ??
    (await queryClient.fetchQuery(companiesQuery));

  // Branches 쿼리 가져오기
  const branchesQuery = getBranchesQuery();
  const branchesData =
    queryClient.getQueryData(branchesQuery.queryKey) ??
    (await queryClient.fetchQuery(branchesQuery));

  // 두 쿼리의 데이터 반환
  return { companiesData, branchesData };
};
export default function DashBoard() {
  const { data: company } = useQuery<AccountResult, Error>(getCompaniesQuery());
  const { data: branch } = useQuery<AccountResult, Error>(getBranchesQuery());
  const compsData = company ? (company.data as Company[]) : null;
  const branchData = branch ? (branch.data as Branch[]) : null;
  const [data, setData] = useState<
    Array<{ col: number; colSpan: number; rowSpan: number }>
  >([
    { col: 1, colSpan: 2, rowSpan: 1 },
    { col: 3, colSpan: 2, rowSpan: 1 },
    { col: 1, colSpan: 2, rowSpan: 2 },
    { col: 3, colSpan: 2, rowSpan: 2 },
    { col: 1, colSpan: 2, rowSpan: 2 },
    { col: 3, colSpan: 2, rowSpan: 2 },
    { col: 1, colSpan: 2, rowSpan: 2 },
    { col: 3, colSpan: 2, rowSpan: 2 },
  ]);
  const tiles = [
    {
      header: "Global Number of User",
      body: <GlobalUserNumber />,
    },
    {
      header: "Global Number of Status",
      body: <GlobalStatusNumber />,
    },
    {
      header: "Global Number of Company & Branch",
      body: (
        <GlobalNumberCompany compsData={compsData} branchData={branchData} />
      ),
    },
    {
      header: "Global Number of System Registration Status",
      body: <GlobalNumberSystem />,
    },
    {
      header: "Global Number of Monthly System Installation",
      body: <GlobalMonthlySystem />,
    },
    {
      header: "Global Number of System Installation by Model",
      body: <GlobalNumberModel />,
      // <Chart seriesType="bar" categories={categories} series={series} />,
    },
  ];
  const handleReposition = (e: TileLayoutRepositionEvent) => {
    setData(e.value);
  };

  return (
    <TileLayout
      columns={4}
      rowHeight={255}
      positions={data}
      gap={{ rows: 10, columns: 10 }}
      items={tiles}
      onReposition={handleReposition}
    />
  );
}
