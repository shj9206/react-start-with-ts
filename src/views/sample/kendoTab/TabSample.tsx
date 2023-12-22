import TabComponent from "@/components/kendo/tap/TabComponent.tsx";
import MyAccount from "@/views/account/MyAccount.tsx";
import DashBoard from "@/views/dashboard/DashBoard.tsx";

function TabSample() {
  const testTabList = [
    {
      title: "test1",
      children: <MyAccount />,
    },
    {
      title: "test2",
      children: <DashBoard />,
    },
  ];
  return <TabComponent tabList={testTabList} />;
}

export default TabSample;
