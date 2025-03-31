import { Product, ProductsByBrand, SizeStock } from "../types";
import GuestInstance from "./GuestInstance";
import AdminInstance from "./AdminInstance";

interface createProductProps {
  productData: {
    name: string;
    description: string;
    price: number;
    brand: string;
    details: SizeStock[];
  };
  images: File[];
}

export const getProductsGuest = async (): Promise<Product[]> => {
  try {
    const response = await GuestInstance.get("/api/products");
    return response.data;
  } catch (error) {
    throw new Error(`Error getting products: ${error}`);
  }
};

export const getProductsAdmin = async (): Promise<Product[]> => {
  try {
    const response = await AdminInstance.get("/api/products");
    return response.data;
  } catch (error) {
    throw new Error(`Error getting admin products: ${error}`);
  }
};

export const getProductsListed = async (): Promise<ProductsByBrand> => {
  try {
    const response = await GuestInstance.get("/api/products/listed");
    return response.data;
  } catch (error) {
    throw new Error(`Error getting listed products: ${error}`);
  }
};

export const getProductById = async (
  id: string | undefined,
): Promise<Product> => {
  try {
    const response = await GuestInstance.get(`api/products/${id}`);
    return response.data;
  } catch (error) {
    throw new Error(`Error getting product by ID: ${error}`);
  }
};

export const getProductByBrand = async (
  brand: string | undefined,
): Promise<Product[]> => {
  try {
    const response = await GuestInstance.get(`api/products/brand/${brand}`);
    return response.data;
  } catch (error) {
    throw new Error(`Error getting products by brand: ${error}`);
  }
};

export const createProduct = async ({
  productData,
  images,
}: createProductProps): Promise<Product> => {
  try {
    const formData = new FormData();
    formData.append("product", JSON.stringify(productData));
    images.forEach((file) => {
      formData.append("images", file);
    });
    const response = await AdminInstance.post("/api/products", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  } catch (error) {
    throw new Error(`Error creating product: ${error}`);
  }
};

export const deleteProduct = async (id: string): Promise<void> => {
  try {
    await AdminInstance.delete(`api/products/${id}`);
  } catch (error) {
    throw new Error(`Error deleting product: ${error}`);
  }
};
