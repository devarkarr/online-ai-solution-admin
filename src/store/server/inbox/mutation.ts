import axios, { authJsonHeader } from "@/api/axios";
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
