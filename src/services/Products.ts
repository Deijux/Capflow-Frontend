import axiosInstance from "./AxiosInstancie";

export const getProducts = async () => {
  try {
    const response = await axiosInstance.get("/api/products");
    return response.data;
  } catch (error) {
    throw new Error(`New error generated: ${error}`);
  }
};
