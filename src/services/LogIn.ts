import axios from "axios";
import AdminInstance from "./AdminInstance";
import GuestInstance from "./GuestInstance";

interface loginProps {
  username: string;
  password: string;
}

export const loginService = async ({ username, password }: loginProps) => {
  try {
    const response = await GuestInstance.post(
      "/auth/login",
      {
        username,
        password,
      },
      {
        withCredentials: true,
      },
    );

    if (response.status !== 201) {
      throw new Error(
        response.data.errors[0].message || "Error al iniciar sesión",
      );
    }

    return response.data.role;
  } catch (error) {
    console.error("Error en el servicio de inicio de sesión:", error);
    if (axios.isAxiosError(error)) {
      throw new Error(
        error.response?.data?.errors[0]?.message ||
          "Error de red o del servidor",
      );
    } else {
      throw new Error("Error inesperado");
    }
  }
};

export const logoutService = async () => {
  try {
    const response = await AdminInstance.post(
      "/auth/logout",
      {},
      {
        withCredentials: true,
      },
    );

    if (response.status !== 200) {
      throw new Error(response.data.message || "Error al cerrar sesión");
    }

    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(
        error.response?.data?.errors[0]?.message ||
          "Error de red o del servidor",
      );
    } else {
      throw new Error("Error inesperado");
    }
  }
};
