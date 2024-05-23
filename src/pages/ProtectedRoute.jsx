
// export default ProtectedRoute;
import React from "react"
import { Outlet, Navigate } from "react-router-dom";
import auth from "../services/auth/authService";
export const ProtectedRoute = ({ children }) => {

  const user = auth.getCurrentUser()

  return user ? (
    <>
      {children}
      <Outlet />
    </>
  ) : (
    <Navigate
      to={'/login'}
      state={{ from: location.pathname }}
    />
  );
}