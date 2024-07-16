import { Navigate, Outlet, useLocation } from "react-router-dom";

export const isAuthenticated = () => {
  const token = localStorage.getItem("accessToken");
  if (token) {
    return true;
  }

  return false;
};

export const PublicRoutes = () => {
  const location = useLocation();

  return isAuthenticated() ? (
    <Navigate to="/" state={{ from: location }} replace />
  ) : (
    <Outlet />
  );
};

export const ProtectedRoutes = () => {
  const location = useLocation();

  return isAuthenticated() ? (
    <Outlet />
  ) : (
    <Navigate to="/login" state={{ from: location }} replace />
  );
};
