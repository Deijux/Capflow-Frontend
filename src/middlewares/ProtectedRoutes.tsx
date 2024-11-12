import React from "react";
import { Navigate } from "react-router-dom";
import { useGlobalContext } from "../context/Global.context";

interface PropsProtectedRoute {
  allowedRoles: string[];
  children: React.ReactNode;
}

const ProtectedRoute = ({ allowedRoles, children }: PropsProtectedRoute) => {
  const { role } = useGlobalContext();

  if (!role) {
    return <Navigate to="/auth/login" replace />;
  }

  if (!allowedRoles.includes(role)) {
    return <Navigate to="/unauthorized" replace />;
  }

  return children;
};

export default ProtectedRoute;
