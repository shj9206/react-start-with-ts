import { QueryClient } from "@tanstack/react-query";
import Index from "@/views/sample/routerSample";
import Contact, {
  action as contactAction,
  loader as contactLoader,
} from "@/views/sample/routerSample/contact.tsx";
import EditContact, {
  action as editAction,
} from "@/views/sample/routerSample/edit.tsx";
import { action as destroyAction } from "@/views/sample/routerSample/destroy.tsx";
import StoreSampe from "@/views/sample/storeSample/storeSample.tsx";
import LocaleSample from "@/views/sample/localeSample/LocaleSample.tsx";
import ApiTest from "@/views/sample/apiTest/ApiTest.tsx";
import GridSample from "@/views/sample/gridSample/Index.tsx";
import MapComponent from "@/views/sample/mapSample/MapComponent.tsx";
import KendoForm from "@/views/sample/kendoForm/KendoFormTest.tsx";
import Profile, {
  loader as profileLoader,
} from "@/views/sample/kendoForm/Profile.tsx";
import KendoChart, {
  loader as kendoChartLoader,
} from "@/views/sample/kendoChart/KendoChart.tsx";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 10,
    },
  },
});
export default function SampleRoute() {
  return [
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
      // element: <MapSample latitude={37.56} longitude={127.0016} />,
      element: <MapComponent />,
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
      loader: () => kendoChartLoader(queryClient),
    },
  ];
}
