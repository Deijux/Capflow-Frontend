import { createContext, useContext } from "react";
import { UserRole, Products } from "../types";

interface GlobalContextType {
  role: UserRole | null;
  setRole: React.Dispatch<React.SetStateAction<UserRole>>;
  products: Products | null;
  setProducts: React.Dispatch<React.SetStateAction<Products | null>>;
}

export const GlobalContext = createContext<GlobalContextType>({
  role: null,
  setRole: () => {},
  products: null,
  setProducts: () => {},
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
