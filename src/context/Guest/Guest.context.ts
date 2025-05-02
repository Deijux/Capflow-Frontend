import { createContext, useContext } from "react";
import { ProductsByBrand } from "../../types";

interface GuestContextType {
  productsListed: ProductsByBrand | null;
}

export const GuestContext = createContext<GuestContextType>({
  productsListed: null,
});

export const useGuestContext = () => {
  const context = useContext(GuestContext);

  if (!context.productsListed && context.productsListed !== null) {
    throw new Error("GuestContext must be used within a GuestContextProvider");
  }

  return context;
};
