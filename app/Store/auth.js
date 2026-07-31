import { create } from "zustand";
import api from "../lib/api";

const useAuthStore = create((set) => ({
  token: typeof window !== "undefined" ? localStorage.getItem("token") : null,
  user: null,

  setToken: (token) => {
    if (typeof window !== "undefined") localStorage.setItem("token", token);
    set({ token });
  },

  setUser: (user) => set({ user }),

  fetchProfile: async () => {
    try {
      const res = await api.get("/auth/profile");
      const u = res.data?.data?.user || res.data?.user;
      if (u) set({ user: u });
    } catch {
      set({ user: null });
    }
  },

  logout: () => {
    if (typeof window !== "undefined") localStorage.removeItem("token");
    set({ token: null, user: null });
  },
}));

export default useAuthStore;
