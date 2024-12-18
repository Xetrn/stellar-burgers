import { ConfigRouteProps } from '../types';
import React from 'react';
import { ForgotPassword, Login, Register, ResetPassword } from '@pages';

export const AuthRouter = {
  Login: '/login',
  Register: '/register',
  ForgotPassword: '/forgot-password',
  ResetPassword: '/reset-password'
};

export const authRouteConfig: ConfigRouteProps[] = [
  {
    path: AuthRouter.Login,
    withNoAuthGuard: true,
    element: <Login />
  },
  {
    path: AuthRouter.Register,
    withNoAuthGuard: true,
    element: <Register />
  },
  {
    path: AuthRouter.ForgotPassword,
    withNoAuthGuard: true,
    element: <ForgotPassword />
  },
  {
    path: AuthRouter.ResetPassword,
    withNoAuthGuard: true,
    element: <ResetPassword />
  },
  {
    path: AuthRouter.ResetPassword,
    withNoAuthGuard: true,
    element: <ResetPassword />
  }
];
