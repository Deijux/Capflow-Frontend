import { create } from "zustand";

interface BrandState {
  brands: string[];
  setBrands: (newBrands: string[]) => void;
}

export const useBrandStore = create<BrandState>((set) => ({
  brands: [],
  setBrands: (newBrands) => set({ brands: newBrands }),
}));
