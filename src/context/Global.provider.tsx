import { ReactNode, useState } from "react";
import { GlobalContext } from "./Global.context";

const EmptyGlobalState: string = localStorage.getItem("role") || "ROLE_GUEST";

interface GlobalProps {
  children: ReactNode;
}

export const GlobalProvider = ({ children }: GlobalProps) => {
  const [role, setRole] = useState<string>(EmptyGlobalState);

  return (
    <GlobalContext.Provider value={{ role, setRole }}>
      {children}
    </GlobalContext.Provider>
  );
};
