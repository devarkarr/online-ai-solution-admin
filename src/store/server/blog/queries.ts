import axios, { authJsonHeader } from "@/api/axios";
import { useQuery } from "@tanstack/react-query";
import { BlogSchema } from "./schema";
import getParams from "@/utils/getParams";

const getBlogs = async (payload: ApiPayload) => {
  const params = getParams(payload);
  const response = await axios.get(`admin/blogs?${params}`, {
    headers: authJsonHeader(),
  });

  return BlogSchema.parse(response.data);
};

export const useGetBlogs = (payload: ApiPayload) =>
  useQuery({
    queryKey: ["get-blogs", payload],
    queryFn: () => getBlogs(payload),
    select: (data) => data._data,
  });
