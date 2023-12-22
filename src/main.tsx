import * as ReactDOM from "react-dom/client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { RouterProvider } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "@/store";
import "@/utils/i18n.ts";
import root from "@/router/root.tsx";
import setupAuthMocks from "@/utils/apiService/mock/authMock.ts";
import setupAccountMocks from "@/utils/apiService/mock/accountMock.ts";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 10,
    },
  },
});
/* TODO MOCK SETUP - 최정훈 */
setupAuthMocks();
setupAccountMocks();

ReactDOM.createRoot(document.getElementById("root")!).render(
  <QueryClientProvider client={queryClient}>
    <Provider store={store}>
      <RouterProvider router={root} />
    </Provider>
  </QueryClientProvider>,
);
