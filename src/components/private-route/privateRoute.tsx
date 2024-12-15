import { Navigate } from 'react-router-dom';

interface IPrivateRouteProps {
  children: React.ReactNode;
  isAuth: boolean;
  link: string;
}

export const PrivateRoute = ({ children, isAuth, link }: IPrivateRouteProps) =>
  isAuth ? <>{children}</> : <Navigate to={link} />;
