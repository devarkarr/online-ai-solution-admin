import axios, { authJsonHeader } from "@/api/axios";
import { useQuery } from "@tanstack/react-query";

const getInQueries = async () => {
  const response = await axios.get("admin/user-inquries", {
    headers: authJsonHeader(),
  });

  return response.data;
};

export const useGetInQueries = () =>
  useQuery({
    queryKey: ["get-inboxs"],
    queryFn: () => getInQueries(),
  });
