import { create } from "zustand";
import axios from "axios";

const useMedicineStore = create((set) => ({
  medicines: [],

  fetchMedicines: async () => {
    const response = await axios.get(
      "http://localhost:5000/api/medicines"
    );

    set({
      medicines: response.data,
    });
  },
}));

export default useMedicineStore;