import { useMutation } from "@tanstack/react-query";
import { loginService, logoutService } from "../services/LogIn";
import { useGlobalContext } from "../context/Global.context";

export const useLogin = () => {
  const { handleSetRole } = useGlobalContext();
  return useMutation({
    mutationFn: loginService,
    onSuccess: (role) => {
      handleSetRole(role);
    },
    onError: () => {
      handleSetRole("ROLE_GUEST");
    },
  });
};

export const useLogout = () => {
  const { handleSetRole } = useGlobalContext();
  return useMutation({
    mutationFn: logoutService,
    onSuccess: () => {
      handleSetRole("ROLE_GUEST");
    },
  });
};
