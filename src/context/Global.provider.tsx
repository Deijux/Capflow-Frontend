import { ReactNode, useEffect, useState } from "react";
import { GlobalContext } from "./Global.context";
import { UserRole, ProductsByBrand } from "../types";
import { getProducts } from "../services";

interface GlobalProps {
  children: ReactNode;
}

const validateUserRole = (role: string): UserRole => {
  if (role === "ROLE_ADMIN" || role === "ROLE_USER" || role === "ROLE_GUEST") {
    return role as UserRole;
  }
  return "ROLE_GUEST";
};

const EmptyGlobalState: UserRole = validateUserRole(
  localStorage.getItem("role") || "ROLE_GUEST",
);

export const GlobalProvider = ({ children }: GlobalProps) => {
  const [role, setRole] = useState<UserRole>(EmptyGlobalState);
  const [products, setProducts] = useState<ProductsByBrand | null>(null);
  const [brands, setBrands] = useState<string[] | null>(null);

  useEffect(() => {
    try {
      const fetchProducts = async () => {
        const products: Promise<ProductsByBrand> = getProducts();
        setProducts(await products);
        const extractedBrands = Object.keys(await products);
        setBrands(extractedBrands);
      };
      fetchProducts();
    } catch (error) {
      console.error(error);
    }
  }, []);

  return (
    <GlobalContext.Provider
      value={{ role, setRole, products, setProducts, brands }}
    >
      {children}
    </GlobalContext.Provider>
  );
};
