import useAuthStore from "@/store/useAuthStore";
import React, { useEffect } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { toast } from "sonner";

const ProtectedRoute = ({ children }) => {
  const { user, isAuthenticated, isLoading } = useAuthStore();
  
  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      toast.error("Vui lòng đăng nhập để tiếp tục!", { position: "top-right" });
    }
  }, [isAuthenticated, isLoading]);

  if (isLoading) {
    return <div className="min-h-screen flex items-center justify-center">Đang kiểm tra thông tin đăng nhập...</div>;
  }

  if (!isAuthenticated) {
    return <Navigate to={"/"} />;
  }
  return children;
};

export default ProtectedRoute;
