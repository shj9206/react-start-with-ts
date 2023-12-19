import { useEffect, useMemo, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import Chart from "@/components/kendo/chart/Chart.tsx";
import { getRegionSeries } from "@/utils/common.ts";
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

export default function GlobalNumberSystem() {
  const categories = ["Total", "EU", "US", "AU"];
  const [series, setSeries] = useState<Series[]>([]);
  const { data: inProgressSystem } = useQuery<DashboardResult, Error>(
    getInProgressDashboardQuery(),
  );
  const inProgressSystemData = inProgressSystem
    ? (inProgressSystem.data as InProgressSystem[])
    : null;
  console.log("inProgressSystemData", inProgressSystemData);
  const basicInfoData = useMemo(
    () => [
      {
        region: "eu",
      },
      {
        region: "us",
      },
      {
        region: "au",
      },
      {
        region: "eu",
      },
      {
        region: "us",
      },
      {
        region: "eu",
      },
    ],
    [],
  );
  const deviceInfoData = useMemo(
    () => [
      {
        region: "eu",
      },
      {
        region: "us",
      },
      {
        region: "au",
      },
      {
        region: "eu",
      },
      {
        region: "us",
      },
      {
        region: "eu",
      },
    ],
    [],
  );

  useEffect(() => {
    let basicTemp: { name: string; data: number[] } = {
      name: "Basic Info",
      data: [],
    };
    let deviceTemp: { name: string; data: number[] } = {
      name: "Device Info",
      data: [],
    };
    if (basicInfoData) {
      basicTemp = getRegionSeries(basicInfoData, "Basic Info");
    }
    if (deviceInfoData) {
      deviceTemp = getRegionSeries(deviceInfoData, "Device Info");
    }
    console.log("deviceTemp", deviceTemp);
    setSeries([basicTemp, deviceTemp]);
  }, [basicInfoData, deviceInfoData]);
  return (
    <Chart
      seriesType="column"
      categories={categories}
      series={series}
      stack={{ group: "a" }}
    />
  );
}
