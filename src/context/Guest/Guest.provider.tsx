import { ReactNode, useEffect } from "react";
import { GuestContext } from "./Guest.context";
import { useProductsListed } from "../../hooks/useProducts";
import { useBrandStore } from "../../stores";

interface GuestProps {
  children: ReactNode;
}

export const GuestProvider = ({ children }: GuestProps) => {
  const { setBrands } = useBrandStore();
  const { data: productsListed } = useProductsListed();
  useEffect(() => {
    if (productsListed) {
      const brandsExtracted = Object.keys(productsListed);
      setBrands(brandsExtracted);
    }
  }, [productsListed, setBrands]);

  return (
    <GuestContext.Provider
      value={{
        productsListed: productsListed || null,
      }}
    >
      {children}
    </GuestContext.Provider>
  );
};
