import axios from "axios";

interface loginProps {
  username: string;
  password: string;
}

const loginService = async ({ username, password }: loginProps) => {
  try {
    const response = await axios.post(
      "http://localhost:3000/auth/login",
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

export default loginService;
