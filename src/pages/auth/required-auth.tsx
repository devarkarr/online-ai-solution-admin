import { useEffect, useState } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { LoadingOverlay } from "@mantine/core";
import useStore from "@/store/client/useStore";
import { getProfile } from "@/api/auth";

export default function RequiredAuth() {
  const { auth } = useStore();
  const [authenticated, setAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  // Validate Token
  useEffect(() => {
    if (auth.accessToken) {
      const fetchData = async () => {
        try {
          const response = await getProfile();
          setAuthenticated(
            response._metadata.statusCode === 200 ? true : false
          );
          setLoading(false);
        } catch {
          setAuthenticated(false);
          setLoading(false);
        }
      };

      fetchData();
    } else {
      setAuthenticated(false);
      setLoading(false);
    }
  }, [auth.accessToken]);

  if (!loading && authenticated) return <Outlet />;

  if (!loading && !authenticated) return <Navigate to="/login" replace />;

  return <LoadingOverlay visible={true} loaderProps={{ variant: "dots" }} />;
}
