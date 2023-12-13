import { useSelector } from "react-redux";
import DashBoard from "@/views/dashboard/DashBoard.tsx";
import SystemDashBoard from "@/views/dashboard/SystemDashBoard.tsx";

export default function Index() {
  const region = useSelector(({ auth }) => auth.region);
  return (
    <div>
      {region === "HQ" || region === null ? <DashBoard /> : <SystemDashBoard />}
    </div>
  );
}
