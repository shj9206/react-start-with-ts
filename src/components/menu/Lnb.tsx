import {
  Drawer,
  DrawerContent,
  DrawerSelectEvent,
} from "@progress/kendo-react-layout";
import { Outlet, useNavigate } from "react-router-dom";
import { useState } from "react";

type LnbProps = {
  expanded: boolean;
};
export default function Lnb({ expanded }: LnbProps) {
  const navigate = useNavigate();
  const items = [
    { text: "Chart", icon: "k-i-inbox", selected: true },
    { text: "Grid", icon: "k-i-bell" },
    { text: "Form", icon: "k-i-calendar" },
    { text: "Tile", icon: "k-i-calendar" },
  ];
  const [selectedId, setSelectedId] = useState<number>(
    items.findIndex((x) => x.selected === true),
  );
  const handleSelect = (ev: DrawerSelectEvent) => {
    setSelectedId(ev.itemIndex);
    const target = items[ev.itemIndex].text;
    navigate(`/main/${target}`);
  };

  return (
    <Drawer
      expanded={expanded}
      position="start"
      mode="push"
      items={items.map((item, index) => ({
        ...item,
        selected: index === selectedId,
      }))}
      onSelect={handleSelect}
    >
      <DrawerContent>
        <Outlet />
      </DrawerContent>
    </Drawer>
  );
}
