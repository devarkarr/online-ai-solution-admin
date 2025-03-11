import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "@mantine/core/styles.css";
import { MantineProvider } from "@mantine/core";
import { theme } from "./styles/theme.ts";
import "@mantine/notifications/styles.css";
import "@mantine/nprogress/styles.css";
import { NavigationProgress } from "@mantine/nprogress";
import { Notifications } from "@mantine/notifications";
import "./styles/global.css";
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
import showToastNoti from "./utils/showToastNoti.tsx";
import useStore from "@/client-store/useStore.ts";

const router = createBrowserRouter(
  createRoutesFromElements(<Route path="/*" element={<Router />} />)
);

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: (_, error) => {
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
        showToastNoti("Session expired!", "error");
        useStore.getState().resetAuth();
      }
      if (error instanceof AxiosError && error.response?.status === 403) {
        router.navigate("/forbidden", { replace: true });
      }
    },
  }),
});

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <MantineProvider theme={theme} defaultColorScheme="auto">
        <NavigationProgress />
        <Notifications
          position="bottom-center"
          mb={64}
          w="auto"
          zIndex="var(--mantine-z-index-max)"
        />
        <RouterProvider router={router} />
      </MantineProvider>
    </QueryClientProvider>
  </StrictMode>
);
