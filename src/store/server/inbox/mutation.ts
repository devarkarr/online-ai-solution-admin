import axios, { authJsonHeader } from "@/api/axios";
import getParams from "@/utils/getParams";
import showToastNoti from "@/utils/showToastNoti";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const inquriesDelete = async (id: string) => {
  const response = await axios.delete(`admin/user-inquries/${id}`, {
    headers: authJsonHeader(),
  });
  return response.data;
};

export const useInQueriesDelete = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => inquriesDelete(id),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["get-inboxs"] });
      showToastNoti(data._metadata.message, "success");
    },
  });
};

const inquriesSeen = async (id: string) => {
  const response = await axios.put(
    `admin/user-inqury/${id}`,
    {},
    {
      headers: authJsonHeader(),
    }
  );
  return response.data;
};

export const useInQueriesSeen = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => inquriesSeen(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["get-inboxs"] });
      queryClient.invalidateQueries({ queryKey: ["get-inboxs-total"] });
    },
  });
};

const exportInqueryExcel = async (payload: ApiPayload) => {
  const params = getParams(payload);
  const response = await axios.post(
    `admin/user-inquries/excel?${params}`,
    {},
    {
      headers: authJsonHeader(),
    }
  );

  return response.data;
};

export const useExportInqueryExcel = () =>
  useMutation({
    mutationFn: (payload: ApiPayload) => exportInqueryExcel(payload),
    onSuccess: (data) => {
      const link = document.createElement("a");
      link.href = data._data;
      link.setAttribute("download", `user-inquries.xlsx`); //or any other extension
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    },
  });
