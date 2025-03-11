import axios, { authJsonHeader } from "@/api/axios";
import { useQuery } from "@tanstack/react-query";
import { InQuerySchema } from "./schema";

const getInQueries = async () => {
  const response = await axios.get("admin/user-inquries", {
    headers: authJsonHeader(),
  });

  return InQuerySchema.parse(response.data);
};

export const useGetInQueries = () =>
  useQuery({
    queryKey: ["get-inboxs"],
    queryFn: () => getInQueries(),
    select: (data) => data._data,
  });
