import axios from "axios"
import useStore from "@/client-store/useStore"

const BASE_URL = import.meta.env.VITE_BASE_URL

export default axios.create({ baseURL: BASE_URL })

export const authJsonHeader = (file?: boolean) => {
  return {
    "Content-Type": file ? "multipart/form-data" : "Application/json",
    Accept: "application/json",
    Authorization: `Bearer ${useStore.getState().auth.accessToken}`,
  }
}
