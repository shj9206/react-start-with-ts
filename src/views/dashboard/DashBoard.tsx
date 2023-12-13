import { useEffect, useState } from "react";
import {
  TileLayout,
  TileLayoutRepositionEvent,
} from "@progress/kendo-react-layout";
import { QueryClient, useQuery } from "@tanstack/react-query";
import GlobalUserNumber from "@/views/dashboard/tiles/GlobalUserNumber.tsx";
import GlobalStatusNumber from "@/views/dashboard/tiles/GlobalStatusNumber.tsx";
import Chart from "@/components/kendo/chart/Chart.tsx";
import {
  AccountResult,
  Branch,
  Company,
  getBranchesList,
  getCompaniesList,
} from "@/utils/apiService/accountService.ts";

type Series = {
  name: string;
  data: number[];
};

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
  const categories = ["Total", "EU", "US", "AU"];
  const [series, setSeries] = useState<Series[]>([]);
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
        <Chart seriesType="column" categories={categories} series={series} />
      ),
    },
    {
      header: "Global Number of System Registration Status",
      body: (
        <Chart seriesType="column" categories={categories} series={series} />
      ),
    },
    {
      header: "Global Number of Monthly System Installation",
      body: (
        <Chart seriesType="column" categories={categories} series={series} />
      ),
    },
    {
      header: "Global Number of System Installation by Model",
      body: <Chart seriesType="bar" categories={categories} series={series} />,
    },
  ];
  const handleReposition = (e: TileLayoutRepositionEvent) => {
    setData(e.value);
  };
  const createSeries = (obj: unknown, name: string) => {
    let EU = 0;
    let US = 0;
    let AU = 0;
    let total = 0;
    const array: number[] = [];
    const temp: { name: string; data: number[] } = {
      name,
      data: [],
    };

    // obj가 배열이고, 각 요소가 region 속성을 가지고 있는지 확인
    if (
      Array.isArray(obj) &&
      obj.every((el) => typeof el === "object" && "region" in el)
    ) {
      const euArray = obj.filter((el) => el.region === "eu");
      const usArray = obj.filter((el) => el.region === "us");
      const auArray = obj.filter((el) => el.region === "au");
      EU = euArray.length + 1;
      US = usArray.length + 1;
      AU = auArray.length + 1;
      total = EU + US + AU;
      array.push(total);
      array.push(EU);
      array.push(US);
      array.push(AU);
      temp.data = array;
    }
    return temp;
  };
  useEffect(() => {
    console.log("compsData", compsData);
    let companyTemp: { name: string; data: number[] } = {
      name: "Company",
      data: [],
    };
    let branchTemp: { name: string; data: number[] } = {
      name: "Branch",
      data: [],
    };
    if (compsData) {
      companyTemp = createSeries(compsData, "Company");
    }
    if (branchData) {
      branchTemp = createSeries(branchData, "Branch");
    }
    setSeries([companyTemp, branchTemp]);
  }, [compsData, branchData]);

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
