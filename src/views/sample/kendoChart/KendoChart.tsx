import { useState, useCallback, useEffect } from "react";

import {
  DateRangePicker,
  DateRangePickerChangeEvent,
} from "@progress/kendo-react-dateinputs";
import { QueryClient, useQuery } from "@tanstack/react-query";
import Chart from "@/components/kendo/chart/Chart.tsx";
import {
  AccountResult,
  getCompaniesList,
  Company,
  getBranchesList,
  Branch,
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
// export const loader = (queryClient: QueryClient) => async () => {
//   const query = getCompaniesQuery();
//   return (
//     queryClient.getQueryData(query.queryKey) ??
//     (await queryClient.fetchQuery(query))
//   );
// }

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
export default function KendoChart() {
  const [range, setRange] = useState({
    start: new Date("2020-01-01T21:00:00.000Z"),
    end: new Date("2020-04-29T21:00:00.000Z"),
  });
  const onRangeChange = useCallback(
    (event: DateRangePickerChangeEvent) => {
      setRange({
        start: new Date(event.value.start!),
        end: new Date(event.value.end!),
      });
    },
    [setRange],
  );
  const { data: company } = useQuery<AccountResult, Error>(getCompaniesQuery());
  const { data: branch } = useQuery<AccountResult, Error>(getBranchesQuery());
  const compsData = company ? (company.data as Company[]) : null;
  const branchData = branch ? (branch.data as Branch[]) : null;
  const categories = ["Total", "EU", "US", "AU"];
  const [series, setSeries] = useState<Series[]>([]);

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
    <div id="Dashboard" className="dashboard-page main-content">
      <div className="card-container grid">
        <h3 className="card-title">Team Efficiency</h3>
        {/* <div className="card-buttons"> */}
        {/*   <ButtonGroup> */}
        {/*     <Button togglable selected={isTrend} onClick={trendOnClick}> */}
        {/*       Trend */}
        {/*     </Button> */}
        {/*     <Button togglable selected={!isTrend} onClick={volumeOnClick}> */}
        {/*       Volume */}
        {/*     </Button> */}
        {/*   </ButtonGroup> */}
        {/* </div> */}
        <div className="card-ranges">
          <DateRangePicker value={range} onChange={onRangeChange} />
        </div>
        <div className="card-component">
          <div className="row mb-3">
            <div className="col-6">
              <Chart
                seriesType="line"
                categories={categories}
                series={series}
              />
            </div>
            <div className="col-6">
              <Chart
                seriesType="column"
                categories={categories}
                series={series}
              />
            </div>
          </div>
          <div className="row">
            <div className="col-6">
              <Chart seriesType="pie" categories={categories} series={series} />
            </div>
            <div className="col-6">
              <Chart seriesType="bar" categories={categories} series={series} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
