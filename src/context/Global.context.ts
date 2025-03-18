import { createContext, useContext } from "react";
import { UserRole, ProductsByBrand, Product } from "../types";
import { UseMutateFunction } from "@tanstack/react-query";

interface GlobalContextType {
  role: UserRole | null;
  setRole: React.Dispatch<React.SetStateAction<UserRole>>;
  productsListed: ProductsByBrand | null;
  allProducts: Product[] | null;
  brands: string[] | null;
  deleteProduct: UseMutateFunction<void, Error, string, unknown>;
}

export const GlobalContext = createContext<GlobalContextType>({
  role: null,
  setRole: () => {},
  productsListed: null,
  allProducts: null,
  brands: null,
  deleteProduct: () => {},
});

export const useGlobalContext = () => {
  const context = useContext(GlobalContext);

  if (!context.role && context.role !== "") {
    throw new Error(
      "GlobalContext must be used within a GlobalContextProvider",
    );
  }

  return context;
};
