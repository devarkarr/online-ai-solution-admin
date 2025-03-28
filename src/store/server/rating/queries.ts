import axios, { authJsonHeader } from "@/api/axios";
import { useQuery } from "@tanstack/react-query";
import { RatingSchema } from "./schema";
import getParams from "@/utils/getParams";

const getRatings = async (payload: ApiPayload) => {
  const params = getParams(payload);
  const response = await axios.get(`admin/ratings?${params}`, {
    headers: authJsonHeader(),
  });

  return RatingSchema.parse(response.data);
};

export const useGetRatings = (payload: ApiPayload) =>
  useQuery({
    queryKey: ["get-ratings", payload],
    queryFn: () => getRatings(payload),
    select: (data) => data._data,
  });
