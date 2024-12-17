import { TUser } from "@utils-types";
import React, { ReactElement } from "react"
import { Navigate, useLocation } from "react-router-dom";
import { useSelector } from "../../../src/services/store";

export type ProtectedRouteProps = {
    redirectToLogin?: boolean;
    children: ReactElement;
}

export default function ProtectedRoute({redirectToLogin, children}: ProtectedRouteProps) {

    const isAuthenthicated = useSelector(state => state.userReducer.isAuthenthicated);
    const location = useLocation();

    if (!redirectToLogin && isAuthenthicated) {
        const from = location.state?.from || {pathname: '/'};
        return <Navigate replace to={from}/>
    }

    if (redirectToLogin && !isAuthenthicated) {
        return <Navigate replace to='/login' state={{from: location}}/>
    }

    return children;
}