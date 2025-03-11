import Cookies from "js-cookie";
import { StateCreator } from "zustand";

type Auth = {
  accessToken: string;
};

export interface AuthSlice {
  auth: Auth;
  setAuth: (auth: Auth) => void;
  resetAuth: () => void;
}

const initialAuth = { accessToken: "" };

const createAuthSlice: StateCreator<AuthSlice> = (set) => {
  const cookieState = Cookies.get("accessToken");
  const initialAuthState = cookieState ? JSON.parse(cookieState) : initialAuth;
  return {
    auth: initialAuthState,
    setAuth: (auth) =>
      set((state) => {
        Cookies.set("accessToken", JSON.stringify(auth), {
          expires: 7,
          path: "/",
        });
        return { ...state, auth };
      }),
    resetAuth: () =>
      set((state) => {
        Cookies.remove("accessToken");
        return { ...state, auth: initialAuth };
      }),
  };
};

export default createAuthSlice;
