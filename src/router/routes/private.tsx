import React from 'react';
import { ConfigRouteProps } from '../types';
import { Feed, Profile, ProfileOrders } from '@pages';
import { OrderInfoModal } from '../../components/order-info/order-info-modal';
import { OrderInfo } from '@components';

export const PrivateRouter = {
  ProfilePage: '/profile',
  ProfileOrders: '/profile/orders',
  ProfileOrderInfo: (id: string) => `/profile/orders/${id}`,
  Feed: '/feed',
  OrderInfo: (id: string) => `/feed/${id}`
};

export const privateRouteConfig: ConfigRouteProps[] = [
  {
    path: PrivateRouter.ProfilePage,
    withAuthGuard: true,
    element: <Profile />
  },
  {
    path: PrivateRouter.ProfileOrders,
    withAuthGuard: true,
    element: <ProfileOrders />
  },
  {
    path: PrivateRouter.ProfileOrderInfo(':id'),
    withAuthGuard: true,
    element: <OrderInfoModal />,
    isModal: true
  },
  {
    path: PrivateRouter.ProfileOrderInfo(':id'),
    withAuthGuard: true,
    element: <OrderInfo />
  },
  {
    path: PrivateRouter.Feed,
    withAuthGuard: true,
    element: <Feed />
  },
  {
    path: PrivateRouter.OrderInfo(':id'),
    withAuthGuard: true,
    element: <OrderInfoModal />,
    isModal: true
  },
  {
    path: PrivateRouter.OrderInfo(':id'),
    withAuthGuard: true,
    element: <OrderInfo />
  }
];
