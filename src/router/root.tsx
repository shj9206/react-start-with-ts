import { createBrowserRouter, Navigate } from "react-router-dom";
import { QueryClient } from "@tanstack/react-query";
import { lazy, Suspense } from "react";
import MainLayout from "@/layout/MainLayout.tsx";
import KendoChart, {
  loader as kendoChartLoader,
} from "@/views/sample/kendoChart/KendoChart.tsx";
import KendoForm from "@/views/sample/kendoForm/KendoFormTest.tsx";
import Tile from "@/views/sample/kendoTile/Tile.tsx";
import Sample1 from "@/pub/views/sample/Sample1.tsx";
import Sample2 from "@/pub/views/sample/Sample2.tsx";
import Root, {
  action as rootAction,
  loader as rootLoader,
} from "@/views/sample/routerSample/root.tsx";
import ErrorPage from "@/views/sample/routerSample/error-page.tsx";
import GridSample from "@/views/sample/gridSample/Index.tsx";
import Login from "@/views/sample/login/login.tsx";
import sampleRoute from "@/router/SampleRoute.tsx";

const DashBoard = lazy(() => import("@/views/dashboard/DashBoard.tsx"));
const FirmManage = lazy(() => import("@/views/fota/FirmManage.tsx"));
const FirmRegist = lazy(() => import("@/views/fota/FirmRegist.tsx"));
const FirmUpdate = lazy(() => import("@/views/fota/FirmUpdate.tsx"));
const FotaHis = lazy(() => import("@/views/fota/FotaHis.tsx"));
const FotaStat = lazy(() => import("@/views/fota/FotaStat.tsx"));
const CreatePack = lazy(() => import("@/views/fota/CreatePack.tsx"));
const FirmList = lazy(() => import("@/views/fota/FirmList.tsx"));

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 10,
    },
  },
});

const root = createBrowserRouter([
  {
    path: "/",
    element: <Navigate to="/login" replace />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/main",
    element: <MainLayout />,
    children: [
      {
        path: "Chart",
        element: <KendoChart />,
        loader: () => kendoChartLoader(queryClient),
      },
      {
        path: "Form",
        element: <KendoForm />,
      },
      { path: "Grid", element: <GridSample /> },
      { path: "Tile", element: <Tile /> },
      {
        path: "dashboard",
        children: [
          {
            path: "",
            element: <Navigate replace to="dashboard" />,
          },
          {
            path: "dashboard",
            element: (
              <Suspense>
                <DashBoard />
              </Suspense>
            ),
          },
        ],
      },
      {
        path: "userManage",

        children: [
          {
            path: "",
            element: <Navigate to="company" replace />,
          },
          {
            path: "company",
            element: (
              <Suspense>
                <GridSample />
              </Suspense>
            ),
          },
          {
            path: "branch",
            element: (
              <Suspense>
                <GridSample />
              </Suspense>
            ),
          },
          {
            path: "user",
            element: (
              <Suspense>
                <GridSample />
              </Suspense>
            ),
          },
        ],
      },

      {
        path: "fota",
        children: [
          {
            path: "",
            element: <Navigate to="firmRegist" replace />,
          },
          {
            path: "firmRegist",
            element: (
              <Suspense>
                <FirmRegist />
              </Suspense>
            ),
          },
          {
            path: "firmList",
            element: (
              <Suspense>
                <FirmList />
              </Suspense>
            ),
          },
          {
            path: "firmManage",
            element: (
              <Suspense>
                <FirmManage />
              </Suspense>
            ),
          },
          {
            path: "firmUpdate",
            element: (
              <Suspense>
                <FirmUpdate />
              </Suspense>
            ),
          },
          {
            path: "fotaStat",
            element: (
              <Suspense>
                <FotaStat />
              </Suspense>
            ),
          },
          {
            path: "fotaHis",
            element: (
              <Suspense>
                <FotaHis />
              </Suspense>
            ),
          },
          {
            path: "createPack",
            element: (
              <Suspense>
                <CreatePack />
              </Suspense>
            ),
          },
        ],
      },
      {
        path: "devise",
        element: (
          <Suspense>
            <DashBoard />
          </Suspense>
        ),
      },
      {
        path: "setting",
        element: (
          <Suspense>
            <DashBoard />
          </Suspense>
        ),
      },
    ],
  },
  {
    path: "/pub/sample/Sample1",
    element: <Sample1 />,
    errorElement: <div>Oops! There was an error.</div>,
  },
  {
    path: "/pub/sample/Sample2",
    element: <Sample2 />,
    errorElement: <div>Oops! There was an error.</div>,
  },
  {
    path: "/views/sample",
    element: <Root />,
    errorElement: <ErrorPage />,
    loader: rootLoader(queryClient),
    action: rootAction(queryClient),
    children: sampleRoute(),
  },
]);

export default root;
