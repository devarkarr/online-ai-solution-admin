import axios from "@/api/axios";
import { LoginPayload } from "./interface";
import { useMutation } from "@tanstack/react-query";

const login = async (payload: LoginPayload) => {
  const response = await axios.post("", payload);
  return response.data;
};

export const useLogin = () =>
  useMutation({
    mutationFn: (payload: LoginPayload) => login(payload),
    onSuccess: (data) => {
      console.log(data);
    },
  });
