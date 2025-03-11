import { lazy, Suspense } from "react";
import { Route, Routes } from "react-router-dom";
import AppLoader from "./layouts/AppLoader";

const App = lazy(() => import("@/layouts/App"));
const Login = lazy(() => import("@/pages/auth/login"));
const InQuery = lazy(() => import("@/pages/in-query"));

export default function Router() {
  return (
    <Suspense fallback={<AppLoader />}>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<App />}>
          <Route path="in-query" element={<InQuery />} />
          <Route path="ecommerce-app" element={<InQuery />} />
        </Route>
      </Routes>
    </Suspense>
  );
}
