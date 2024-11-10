import React from "react";
import { Navigate } from "react-router-dom";

interface PropsProtectedRoute {
  allowedRoles: string[];
  children: React.ReactNode;
}

const ProtectedRoute = ({ allowedRoles, children }: PropsProtectedRoute) => {
  const role = localStorage.getItem("role");

  if (!role) {
    return <Navigate to="/auth/login" replace />;
  }

  if (!allowedRoles.includes(role)) {
    return <Navigate to="/unauthorized" replace />;
  }

  return children;
};

export default ProtectedRoute;
