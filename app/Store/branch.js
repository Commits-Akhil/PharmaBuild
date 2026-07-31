import { create } from "zustand";
import api from "../lib/api";

const useBranchStore = create((set) => ({
  branches: [],
  error: null,

  fetchBranches: async () => {
    try {
      const res = await api.get("/admin/branches");
      const list = res.data?.data?.branches || res.data?.branches || res.data;
      if (Array.isArray(list) && list.length > 0) {
        set({ branches: list, error: null });
        return;
      }
    } catch {}

    try {
      const res = await api.post("/orders/check-stock", {
        medicines: [{ medicineId: 1, quantity: 1 }],
      });
      const live = res.data?.availableBranches;
      if (Array.isArray(live) && live.length > 0) {
        set({
          branches: live.map((b) => ({
            id: b.branchId,
            name: b.branchName,
            address: b.branchName,
          })),
          error: null,
        });
        return;
      }
    } catch (err) {
      set({ branches: [], error: err.response?.data?.message || err.message || "Failed to load branches." });
    }
  },
}));

export default useBranchStore;

