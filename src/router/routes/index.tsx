import { ConfigRouteProps } from '../types';
import { authRouteConfig } from './auth';
import { privateRouteConfig } from './private';
import React from 'react';
import { ConstructorPage, NotFound404 } from '@pages';
import { publicRouteConfig } from './public';

export const routeConfig: ConfigRouteProps[] = [
  ...authRouteConfig,
  ...privateRouteConfig,
  ...publicRouteConfig,
  {
    path: '*',
    element: <NotFound404 />
  }
];

export * from './private';
