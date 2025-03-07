import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "@mantine/core/styles.css";
import { MantineProvider } from "@mantine/core";
import { theme } from "./styles/theme.ts";
import {
  QueryCache,
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";
import { AxiosError } from "axios";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import Router from "./routes.tsx";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: (failureCount, error) => {
        console.log(error);
        console.log(failureCount);
        return !(
          error instanceof AxiosError &&
          [401, 403].includes(error.response?.status ?? 0)
        );
      },
      refetchOnWindowFocus: import.meta.env.PROD,
    },
    mutations: {
      onError: (error) => {
        console.log(error);
      },
    },
  },
  queryCache: new QueryCache({
    onError: (error) => {
      if (error instanceof AxiosError && error.response?.status === 401) {
        // showToastNoti("Session expired!");
        // useStore.getState().resetAuth();
      }
      if (error instanceof AxiosError && error.response?.status === 403) {
        // router.navigate("/forbidden", { replace: true });
      }
    },
  }),
});

const router = createBrowserRouter(
  createRoutesFromElements(<Route path="/*" element={<Router />} />)
);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <MantineProvider
        theme={theme}
        defaultColorScheme="light"
        forceColorScheme="light"
      >
        <RouterProvider router={router} />
      </MantineProvider>
    </QueryClientProvider>
  </StrictMode>
);
