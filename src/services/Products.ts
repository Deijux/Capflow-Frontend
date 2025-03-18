import { Product, ProductsByBrand } from "../types";
import GuestInstance from "./GuestInstance";
import AdminInstance from "./AdminInstance";

export const getProductsGuest = async (): Promise<Product[]> => {
  try {
    const response = await GuestInstance.get("/api/products");
    return response.data;
  } catch (error) {
    throw new Error(`New error generated: ${error}`);
  }
};

export const getProductsAdmin = async (): Promise<Product[]> => {
  try {
    const response = await AdminInstance.get("/api/products");
    return response.data;
  } catch (error) {
    throw new Error(`New error generated: ${error}`);
  }
};

export const getProductsListed = async (): Promise<ProductsByBrand> => {
  try {
    const response = await GuestInstance.get("/api/products/listed");
    return response.data;
  } catch (error) {
    throw new Error(`New error generated: ${error}`);
  }
};

export const getProductById = async (
  id: string | undefined,
): Promise<Product> => {
  try {
    const response = await GuestInstance.get(`api/products/${id}`);
    return response.data;
  } catch (error) {
    throw new Error(`New error generated: ${error}`);
  }
};

export const getProductByBrand = async (
  brand: string | undefined,
): Promise<Product[]> => {
  try {
    const response = await GuestInstance.get(`api/products/brand/${brand}`);
    return response.data;
  } catch (error) {
    throw new Error(`New error generated: ${error}`);
  }
};

export const deleteProduct = async (id: string): Promise<void> => {
  try {
    await AdminInstance.delete(`api/products/${id}`);
  } catch (error) {
    throw new Error(`New error generated: ${error}`);
  }
};
