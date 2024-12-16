import React from 'react';
import { createBrowserRouter, Route } from 'react-router-dom';
import { PrivateRoutes, PublicRoutes, SecondPrivateRoutes } from './app.routes';
import { NotFound404 } from '@pages';
import { Layout, PrivateRoute } from '@components';
import { URLS } from './app.urls';

export const AppRouter = createBrowserRouter([
  {
    element: React.createElement(Layout),
    children: [
      ...PublicRoutes,
      ...PrivateRoutes.map((route) => ({
        path: route.path,
        element: React.createElement(PrivateRoute, {
          onlyUnAuth: false,
          children: route.element,
          link: URLS.LOGIN
        })
      })),
      ...SecondPrivateRoutes.map((route) => ({
        path: route.path,
        element: React.createElement(PrivateRoute, {
          onlyUnAuth: true,
          children: route.element,
          link: URLS.PROFILE
        })
      }))
    ],
    errorElement: React.createElement(NotFound404)
  }
]);
