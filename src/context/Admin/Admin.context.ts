import { createContext, useContext } from "react";
import { Product, SizeStock } from "../../types";
import { UseMutateFunction } from "@tanstack/react-query";

interface AdminContextType {
  modalCreateStatus: boolean;
  handleModalCreate(status: boolean): void;
  modalEditStatus: boolean;
  handleModalEdit(status: boolean): void;
  productToEdit: Product | null;
  setProductToEdit: (product: Product | null) => void;
  allProducts: Product[] | null;
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
  brands: string[] | null;
  searchTerm: string;
  handleSetSearchTerm: (term: string) => void;
}

export const AdminContext = createContext<AdminContextType>({
  modalCreateStatus: false,
  handleModalCreate: () => {},
  modalEditStatus: false,
  handleModalEdit: () => {},
  productToEdit: null,
  setProductToEdit: () => {},
  allProducts: null,
  isSuccessCreate: false,
  isSuccessUpdate: false,
  isSuccessDelete: false,
  createProduct: () => {},
  updateProduct: () => {},
  deleteProduct: () => {},
  brands: null,
  searchTerm: "",
  handleSetSearchTerm: () => {},
});

export const useAdminContext = () => {
  const context = useContext(AdminContext);

  if (context.allProducts === undefined) {
    throw new Error("AdminContext must be used within a AdminContextProvider");
  }

  return context;
};
