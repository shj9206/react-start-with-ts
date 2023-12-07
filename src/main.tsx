import * as ReactDOM from "react-dom/client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "@/store";
import "@/utils/i18n";

import "./index.css";
import Root, {
  action as rootAction,
  loader as rootLoader,
} from "@/views/sample/routerSample/root.tsx";
import Contact, {
  action as contactAction,
  loader as contactLoader,
} from "@/views/sample/routerSample/contact.tsx";
import EditContact, {
  action as editAction,
} from "@/views/sample/routerSample/edit.tsx";
import { action as destroyAction } from "@/views/sample/routerSample/destroy.tsx";
import Index from "@/views/sample/routerSample";
import ErrorPage from "@/views/sample/routerSample/error-page.tsx";
import LocaleSample from "@/views/sample/localeSample/LocaleSample";
import StoreSampe from "@/views/sample/storeSample/storeSample";
import ApiTest from "@/views/sample/apiTest/ApiTest";
import GridSample from "@/views/sample/gridSample/Index";
import MapSample from "@/views/sample/mapSample/MapSample";
import KendoForm from "@/views/sample/kendoForm/KendoFormTest";
import Profile, {
  loader as profileLoader,
} from "@/views/sample/kendoForm/Profile";
import { Login } from "@/views/sample/login/login";
import { MainLayout } from "@/views/sample/main/mainLayout";
import Sample1 from "@/pub/views/sample/Sample1";
import Sample2 from "@/pub/views/sample/Sample2";
import KendoChart from "@/views/sample/kendoChart/KendoChart.tsx";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 10,
    },
  },
});

const router = createBrowserRouter([
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
    children: [
      { index: true, element: <Index /> },
      {
        path: "/views/sample/contacts/:contactId",
        element: <Contact />,
        loader: () => contactLoader(queryClient),
        action: () => contactAction(queryClient),
      },
      {
        path: "/views/sample/contacts/:contactId/edit",
        element: <EditContact />,
        loader: () => contactLoader(queryClient),
        action: () => editAction(queryClient),
      },
      {
        path: "/views/sample/contacts/:contactId/destroy",
        action: () => destroyAction(queryClient),
        errorElement: <div>Oops! There was an error.</div>,
      },
      { path: "/views/sample/store", element: <StoreSampe /> },
      { path: "/views/sample/locale", element: <LocaleSample /> },
      { path: "/views/sample/api", element: <ApiTest /> },
      // { path: "/views/sample/gridSample", element:(<PrivateRoute> <GridSample /> </PrivateRoute>)},
      { path: "/views/sample/gridSample", element: <GridSample /> },
      {
        path: "/views/sample/map",
        element: <MapSample latitude={37.56} longitude={127.0016} />,
      },
      { path: "/views/sample/kendoForm", element: <KendoForm /> },
      {
        path: "/views/sample/profile/:userId",
        element: <Profile />,
        loader: () => profileLoader(queryClient),
      },
      {
        path: "/views/sample/kendoChart",
        element: <KendoChart />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <QueryClientProvider client={queryClient}>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </QueryClientProvider>,
);
