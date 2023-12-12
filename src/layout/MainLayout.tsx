import { useState } from "react";

import StatusBar from "@/components/menu/StatusBar.tsx";
import Gnb from "@/components/menu/Gnb.tsx";
import Lnb from "@/components/menu/Lnb.tsx";

export default function MainLayout() {
  const [expanded, setExpanded] = useState<boolean>(true);

  return (
    <>
      <StatusBar />
      <Gnb setExpanded={setExpanded} />

      <Lnb expanded={expanded} />
      <style>{`
                body {
                    background: #dfdfdf;
                }
                .title {
                    font-size: 18px;
                    margin: 0;
                }
                // ul {
                //     font-size: 14px;
                //     list-style-type: none;
                //     padding: 0;
                //     margin: 0;
                //     display: flex;
                // }
                // li {
                //     margin: 0 10px;
                // }
                li:hover {
                    cursor: pointer;
                    color: #84cef1;
                }
                .k-button k-button-md k-rounded-md k-button-solid k-button-solid-base {
                    padding: 0;
                }
                .k-badge-container {
                    margin-right: 8px;
                }
                .k-drawer-content { padding: 20px; }
                .k-drawer-container {
                    position: fixed;
                    width: 100%;
                    height: 100%;
                }
                .k-drawer-item {
                    user-select: none;
                }
            `}</style>
    </>
  );
}
