import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import Chart from "@/components/kendo/chart/Chart.tsx";
import {
  DashboardResult,
  getInProgressDashboard,
  InProgressSystem,
} from "@/utils/apiService/dashboardService.ts";

type Series = {
  name: string;
  data: number[];
};

const getInProgressDashboardQuery = () => ({
  queryKey: ["InProgressSystem"],
  queryFn: async () => {
    const result = await getInProgressDashboard();
    return result as DashboardResult;
  },
});

export default function GlobalNumberInprogress() {
  const categories = ["Total", "EU", "US", "AU"];
  const [series, setSeries] = useState<Series[]>([]);
  const { data: inProgressSystem } = useQuery<DashboardResult, Error>(
    getInProgressDashboardQuery(),
  );
  const inProgressSystemData = inProgressSystem
    ? (inProgressSystem.data as InProgressSystem[])
    : null;

  useEffect(() => {
    type RegionInstallations = {
      total: number;
      eu: number;
      us: number;
      au: number;
    };
    if (Array.isArray(inProgressSystemData)) {
      const list = ["Basic Info", "In progress"];
      const aggregatedData = list.map((el) => {
        const monthlyInstallations: RegionInstallations = {
          total: 0,
          eu: 0,
          us: 0,
          au: 0,
        };
        inProgressSystemData.forEach(({ region, device, basic }) => {
          if (el === "Basic Info") {
            if (region in monthlyInstallations) {
              monthlyInstallations[region as keyof RegionInstallations] +=
                basic;
            }
            monthlyInstallations.total += basic;
          } else {
            if (region in monthlyInstallations) {
              monthlyInstallations[region as keyof RegionInstallations] +=
                device;
            }
            monthlyInstallations.total += device;
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
  }, [inProgressSystemData]);
  return (
    <Chart
      seriesType="column"
      categories={categories}
      series={series}
      stack={{ group: "a" }}
    />
  );
}
