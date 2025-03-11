import axios from "@/api/axios";
import { LoginPayload } from "./interface";
import { useMutation } from "@tanstack/react-query";
import useStore from "@/client-store/useStore";
import { useLocation, useNavigate } from "react-router-dom";
import showToastNoti from "@/utils/showToastNoti";

const login = async (payload: LoginPayload) => {
  const response = await axios.post("auth/login", payload);
  return response.data;
};

export const useLogin = () => {
  const { setAuth } = useStore();

  const navigate = useNavigate();
  const location = useLocation();

  const from = location.state?.from?.pathname || "/";
  return useMutation({
    mutationFn: (payload: LoginPayload) => login(payload),
    onSuccess: (data) => {
      console.log(data);
      if (data._metadata.statusCode === 200) {
        showToastNoti(data._metadata.message, "success");
        setAuth({ accessToken: data._data.token });
        navigate(from, { replace: true });
      }
    },
  });
};
