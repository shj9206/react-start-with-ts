import { useQuery } from "@tanstack/react-query";
import { useLayoutEffect, useState } from "react";
import {
  DashboardResult,
  getInfoByGroup,
  GroupInfoType,
} from "@/utils/apiService/dashboardService.ts";

const getInfoByGroupQuery = () => ({
  queryKey: ["group"],
  queryFn: async () => {
    const result = await getInfoByGroup();
    return result as DashboardResult;
  },
});
export default function Group() {
  const { data: groupInfo } = useQuery<DashboardResult, Error>(
    getInfoByGroupQuery(),
  );
  const groupInfoData = groupInfo ? (groupInfo.data as GroupInfoType) : null;
  const [state, setState] = useState({
    groupname: "",
    groupid: "",
    systems: [
      {
        name: "",
        code: "",
        model: "",
        status: "",
        connection: "",
      },
    ],
  });
  useLayoutEffect(() => {
    console.log("groupInfoData", groupInfoData);
    if (groupInfoData) {
      setState(groupInfoData);
    }
  }, [groupInfoData]);
  return (
    <div>
      <h3>Group Name {state.groupname}</h3>

      {state.systems.map((el) => (
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "flex-start",
            gap: "10px",
          }}
        >
          <h5>{el.name}</h5>
          <h5>{el.model}</h5>
          <h5>{el.code}</h5>
          <h5>{el.connection}</h5>
          <h5>{el.status}</h5>
        </div>
      ))}
    </div>
  );
}
