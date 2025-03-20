import { createContext, useContext } from "react";
import { UserRole, ProductsByBrand, Product } from "../types";
import { UseMutateFunction } from "@tanstack/react-query";

interface GlobalContextType {
  role: UserRole | null;
  handleSetRole(role: UserRole): void;
  menuStatus: boolean;
  handleChangeMenuStatus(): void;
  productsListed: ProductsByBrand | null;
  allProducts: Product[] | null;
  brands: string[] | null;
  deleteProduct: UseMutateFunction<void, Error, string, unknown>;
}

export const GlobalContext = createContext<GlobalContextType>({
  role: null,
  handleSetRole: () => {},
  menuStatus: false,
  handleChangeMenuStatus: () => {},
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
