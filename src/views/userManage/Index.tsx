import { useSelector } from "react-redux";
import HqUserManage from "@/views/userManage/HqUserManage";
import LegionAdminAdd from "@/views/userManage/LegionAdminAdd";
import LegionAdminDetail from "@/views/userManage/LegionAdminDetail";

export default function Index() {
  const region = useSelector(({ auth }) => auth.region);
  // return <div>{region}</div>;
  return (
    <div>
      {region === "HQ" || region === null ? (
        <HqUserManage />
      ) : (
        <>
          <LegionAdminAdd />
          <LegionAdminDetail />
        </>
      )}
    </div>
  );
}
