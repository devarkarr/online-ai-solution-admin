import axios, { authJsonHeader } from "@/api/axios";
import { useQuery } from "@tanstack/react-query";
import { EventSchema } from "./schema";

const getEvents = async () => {
  const response = await axios.get("admin/events", {
    headers: authJsonHeader(),
  });

  return EventSchema.parse(response.data);
};

export const useGetEvents = () =>
  useQuery({
    queryKey: ["get-events"],
    queryFn: () => getEvents(),
    select: (data) => data._data,
  });
