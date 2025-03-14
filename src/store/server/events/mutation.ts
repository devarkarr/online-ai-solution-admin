import axios, { authJsonHeader } from "@/api/axios";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { EventPayload } from "./interface";
import transformFormData from "@/utils/transformFormData";
import showToastNoti from "@/utils/showToastNoti";

const createEvent = async (payload: EventPayload) => {
  const response = await axios.post("admin/event", transformFormData(payload), {
    headers: authJsonHeader(),
  });
  return response.data;
};

export const useEventMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (payload: EventPayload) => createEvent(payload),
    onSuccess: (data) => {
      if (data._metadata.statusCode === 201) {
        queryClient.invalidateQueries({ queryKey: ["get-events"] });
        showToastNoti(data._metadata.message, "success");
      }
    },
  });
};

const eventDelete = async (id: string) => {
  const response = await axios.delete(`admin/event/${id}`, {
    headers: authJsonHeader(),
  });
  return response.data;
};

export const useEventDelete = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => eventDelete(id),
    onSuccess: (data) => {
      console.log(data);
      queryClient.invalidateQueries({ queryKey: ["get-events"] });
      showToastNoti(data._metadata.message, "success");
    },
  });
};
