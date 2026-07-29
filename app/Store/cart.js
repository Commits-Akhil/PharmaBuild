import { create } from "zustand";

const useCartStore = create((set) => ({
  cart: [],

  addToCart: (medicineId) =>
    set((state) => {
      const medicine = state.cart.find(
        (item) => item.medicineId === medicineId
      );

      if (medicine) {
        medicine.quantity++;
      } else {
        state.cart.push({
          medicineId,
          quantity: 1,
        });
      }

      return {
        cart: [...state.cart],
      };
    }),
}));

export default useCartStore;