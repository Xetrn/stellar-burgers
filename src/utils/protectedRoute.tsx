import { Navigate } from 'react-router';
import React, { useEffect } from 'react';
import { Preloader } from '@ui';
import { useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from '../services/store';
import {
  selectIsAuthChecked,
  selectIsAuthenticated,
  selectUser
} from '../services/user-slice/user.slice';
import { getUser } from '../services/user-slice/actions';

type ProtectedRouteProps = {
  onlyUnAuth?: boolean;
  children: React.ReactElement;
};

export const ProtectedRoute = ({
  onlyUnAuth,
  children
}: ProtectedRouteProps) => {
  const isAuthChecked = useSelector(selectIsAuthChecked);
  const isAuthenticated = useSelector(selectIsAuthenticated);
  const location = useLocation();

  if (!isAuthChecked) {
    return <Preloader />;
  }

  if (!onlyUnAuth && isAuthenticated) {
    return <Navigate replace to={location.state?.from || '/'} />;
  }

  if (onlyUnAuth && !isAuthenticated) {
    return <Navigate replace to='/login' />;
  }

  return children;
};
