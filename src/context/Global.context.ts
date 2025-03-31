import { createContext, useContext } from "react";
import { UserRole, ProductsByBrand, Product, SizeStock } from "../types";
import { UseMutateFunction } from "@tanstack/react-query";

interface GlobalContextType {
  role: UserRole | null;
  handleSetRole(role: UserRole): void;
  menuStatus: boolean;
  handleChangeMenuStatus(): void;
  modalCreateStatus: boolean;
  handleModalCreate(): void;
  productsListed: ProductsByBrand | null;
  allProducts: Product[] | null;
  brands: string[] | null;
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
  deleteProduct: UseMutateFunction<void, Error, string, unknown>;
}

export const GlobalContext = createContext<GlobalContextType>({
  role: null,
  handleSetRole: () => {},
  menuStatus: false,
  handleChangeMenuStatus: () => {},
  modalCreateStatus: false,
  handleModalCreate: () => {},
  productsListed: null,
  allProducts: null,
  brands: null,
  createProduct: () => {},
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
