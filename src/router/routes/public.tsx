import React from 'react';
import { ConfigRouteProps } from '../types';
import { ConstructorPage } from '@pages';
import { IngredientDetailsModal } from '../../components/ingredient-details/ingredient-details-modal';
import { IngredientDetails } from '@components';

export const PublicRouter = {
  ConstructorPage: '/',
  IngredientDetails: (id: string) => `/ingredients/${id}`
};

export const publicRouteConfig: ConfigRouteProps[] = [
  {
    path: PublicRouter.ConstructorPage,
    element: <ConstructorPage />
  },
  {
    path: PublicRouter.IngredientDetails(':id'),
    element: <IngredientDetailsModal />,
    isModal: true
  },
  {
    path: PublicRouter.IngredientDetails(':id'),
    element: <IngredientDetails />
  }
];
