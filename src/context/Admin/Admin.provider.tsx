import { ReactNode, useEffect, useState } from "react";
import { AdminContext } from "./Admin.context";
import { Product } from "../../types";
import {
  useProductsAdmin,
  useCreateProduct,
  useUpdateProduct,
  useDeleteProduct,
} from "../../hooks/useProducts";
import { useBrandStore } from "../../stores/brandStore";

interface GlobalProps {
  children: ReactNode;
}

export const AdminProvider = ({ children }: GlobalProps) => {
  const { setBrands, brands } = useBrandStore();
  const [modalCreateStatus, setModalCreateStatus] = useState<boolean>(false);
  const [modalEditStatus, setModalEditStatus] = useState<boolean>(false);
  const [productToEdit, setProductToEdit] = useState<Product | null>(null);
  const [brandsExtracted, setBrandsExtracted] = useState<string[]>();
  const [searchTerm, setSearchTerm] = useState("");
  const { data: allProducts } = useProductsAdmin({
    q: searchTerm,
  });
  const { mutate: createProduct, isSuccess: isSuccessCreate } =
    useCreateProduct();
  const { mutate: updateProduct, isSuccess: isSuccessUpdate } =
    useUpdateProduct();
  const { mutate: deleteProduct, isSuccess: isSuccessDelete } =
    useDeleteProduct();

  useEffect(() => {
    allProducts?.forEach((product) => {
      if (product.brand) {
        setBrandsExtracted((prev) => {
          if (prev?.includes(product.brand)) {
            return prev;
          } else {
            return [...(prev || []), product.brand];
          }
        });
      }
    });
    setBrands(brandsExtracted || []);
  }, [allProducts, brandsExtracted, setBrands]);

  const handleModalCreate = (status: boolean) => {
    setModalCreateStatus(status);
  };

  const handleModalEdit = (status: boolean) => {
    setModalEditStatus(status);
  };

  const handleSetSearchTerm = (term: string) => {
    setSearchTerm(term);
  };

  return (
    <AdminContext.Provider
      value={{
        modalCreateStatus,
        handleModalCreate,
        modalEditStatus,
        handleModalEdit,
        productToEdit,
        setProductToEdit,
        allProducts: allProducts || null,
        createProduct,
        isSuccessCreate,
        updateProduct,
        isSuccessUpdate,
        deleteProduct,
        isSuccessDelete,
        brands,
        searchTerm,
        handleSetSearchTerm,
      }}
    >
      {children}
    </AdminContext.Provider>
  );
};
