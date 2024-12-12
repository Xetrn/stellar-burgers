import { ReactElement } from 'react';
import { Navigate, useLocation } from 'react-router-dom';

import { useSelector } from '@src/services/store';

type ProtectRouteProps = {
    children: ReactElement;
    redirect?: boolean;
};

export const ProtectRoute = ({ children, redirect = false }: ProtectRouteProps) => {
    const isAuth = useSelector((state) => state.userReducer.isAuth);
    const location = useLocation();

    if (redirect && !isAuth) {
        return <Navigate replace to='/login' state={{ from: location }} />;
    }

    if (!redirect && isAuth) {
        return <Navigate replace to={location.state?.from || { pathname: '/' }} />;
    }

    return children;
};
