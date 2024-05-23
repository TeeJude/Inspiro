// export default ProtectedRoute;
import React from 'react';

import {
  Navigate,
  Outlet,
} from 'react-router-dom';
import auth from '../services/auth/authService';


export const AdminProtectedRoute =  ({ children }) => {

  const user = auth.getCurrentUser()

  return user && user.user_type === "Admin" ? (
    <>
      {children}
      <Outlet />
    </>
  ) : (
    <Navigate
      to={'/not-allowed'}
      state={{ from: location.pathname }}
    />
  );
}