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
    return response.data.role;
  } catch (error) {
    console.error(error);
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
    return response.data;
  } catch (error) {
    console.error(error);
  }
};
