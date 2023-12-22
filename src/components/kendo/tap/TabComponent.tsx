import React, { useState } from "react";
import { TabStrip, TabStripTab } from "@progress/kendo-react-layout";

interface TabItem {
  title: string;
  children: React.ReactNode;
}

interface TabComponentProps {
  tabList: TabItem[];
}

function TabComponent({ tabList }: TabComponentProps) {
  const [tabSelected, setTabSelected] = useState(0);

  return (
    <TabStrip
      selected={tabSelected}
      animation={false}
      onSelect={(e) => setTabSelected(e.selected)}
      keepTabsMounted
    >
      {tabList.map((tab) => (
        <TabStripTab key={`tab_${tab.title}`} title={tab.title}>
          {tab.children}
        </TabStripTab>
      ))}
    </TabStrip>
  );
}

export default TabComponent;
