import { createContext, useContext } from "react";
import { UserRole } from "../../types";

interface GlobalContextType {
  role: UserRole | null;
  handleSetRole(role: UserRole): void;
  menuStatus: boolean;
  handleChangeMenuStatus(): void;
}

export const GlobalContext = createContext<GlobalContextType>({
  role: null,
  handleSetRole: () => {},
  menuStatus: false,
  handleChangeMenuStatus: () => {},
});

export const useGlobalContext = () => {
  const context = useContext(GlobalContext);

  if (!context.role && context.role !== "") {
    throw new Error(
      "GlobalContext must be used within a GlobalContextProvider",
    );
  }

  return context;
};
