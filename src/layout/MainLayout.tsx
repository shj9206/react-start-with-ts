import StatusBar from "@/components/menu/StatusBar.tsx";
import Gnb from "@/components/menu/Gnb.tsx";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function MainLayout() {
  const navigate = useNavigate();

  return (
    <>
      <StatusBar />
      <Gnb />
      <style>{`
                body {
                    background: #dfdfdf;
                }
                .title {
                    font-size: 18px;
                    margin: 0;
                }
           
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
