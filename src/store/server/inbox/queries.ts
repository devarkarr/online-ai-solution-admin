import axios, { authJsonHeader } from "@/api/axios";
import { useQuery } from "@tanstack/react-query";
import { InQuerySchema } from "./schema";
import { InQueryPayload } from "./interface";
import getParams from "@/utils/getParams";

const getInQueries = async (payload: InQueryPayload) => {
  console.log(payload);
  const params = getParams(payload);
  const response = await axios.get(`admin/user-inquries?${params}`, {
    headers: authJsonHeader(),
  });

  return InQuerySchema.parse(response.data);
};

export const useGetInQueries = (payload: InQueryPayload) =>
  useQuery({
    queryKey: ["get-inboxs", payload],
    queryFn: () => getInQueries(payload),
    select: (data) => data._data,
  });

const getInQueriesTotal = async ({
  dateFilter,
}: {
  dateFilter?: string | null;
}) => {
  const params = dateFilter ? dateFilter : "";
  const response = await axios.get(`admin/user-inquries/total?${params}`, {
    headers: authJsonHeader(),
  });

  return response.data;
};

export const useGetInQueriesTotal = (payload: { dateFilter?: string | null }) =>
  useQuery({
    queryKey: ["get-inboxs-total", payload],
    queryFn: () => getInQueriesTotal(payload),
    select: (data) => data._data,
  });
