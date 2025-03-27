import axios, { authJsonHeader } from "@/api/axios";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { BlogPayload } from "./interface";
import transformFormData from "@/utils/transformFormData";
import showToastNoti from "@/utils/showToastNoti";

const createBlog = async (payload: BlogPayload) => {
  console.log(payload);
  const response = await axios.post("admin/blog", transformFormData(payload), {
    headers: authJsonHeader(),
  });
  return response.data;
};

export const useCreateBlog = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (payload: BlogPayload) => createBlog(payload),
    onSuccess: (data) => {
      if (data._metadata.statusCode === 201) {
        queryClient.invalidateQueries({ queryKey: ["get-blogs"] });
        showToastNoti(data._metadata.message, "success");
      }
    },
  });
};

const blogDelete = async (id: string) => {
  const response = await axios.delete(`admin/blog/${id}`, {
    headers: authJsonHeader(),
  });
  return response.data;
};

export const useBlogDelete = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => blogDelete(id),
    onSuccess: (data) => {
      console.log(data);
      queryClient.invalidateQueries({ queryKey: ["get-blogs"] });
      showToastNoti(data._metadata.message, "success");
    },
  });
};
