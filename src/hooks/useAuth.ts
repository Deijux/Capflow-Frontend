import { useMutation } from "@tanstack/react-query";
import loginService from "../services/LogIn";
import { useGlobalContext } from "../context/Global.context";

export const useLogin = () => {
  const { handleSetRole } = useGlobalContext();
  return useMutation({
    mutationFn: loginService,
    onSuccess: (role) => {
      handleSetRole(role);
    },
  });
};
