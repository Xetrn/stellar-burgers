import { Navigate } from 'react-router';
import React from 'react';
import { Preloader } from '@ui';
import { useLocation } from 'react-router-dom';

type ProtectedRouteProps = {
  onlyUnAuth?: boolean;
  children: React.ReactElement;
};

export const ProtectedRoute = ({
  onlyUnAuth,
  children
}: ProtectedRouteProps) => {
  //@todo Стор
  const isAuthChecked = false;
  const user = {};

  const location = useLocation();

  if (!isAuthChecked) {
    return <Preloader />;
  }

  if (!onlyUnAuth && !user) {
    return <Navigate replace to='/login' />;
  }

  if (onlyUnAuth && user) {
    return (
      <Navigate replace to={location.state?.from ? location.state.from : '/'} />
    );
  }

  return children;
};
