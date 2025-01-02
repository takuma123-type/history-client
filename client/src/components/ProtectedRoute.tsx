import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const ProtectedRoute = () => {
  const { token } = useAuth();

  // 未認証の場合はリダイレクト
  if (!token) {
    return <Navigate to="/sign-in" replace />;
  }

  // 認証済みの場合は子ルートをレンダリング
  return <Outlet />;
};

export default ProtectedRoute;
