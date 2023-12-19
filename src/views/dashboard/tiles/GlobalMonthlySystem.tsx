import { useEffect, useMemo, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import Chart from "@/components/kendo/chart/Chart.tsx";
import {
  DashboardResult,
  getInstallNumByMonth,
  InstalledMonth,
} from "@/utils/apiService/dashboardService.ts";

type Series = {
  name: string;
  data: number[];
};

const getInstallNumByMonthQuery = () => ({
  queryKey: ["installNumByMonth"],
  queryFn: async () => {
    const result = await getInstallNumByMonth();
    return result as DashboardResult;
  },
});

export default function GlobalMonthlySystem() {
  const [series, setSeries] = useState<Series[]>([]);
  const categories = ["Total", "EU", "US", "AU"];
  const month = useMemo(() => ["Jul", "Aug", "Sep", "Dec", "Otc"], []);
  const { data: installNumByMonth } = useQuery<DashboardResult, Error>(
    getInstallNumByMonthQuery(),
  );
  const installNumByMonthData = installNumByMonth
    ? (installNumByMonth.data as InstalledMonth[])
    : null;

  useEffect(() => {
    type RegionInstallations = {
      total: number;
      eu: number;
      us: number;
      au: number;
    };
    if (Array.isArray(installNumByMonthData)) {
      console.log("installNumByMonthData", installNumByMonthData);
      const aggregatedData = month.map((mon) => {
        const monthlyInstallations: RegionInstallations = {
          total: 0,
          eu: 0,
          us: 0,
          au: 0,
        };

        installNumByMonthData.forEach(
          ({ region, month: dataMonth, install }) => {
            if (dataMonth === mon) {
              if (region in monthlyInstallations) {
                monthlyInstallations[region as keyof RegionInstallations] +=
                  install;
              }
              monthlyInstallations.total += install;
            }
          },
        );

        return {
          name: mon,
          data: [
            monthlyInstallations.total,
            monthlyInstallations.eu,
            monthlyInstallations.us,
            monthlyInstallations.au,
          ],
        };
      });
      console.log("aggregatedData", aggregatedData);
      setSeries(aggregatedData);
    }
  }, [installNumByMonthData, month]);
  return <Chart seriesType="column" categories={categories} series={series} />;
}
