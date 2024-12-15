import { Preloader } from '@ui';
import { useSelector } from 'react-redux';
import { Navigate, useLocation } from 'react-router-dom';
import {
  getUser,
  isAuthCheckedSelector
} from '../../services/slices/userSlice';

type ProtectedRouteProps = {
  children: React.ReactElement;
  onlyUnAuth?: boolean;
};
export const ProtectedRoute = ({
  onlyUnAuth = false,
  children
}: ProtectedRouteProps) => {
  const isAuthChecked = useSelector(isAuthCheckedSelector);
  const location = useLocation();

  if (!onlyUnAuth && !isAuthChecked) {
    return <Navigate replace to='/login' state={{ from: location }} />;
  }

  if (onlyUnAuth && isAuthChecked) {
    const from = location.state?.from || { pathname: '/' };
    return <Navigate replace to={from} />;
  }
  return children;
};
