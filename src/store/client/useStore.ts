import { create } from "zustand";
import createAuthSlice, { AuthSlice } from "./authSlice";

/**
 * Global Client Store
 * @example const something = useStore((state) => ({ auth: state.auth }))
 */
export const useStore = create<AuthSlice>((...a) => ({
  ...createAuthSlice(...a),
}));

/**
 * Auth Store Hook (Facade)
 * @example const { auth, setAuth, resetAuth } = useAuthStore()
 */
export function useAuthStore() {
  const { auth, setAuth, resetAuth } = useStore((state) => ({
    // Auth states
    auth: state.auth,
    setAuth: state.setAuth,
    resetAuth: state.resetAuth,
  }));

  return { auth, setAuth, resetAuth };
}

export default useStore;
