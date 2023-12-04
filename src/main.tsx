import * as ReactDOM from "react-dom/client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  createBrowserRouter,
  RouterProvider,
  Navigate,
} from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "@/store";
import "@/utils/i18n";

import "./index.css";
import Root, {
  loader as rootLoader,
  action as rootAction,
} from "@/views/sample/root";
import Contact, {
  loader as contactLoader,
  action as contactAction,
} from "@/views/sample/contact";
import EditContact, { action as editAction } from "@/views/sample/edit";
import { action as destroyAction } from "@/views/sample/destroy";
import Index from "@/views/sample/index";
import ErrorPage from "@/views/sample/error-page";
import LocaleSample from "@/views/localeSample/LocaleSample";
import StoreSampe from "@/views/storeSample/storeSample";
import ApiTest from "./views/apiTest/ApiTest";
import GridSample from "@/views/gridSample/Index";
import KendoForm from "@/views/sample/kendoForm/KendoFormTest";
import Profile from "@/views/sample/kendoForm/Profile";

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
    element: <Navigate to="/views/sample" replace />,
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
      { path: "/views/sample/gridSample", element: <GridSample /> },
      { path: "/views/sample/kendoForm", element: <KendoForm /> },
      { path: "/views/sample/profile", element: <Profile /> },
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
