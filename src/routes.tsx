import { lazy, Suspense } from "react";
import { Route, Routes } from "react-router-dom";
import AppLoader from "./layouts/AppLoader";
import RequiredAuth from "./pages/auth/required-auth";

const App = lazy(() => import("@/layouts/App"));
const Login = lazy(() => import("@/pages/auth/login"));
const InQuery = lazy(() => import("@/pages/in-query"));
const Event = lazy(() => import("@/pages/events"));

export default function Router() {
  return (
    <Suspense fallback={<AppLoader />}>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route element={<RequiredAuth />}>
          <Route path="/" element={<App />}>
            <Route path="in-query" element={<InQuery />} />
            <Route path="event" element={<Event />} />
            <Route path="ecommerce-app" element={<InQuery />} />
          </Route>
        </Route>
      </Routes>
    </Suspense>
  );
}
