import { ReactNode, useEffect, useState } from "react";
import { GlobalContext } from "./Global.context";
import { Product, UserRole } from "../types";
import {
  useProductsListed,
  useProductsAdmin,
  useCreateProduct,
  useUpdateProduct,
  useDeleteProduct,
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
  const [modalCreateStatus, setModalCreateStatus] = useState<boolean>(false);
  const [modalEditStatus, setModalEditStatus] = useState<boolean>(false);
  const [productToEdit, setProductToEdit] = useState<Product | null>(null);
  const { data: productsListed } = useProductsListed();
  const { data: allProducts } = useProductsAdmin();
  const brands = productsListed ? Object.keys(productsListed) : null;
  const { mutate: createProduct, isSuccess: isSuccessCreate } =
    useCreateProduct();
  const { mutate: updateProduct, isSuccess: isSuccessUpdate } =
    useUpdateProduct();
  const { mutate: deleteProduct, isSuccess: isSuccessDelete } =
    useDeleteProduct();

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

  const handleModalCreate = (status: boolean) => {
    setModalCreateStatus(status);
  };

  const handleModalEdit = (status: boolean) => {
    setModalEditStatus(status);
  };

  return (
    <GlobalContext.Provider
      value={{
        role,
        handleSetRole,
        menuStatus,
        handleChangeMenuStatus,
        modalCreateStatus,
        handleModalCreate,
        modalEditStatus,
        handleModalEdit,
        productToEdit,
        setProductToEdit,
        productsListed: productsListed || null,
        allProducts: allProducts || null,
        brands,
        createProduct,
        isSuccessCreate,
        updateProduct,
        isSuccessUpdate,
        deleteProduct,
        isSuccessDelete,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};
