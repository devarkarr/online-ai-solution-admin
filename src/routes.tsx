import { lazy, Suspense } from "react";
import { Route, Routes } from "react-router-dom";
import App from "./layouts/App";

const Login = lazy(() => import("@/pages/auth/login"));
export default function Router() {
  return (
    <Suspense>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<App />}></Route>
      </Routes>
    </Suspense>
  );
}
