import React, { FC, PropsWithChildren } from 'react';
import { Navigate, useSearchParams } from 'react-router-dom';
import { AuthRouter } from './routes/auth';
import {
  isAuth as isAuthSelector,
  isLoadingAuth as isLoadingAuthSelector
} from '../services/slices/user';
import { useSelector } from '../services/store';
import { Preloader } from '@ui';

type Props = PropsWithChildren & {
  withAuthGuard: boolean | undefined;
  withNoAuthGuard: boolean | undefined;
};

export const ProtectRoute: FC<Props> = ({
  withAuthGuard,
  withNoAuthGuard,
  children
}) => {
  const isLoadingAuth = useSelector(isLoadingAuthSelector);
  const isAuth = useSelector(isAuthSelector);
  const [searchParams] = useSearchParams();

  if (isLoadingAuth) {
    return <Preloader />;
  }

  if (withAuthGuard && !isAuth) {
    const returnUrl = encodeURIComponent(
      `${window.location.pathname}${window.location.search}`
    );
    return <Navigate to={`${AuthRouter.Login}?ReturnUrl=${returnUrl}`} />;
  }

  if (withNoAuthGuard && isAuth) {
    const returnUrl = decodeURIComponent(searchParams.get('ReturnUrl') || '/');
    return <Navigate to={returnUrl} />;
  }

  return children;
};
