import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import {
  getInstallNumByModel,
  DashboardResult,
  InstalledModel,
} from "@/utils/apiService/dashboardService.ts";
import Chart from "@/components/kendo/chart/Chart.tsx";

type Series = {
  name: string;
  data: number[];
};

const getInstallNumByModelQuery = () => ({
  queryKey: ["installNumByModel"],
  queryFn: async () => {
    const result = await getInstallNumByModel();
    return result as DashboardResult;
  },
});

export default function GlobalNumberModel() {
  const categories = ["Total", "EU", "US", "AU"];
  const [series, setSeries] = useState<Series[]>([]);
  const { data: installNumByModel } = useQuery<DashboardResult, Error>(
    getInstallNumByModelQuery(),
  );
  const installNumByModelData = installNumByModel
    ? (installNumByModel.data as InstalledModel[])
    : null;
  useEffect(() => {
    type RegionInstallations = {
      total: number;
      eu: number;
      us: number;
      au: number;
    };
    if (Array.isArray(installNumByModelData)) {
      const modelList = installNumByModelData.map((el) => el.model);
      const uniqueModelList = Array.from(new Set(modelList));
      const aggregatedData = uniqueModelList.map((model) => {
        const monthlyInstallations: RegionInstallations = {
          total: 0,
          eu: 0,
          us: 0,
          au: 0,
        };
        installNumByModelData.forEach(
          ({ region, model: arryModel, install }) => {
            if (arryModel === model) {
              if (region in monthlyInstallations) {
                monthlyInstallations[region as keyof RegionInstallations] +=
                  install;
              }
              monthlyInstallations.total += install;
            }
          },
        );
        return {
          name: model,
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
  }, [installNumByModelData]);
  return <Chart seriesType="bar" categories={categories} series={series} />;
}
