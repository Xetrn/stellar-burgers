import { Navigate, useLocation } from 'react-router-dom';
import { useSelector } from '../../services/store';
import { getUserLoading, getUserData } from '../../services/slices/user-slice';
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
  const isUserLoading = useSelector(getUserLoading);
  const userData = useSelector(getUserData);

  if (!isUserLoading) {
    return <Preloader />;
  }

  if (!onlyUnAuth && !userData) {
    return <Navigate replace to={AppRoute.Login} />;
  }

  if (onlyUnAuth && userData) {
    return (
      <Navigate replace to={location.state?.from || AppRoute.ConstructorPage} />
    );
  }

  return children;
};
