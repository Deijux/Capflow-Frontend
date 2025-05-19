import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  getProductsGuest,
  getProductsAdmin,
  getProductsListed,
  getProductById,
  getProductByBrand,
  createProduct,
  updateProduct,
  deleteProduct,
} from "../services";
import { SizeStock, productParams } from "../types";

export const useProducts = (params: productParams) => {
  return useQuery({
    queryKey: ["products", params],
    queryFn: () => getProductsGuest(params),
  });
};

export const useProductsAdmin = (params: productParams) => {
  return useQuery({
    queryKey: ["products", params],
    queryFn: () => getProductsAdmin(params),
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

export const useUpdateProduct = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: {
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
    }) =>
      updateProduct(data.id, data.product, data.images, data.existingImages),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["products"] });
      queryClient.invalidateQueries({ queryKey: ["productsListed"] });
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
