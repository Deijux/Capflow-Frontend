import { createContext, useContext } from "react";
import { UserRole } from "../types";

interface GlobalContextType {
  role: UserRole | null;
  setRole: React.Dispatch<React.SetStateAction<UserRole>>;
}

export const GlobalContext = createContext<GlobalContextType>({
  role: null,
  setRole: () => {},
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
