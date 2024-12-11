import React from 'react';
import { createBrowserRouter, Route } from 'react-router-dom';
import { PrivateRoutes, PublicRoutes, SecondPrivateRoutes } from './app.routes';
import { NotFound404 } from '@pages';
import { Layout, PrivateRoute } from '@components';
import { URLS } from './app.urls';

const isAuth = false;

export const AppRouter = createBrowserRouter([
  {
    element: React.createElement(Layout),
    children: [
      ...PublicRoutes,
      ...PrivateRoutes.map((route) => ({
        path: route.path,
        element: React.createElement(
          PrivateRoute,
          { isAuth, children: route.element, link: URLS.LOGIN },
          null
        )
      })),
      ...SecondPrivateRoutes.map((route) => ({
        path: route.path,
        element: React.createElement(
          PrivateRoute,
          { isAuth: !isAuth, children: route.element, link: URLS.CONSTRUCTOR },
          null
        )
      }))
    ],
    errorElement: React.createElement(NotFound404)
  }
]);
