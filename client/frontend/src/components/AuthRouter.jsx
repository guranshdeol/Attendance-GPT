import React from 'react';
import { Navigate } from 'react-router-dom';

const isAuthenticated = () => {
  return !!localStorage.getItem('user');
};

const AuthRoute = ({ element }) => {
  return isAuthenticated() ? element : <Navigate to="/login" />;
};

export default AuthRoute;
