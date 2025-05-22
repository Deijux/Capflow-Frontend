import { create } from "zustand";
import { productCartShop } from "../types";

interface cartShopState {
  cartShop: productCartShop[];
  setCartShop: (newCarItem: productCartShop[]) => void;
  deleteCartShop: (productId: string, size: string) => void;
}
export const useCartShopStore = create<cartShopState>((set) => ({
  cartShop: [],
  setCartShop: (newCarItem) => set({ cartShop: newCarItem }),
  deleteCartShop: (productId, size) =>
    set((state) => ({
      cartShop: state.cartShop.filter(
        (item) => !(item.productId === productId && item.size === size),
      ),
    })),
}));
