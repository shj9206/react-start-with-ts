import { useQuery } from "@tanstack/react-query";
import { useLayoutEffect, useState } from "react";
import {
  DashboardResult,
  getSystemInfo,
  SystemType,
} from "@/utils/apiService/dashboardService.ts";

const getSystemInfoQuery = () => ({
  queryKey: ["system"],
  queryFn: async () => {
    const result = await getSystemInfo();
    return result as DashboardResult;
  },
});
export default function System() {
  const { data: systemInfo } = useQuery<DashboardResult, Error>(
    getSystemInfoQuery(),
  );
  const systemInfoData = systemInfo ? (systemInfo.data as SystemType) : null;
  const [system, setSystem] = useState({
    total: 0,
    normal: 0,
    disconnect: 0,
    alert: 0,
  });
  useLayoutEffect(() => {
    if (systemInfoData) {
      setSystem(systemInfoData);
    }
  }, [systemInfoData]);
  return (
    <div>
      <h3>System Total {system.total}</h3>
      <h5>Normal {system.normal}</h5>
      <h5>Disconnect {system.disconnect}</h5>
      <h5>Alert {system.alert}</h5>
    </div>
  );
}
