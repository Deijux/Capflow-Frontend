import { ReactNode, useState } from "react";
import { GlobalContext } from "./Global.context";
import { UserRole } from "../types";

const validateUserRole = (role: string): UserRole => {
  if (role === "ROLE_ADMIN" || role === "ROLE_USER" || role === "ROLE_GUEST") {
    return role as UserRole;
  }
  return "ROLE_GUEST";
};

const EmptyGlobalState: UserRole = validateUserRole(
  localStorage.getItem("role") || "ROLE_GUEST",
);

interface GlobalProps {
  children: ReactNode;
}

export const GlobalProvider = ({ children }: GlobalProps) => {
  const [role, setRole] = useState<UserRole>(EmptyGlobalState);

  return (
    <GlobalContext.Provider value={{ role, setRole }}>
      {children}
    </GlobalContext.Provider>
  );
};
