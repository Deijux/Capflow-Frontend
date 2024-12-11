import { useMutation } from '@tanstack/react-query'
import loginService from '../services/LogIn'

export const useLogin = () => {
  return useMutation({
    mutationFn: loginService,
    onSuccess: (role) => {
      localStorage.setItem("role", role);
    }
  })
} 