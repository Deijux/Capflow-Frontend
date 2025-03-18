import { createContext, useContext } from "react";
import { UserRole, ProductsByBrand, Product } from "../types";

interface GlobalContextType {
  role: UserRole | null;
  setRole: React.Dispatch<React.SetStateAction<UserRole>>;
  productsListed: ProductsByBrand | null;
  allProducts: Product[] | null;
  brands: string[] | null;
}

export const GlobalContext = createContext<GlobalContextType>({
  role: null,
  setRole: () => {},
  productsListed: null,
  allProducts: null,
  brands: null,
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
