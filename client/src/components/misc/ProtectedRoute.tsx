import { Navigate, Outlet } from "react-router-dom";

import storage from "@/utils/storage";

export const ProtectedRoute = () => {
  const userToken = storage.getToken();

  if (!userToken) {
    return <Navigate to="/login" />;
  }

  return <Outlet />;
};
