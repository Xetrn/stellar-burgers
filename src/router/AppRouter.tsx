import React, { FC, useCallback } from 'react';
import { Route, RouteProps, Routes, useLocation } from 'react-router-dom';
import { ConfigRouteProps } from './types';

import { routeConfig } from './routes';
import { ProtectRoute } from './ProtectRoute';

export const AppRouter = () => {
  const location = useLocation();
  const background = location.state?.background;

  const renderRoute = useCallback(
    (route: ConfigRouteProps) => (
      <Route
        key={route.path}
        path={route.path}
        element={
          <ProtectRoute
            withAuthGuard={route.withAuthGuard}
            withNoAuthGuard={route.withNoAuthGuard}
          >
            {route.element}
          </ProtectRoute>
        }
      />
    ),
    []
  );

  return (
    <>
      <Routes location={background || location}>
        {routeConfig.map(renderRoute)}
      </Routes>
      {background && (
        <Routes>
          {routeConfig.filter((route) => route.isModal).map(renderRoute)}
        </Routes>
      )}
    </>
  );
};
