import {
  TileLayout,
  TileLayoutRepositionEvent,
} from "@progress/kendo-react-layout";
import { useState } from "react";
import SystemMap from "@/views/dashboard/tiles/SystemMap.tsx";

export default function SystemDashBoard() {
  const [data, setData] = useState<
    Array<{ col: number; colSpan: number; rowSpan: number }>
  >([
    { col: 1, colSpan: 2, rowSpan: 1 },
    { col: 3, colSpan: 2, rowSpan: 2 },
    { col: 1, colSpan: 2, rowSpan: 1 },
    { col: 1, colSpan: 2, rowSpan: 2 },
    { col: 3, colSpan: 2, rowSpan: 2 },
    { col: 1, colSpan: 2, rowSpan: 2 },
    { col: 3, colSpan: 2, rowSpan: 2 },
  ]);
  const tiles = [
    {
      header: "System",
      body: <div>System</div>,
    },
    {
      header: "System Map",
      body: <SystemMap />,
    },
    {
      header: "Alert",
      body: <div>Alert</div>,
    },
    {
      header: "In progress",
      body: <div>Alert</div>,
    },
    {
      header: "Notice",
      body: <div>Notice</div>,
    },
    {
      header: "Group",
      body: <div>Notice</div>,
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
