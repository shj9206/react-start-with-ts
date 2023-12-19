import { useEffect, useState } from "react";
import Chart from "@/components/kendo/chart/Chart.tsx";
import { Branch, Company } from "@/utils/apiService/accountService.ts";
import { getRegionSeries } from "@/utils/common.ts";

type Series = {
  name: string;
  data: number[];
};
type PropsType = {
  compsData: Company[] | null;
  branchData: Branch[] | null;
};
export default function GlobalNumberCompany(props: PropsType) {
  const { compsData, branchData } = props;

  const categories = ["Total", "EU", "US", "AU"];

  const [series, setSeries] = useState<Series[]>([]);

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
      companyTemp = getRegionSeries(compsData, "Company");
    }
    if (branchData) {
      branchTemp = getRegionSeries(branchData, "Branch");
    }
    setSeries([companyTemp, branchTemp]);
  }, [compsData, branchData]);
  return <Chart seriesType="column" categories={categories} series={series} />;
}
