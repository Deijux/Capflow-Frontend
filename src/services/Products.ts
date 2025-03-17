import { Product, ProductsByBrand } from "../types";
import axiosInstance from "./AxiosInstancie";

export const getProducts = async (): Promise<Product> => {
  try {
    const response = await axiosInstance.get("/api/products");
    return response.data;
  } catch (error) {
    throw new Error(`New error generated: ${error}`);
  }
};

export const getProductsListed = async (): Promise<ProductsByBrand> => {
  try {
    const response = await axiosInstance.get("/api/products/listed");
    return response.data;
  } catch (error) {
    throw new Error(`New error generated: ${error}`);
  }
};

export const getProductById = async (
  id: string | undefined,
): Promise<Product> => {
  try {
    const response = await axiosInstance.get(`api/products/${id}`);
    return response.data;
  } catch (error) {
    throw new Error(`New error generated: ${error}`);
  }
};

export const getProductByBrand = async (
  brand: string | undefined,
): Promise<Product[]> => {
  try {
    const response = await axiosInstance.get(`api/products/brand/${brand}`);
    return response.data;
  } catch (error) {
    throw new Error(`New error generated: ${error}`);
  }
};
