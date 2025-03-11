import axios, { authJsonHeader } from "./axios";

export const getProfile = async () => {
  const response = await axios.get("admin/me", {
    headers: authJsonHeader(),
  });
  return response.data;
};
