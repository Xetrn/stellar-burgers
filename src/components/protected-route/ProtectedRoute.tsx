import { getIsAuthorized } from '@slices';
import { useSelector } from '../../services/store';
import { Navigate, Outlet, useLocation } from 'react-router-dom';

type TProtectedRouteProps = {
  notAuth?: boolean;
};

export const ProtectedRoute = ({ notAuth = false }: TProtectedRouteProps) => {
  const location = useLocation();
  const isAuthorized = useSelector(getIsAuthorized);

  if (!notAuth && !isAuthorized) {
    return <Navigate to='/login' replace state={{ from: location }} />;
  }

  if (notAuth && isAuthorized) {
    return <Navigate to={location.state?.from || { pathname: '/' }} replace />;
  }

  return <Outlet />;
};
