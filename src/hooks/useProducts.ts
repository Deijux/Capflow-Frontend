import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  getProductsGuest,
  getProductsAdmin,
  getProductsListed,
  getProductById,
  getProductByBrand,
  createProduct,
  deleteProduct,
} from "../services";
import { SizeStock } from "../types";

export const useProducts = () => {
  return useQuery({
    queryKey: ["products"],
    queryFn: getProductsGuest,
  });
};

export const useProductsAdmin = () => {
  return useQuery({
    queryKey: ["products"],
    queryFn: getProductsAdmin,
  });
};

export const useProductsListed = () => {
  return useQuery({
    queryKey: ["productsListed"],
    queryFn: getProductsListed,
  });
};

export const useProduct = (id?: string) => {
  return useQuery({
    queryKey: ["product", id],
    queryFn: () => getProductById(id),
    enabled: !!id,
  });
};

export const useProductsByBrand = (brand?: string) => {
  return useQuery({
    queryKey: ["products", brand],
    queryFn: () => getProductByBrand(brand),
    enabled: !!brand,
  });
};

export const useCreateProduct = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: {
      productData: {
        name: string;
        description: string;
        price: number;
        brand: string;
        details: SizeStock[];
      };
      images: File[];
    }) => {
      return createProduct({
        productData: data.productData,
        images: data.images,
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["products"] });
      queryClient.invalidateQueries({ queryKey: ["productsListed"] });
    },
    onError: (error: Error) => {
      console.error(error);
    },
  });
};

export const useDeleteProduct = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteProduct,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["products"] });
    },
  });
};
