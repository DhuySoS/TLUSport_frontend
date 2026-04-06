import useAuthStore from "@/store/useAuthStore";
import React from "react";
import { Navigate, useLocation } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const { user, isAuthenticated } = useAuthStore();
  
  if (!isAuthenticated) {
    return <Navigate to={"/"} />;
  }
  return { children };
};

export default ProtectedRoute;
