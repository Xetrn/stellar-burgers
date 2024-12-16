import { Navigate, useLocation } from 'react-router-dom';
import { useSelector } from '../../services/store';
import {
  getIsAuthChecked,
  getIsAuthenticated
} from '../../services/slices/user-slice';
import { Preloader } from '@ui';
import { AppRoute } from '../../const';

type ProtectedRouteProps = {
  onlyUnAuth?: boolean;
  children: React.ReactElement;
};

export const ProtectedRoute = ({
  onlyUnAuth = false,
  children
}: ProtectedRouteProps) => {
  const location = useLocation();
  const isAuthenticated = useSelector(getIsAuthenticated);
  const isAuthChecked = useSelector(getIsAuthChecked);

  if (!isAuthChecked) {
    return <Preloader />;
  }

  if (!onlyUnAuth && !isAuthenticated) {
    return <Navigate replace to={AppRoute.Login} />;
  }

  if (onlyUnAuth && isAuthenticated) {
    return (
      <Navigate replace to={location.state?.from || AppRoute.ConstructorPage} />
    );
  }

  return children;
};
