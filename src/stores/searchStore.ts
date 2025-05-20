import { create } from "zustand";

interface SearchStore {
  searchTerm: string;
  setSearchTerm: (SearchTerm: string) => void;
}

export const useSearchStore = create<SearchStore>((set) => ({
  searchTerm: "",
  setSearchTerm: (searchTerm) => set({ searchTerm: searchTerm }),
}));
