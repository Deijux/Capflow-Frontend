import { ReactNode, useEffect, useState } from "react";
import { GlobalContext } from "./Global.context";
import { UserRole } from "../types";
import {
  useProductsListed,
  useDeleteProduct,
  useProductsAdmin,
} from "../hooks/useProducts";

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
  const [menuStatus, setMenuStatus] = useState<boolean>(false);
  const { data: productsListed } = useProductsListed();
  const { data: allProducts } = useProductsAdmin();
  const brands = productsListed ? Object.keys(productsListed) : null;
  const { mutate: deleteProduct } = useDeleteProduct();

  useEffect(() => {
    const storedRole = localStorage.getItem("role") as UserRole | null;
    if (storedRole) {
      setRole(storedRole);
    }
  }, []);

  const handleSetRole = (role: UserRole) => {
    localStorage.setItem("role", role);
    setRole(role);
  };

  const handleChangeMenuStatus = () => {
    setMenuStatus((prev) => !prev);
  };

  return (
    <GlobalContext.Provider
      value={{
        role,
        handleSetRole,
        menuStatus,
        handleChangeMenuStatus,
        productsListed: productsListed || null,
        allProducts: allProducts || null,
        brands,
        deleteProduct,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};
