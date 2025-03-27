import axios, { authJsonHeader } from "@/api/axios";
import { useQuery } from "@tanstack/react-query";
import { EventSchema } from "./schema";
import getParams from "@/utils/getParams";

const getEvents = async (payload: ApiPayload) => {
  const params = getParams(payload);
  const response = await axios.get(`admin/events?${params}`, {
    headers: authJsonHeader(),
  });

  return EventSchema.parse(response.data);
};

export const useGetEvents = (payload: ApiPayload) =>
  useQuery({
    queryKey: ["get-events", payload],
    queryFn: () => getEvents(payload),
    select: (data) => data._data,
  });
