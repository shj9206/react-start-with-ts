import { useQuery } from "@tanstack/react-query";
import { useLayoutEffect, useState } from "react";
import {
  DashboardResult,
  getAlarmInfo,
  AlarmType,
} from "@/utils/apiService/dashboardService.ts";

const getAlarmInfoQuary = () => ({
  queryKey: ["alarm"],
  queryFn: async () => {
    const result = await getAlarmInfo();
    return result as DashboardResult;
  },
});

export default function Alert() {
  const { data: alarmInfo } = useQuery<DashboardResult, Error>(
    getAlarmInfoQuary(),
  );
  const alarmInfoData = alarmInfo ? (alarmInfo.data as AlarmType) : null;
  const [state, setState] = useState({
    warning: 0,
    error: 0,
    fault: 0,
    open: 0,
    closed: 0,
  });
  useLayoutEffect(() => {
    if (alarmInfoData) {
      setState(alarmInfoData);
    }
  }, [alarmInfoData]);
  return (
    <div>
      <h3>Alert Total {state.warning + state.error + state.fault}</h3>
      <h5>Warning {state.warning}</h5>
      <h5>Error {state.error}</h5>
      <h5>Fault {state.fault}</h5>
    </div>
  );
}
