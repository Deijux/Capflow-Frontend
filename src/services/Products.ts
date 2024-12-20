import axiosInstance from "./AxiosInstancie";

export const getProducts = async () => {
  try {
    const response = await axiosInstance.get("/api/products");
    return response.data;
  } catch (error) {
    throw new Error(`New error generated: ${error}`);
  }
};

export const getProductById = async (id: string | undefined) => {
  try {
    const response = await axiosInstance.get(`api/products/${id}`);
    return response.data;
  } catch (error) {
    throw new Error(`New error generated: ${error}`);
  }
};

export const getProductByBrand = async (brand: string | undefined) => {
  try {
    const response = await axiosInstance.get(`api/products/brand/${brand}`);
    return response.data;
  } catch (error) {
    throw new Error(`New error generated: ${error}`);
  }
};
