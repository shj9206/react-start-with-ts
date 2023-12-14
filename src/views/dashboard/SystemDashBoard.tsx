import {
  TileLayout,
  TileLayoutRepositionEvent,
} from "@progress/kendo-react-layout";
import { useState } from "react";
import { Button } from "@progress/kendo-react-buttons";
import SystemMap from "@/views/dashboard/tiles/SystemMap.tsx";
import System from "@/views/dashboard/tiles/System.tsx";
import Alert from "@/views/dashboard/tiles/Alert.tsx";
import Inprogress from "@/views/dashboard/tiles/Inprogress.tsx";
import Notice from "@/views/dashboard/tiles/Notice.tsx";
import Group from "@/views/dashboard/tiles/Group.tsx";
import SearchSystem from "@/views/dashboard/tiles/SearchSystem.tsx";

export default function SystemDashBoard() {
  const [data, setData] = useState<
    Array<{ col: number; colSpan: number; rowSpan: number }>
  >([
    { col: 1, colSpan: 2, rowSpan: 1 },
    { col: 3, colSpan: 2, rowSpan: 2 },
    { col: 1, colSpan: 2, rowSpan: 1 },
    { col: 1, colSpan: 2, rowSpan: 2 },
    { col: 3, colSpan: 2, rowSpan: 1 },
    { col: 1, colSpan: 2, rowSpan: 2 },
    { col: 3, colSpan: 2, rowSpan: 2 },
  ]);
  const [state, setState] = useState({
    selectGroupPopup: false,
  });
  const selectGroupPop = () => {
    setState((prevState) => ({
      ...prevState,
      selectGroupPopup: !prevState.selectGroupPopup,
    }));
    alert(state.selectGroupPopup);
  };
  const tiles = [
    {
      header: "System",
      body: <System />,
    },
    {
      header: "System Map",
      body: <SystemMap />,
    },
    {
      header: "Alert",
      body: <Alert />,
    },
    {
      header: "In progress",
      body: <Inprogress />,
    },
    {
      header: "Search System",
      body: <SearchSystem />,
    },
    {
      header: "Notice",
      body: <Notice />,
    },
    {
      header: (
        <div>
          Group
          <span style={{ float: "right" }}>
            <Button onClick={() => selectGroupPop()}>Select Group</Button>
          </span>
        </div>
      ),
      body: <Group />,
    },
  ];
  const handleReposition = (e: TileLayoutRepositionEvent) => {
    setData(e.value);
  };
  return (
    <TileLayout
      columns={4}
      rowHeight={255}
      positions={data}
      gap={{ rows: 10, columns: 10 }}
      items={tiles}
      onReposition={handleReposition}
    />
  );
}
