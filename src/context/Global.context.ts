import { createContext, useContext } from "react";
import { UserRole, ProductsByBrand } from "../types";

interface GlobalContextType {
  role: UserRole | null;
  setRole: React.Dispatch<React.SetStateAction<UserRole>>;
  products: ProductsByBrand | null;
  setProducts: React.Dispatch<React.SetStateAction<ProductsByBrand | null>>;
  brands: string[] | null;
}

export const GlobalContext = createContext<GlobalContextType>({
  role: null,
  setRole: () => {},
  products: null,
  setProducts: () => {},
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
