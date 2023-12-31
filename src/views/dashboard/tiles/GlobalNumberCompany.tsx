import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import Chart from "@/components/kendo/chart/Chart.tsx";
import {
  getNumCompanyBranch,
  CompanyBranchNum,
  DashboardResult,
} from "@/utils/apiService/dashboardService.ts";

type Series = {
  name: string;
  data: number[];
};

const getNumCompanyBranchQuery = () => ({
  queryKey: ["CompanyBranchNum"],
  queryFn: async () => {
    const result = await getNumCompanyBranch();
    return result as DashboardResult;
  },
});

export default function GlobalNumberCompany() {
  const categories = ["Total", "EU", "US", "AU"];

  const [series, setSeries] = useState<Series[]>([]);
  const { data: companyBranchNum } = useQuery<DashboardResult, Error>(
    getNumCompanyBranchQuery(),
  );
  const companyBranchNumData = companyBranchNum
    ? (companyBranchNum.data as CompanyBranchNum[])
    : null;

  useEffect(() => {
    type RegionInstallations = {
      total: number;
      eu: number;
      us: number;
      au: number;
    };
    if (Array.isArray(companyBranchNumData)) {
      const list = ["Company", "Branch"];
      const aggregatedData = list.map((el) => {
        const monthlyInstallations: RegionInstallations = {
          total: 0,
          eu: 0,
          us: 0,
          au: 0,
        };
        companyBranchNumData.forEach(({ region, company, branch }) => {
          if (el === "Company") {
            if (region in monthlyInstallations) {
              monthlyInstallations[region as keyof RegionInstallations] +=
                company;
            }
            monthlyInstallations.total += company;
          } else {
            if (region in monthlyInstallations) {
              monthlyInstallations[region as keyof RegionInstallations] +=
                branch;
            }
            monthlyInstallations.total += branch;
          }
        });
        return {
          name: el,
          data: [
            monthlyInstallations.total,
            monthlyInstallations.eu,
            monthlyInstallations.us,
            monthlyInstallations.au,
          ],
        };
      });
      setSeries(aggregatedData);
    }
  }, [companyBranchNumData]);
  return <Chart seriesType="column" categories={categories} series={series} />;
}
