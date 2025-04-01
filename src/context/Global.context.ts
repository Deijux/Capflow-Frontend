import { createContext, useContext } from "react";
import { UserRole, ProductsByBrand, Product, SizeStock } from "../types";
import { UseMutateFunction } from "@tanstack/react-query";

interface GlobalContextType {
  role: UserRole | null;
  handleSetRole(role: UserRole): void;
  menuStatus: boolean;
  handleChangeMenuStatus(): void;
  modalCreateStatus: boolean;
  handleModalCreate(status: boolean): void;
  modalEditStatus: boolean;
  handleModalEdit(status: boolean): void;
  productToEdit: Product | null;
  setProductToEdit: (product: Product | null) => void;
  productsListed: ProductsByBrand | null;
  allProducts: Product[] | null;
  brands: string[] | null;
  isSuccessCreate: boolean;
  isSuccessUpdate: boolean;
  isSuccessDelete: boolean;
  createProduct: UseMutateFunction<
    Product,
    Error,
    {
      productData: {
        name: string;
        description: string;
        price: number;
        brand: string;
        details: SizeStock[];
      };
      images: File[];
    },
    unknown
  >;
  updateProduct: UseMutateFunction<
    Product,
    Error,
    {
      id: string;
      product: {
        name: string;
        description: string;
        price: number;
        brand: string;
        details: SizeStock[];
      };
      images: File[];
      existingImages: string[];
    },
    unknown
  >;
  deleteProduct: UseMutateFunction<void, Error, string, unknown>;
}

export const GlobalContext = createContext<GlobalContextType>({
  role: null,
  handleSetRole: () => {},
  menuStatus: false,
  handleChangeMenuStatus: () => {},
  modalCreateStatus: false,
  handleModalCreate: () => {},
  modalEditStatus: false,
  handleModalEdit: () => {},
  productToEdit: null,
  setProductToEdit: () => {},
  productsListed: null,
  allProducts: null,
  brands: null,
  isSuccessCreate: false,
  isSuccessUpdate: false,
  isSuccessDelete: false,
  createProduct: () => {},
  updateProduct: () => {},
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
