import { IngredientDetails, Modal, OrderInfo } from '@components';
import { URLS } from './app.urls';
import { IRoute } from './types';
import React, { lazy } from 'react';
import { ProfileOrders } from '@pages';

const ConstructorPage = lazy(() =>
  import('@pages').then((m) => ({
    default: m.ConstructorPage
  }))
);

const Feed = lazy(() =>
  import('@pages').then((m) => ({
    default: m.Feed
  }))
);

const Login = lazy(() =>
  import('@pages').then((m) => ({
    default: m.Login
  }))
);

const Register = lazy(() =>
  import('@pages').then((m) => ({
    default: m.Register
  }))
);

const ResetPassword = lazy(() =>
  import('@pages').then((m) => ({
    default: m.ResetPassword
  }))
);

const ForgotPassword = lazy(() =>
  import('@pages').then((m) => ({
    default: m.ForgotPassword
  }))
);

const Profile = lazy(() =>
  import('@pages').then((m) => ({
    default: m.Profile
  }))
);

// const ProfileOrders = lazy(() =>
//   import('@pages').then((m) => ({
//     default: m.ProfileOrders
//   }))
// );

export const PublicRoutes: IRoute[] = [
  {
    path: URLS.CONSTRUCTOR,
    element: React.createElement(ConstructorPage),
    children: [
      {
        path: URLS.MODAL_INGREDIENTS_DETAILS,
        element: React.createElement(
          Modal,
          {
            onClose: () => window.history.back(),
            title: 'Детали ингредиента'
          },
          React.createElement(IngredientDetails)
        )
      }
    ]
  },
  {
    path: URLS.FEED,
    element: React.createElement(Feed),
    children: [
      {
        path: URLS.MODAL_ORDER_INFO,
        element: React.createElement(
          Modal,
          {
            onClose: () => window.history.back(),
            title: 'Информация о заказе'
          },
          React.createElement(OrderInfo)
        )
      }
    ]
  }
];

export const PrivateRoutes: IRoute[] = [
  {
    path: URLS.PROFILE,
    element: React.createElement(Profile)
  },
  {
    path: URLS.PROFILE_ORDERS,
    element: React.createElement(ProfileOrders)
  },
  {
    //почему-то тут child роут не работает
    path: URLS.MODAL_ORDER_DETAILS,
    element: React.createElement(
      Modal,
      {
        onClose: () => window.history.back(),
        title: 'Информация о заказе'
      },
      React.createElement(OrderInfo)
    )
  }
];

export const SecondPrivateRoutes: IRoute[] = [
  {
    path: URLS.LOGIN,
    element: React.createElement(Login)
  },
  {
    path: URLS.REGISTER,
    element: React.createElement(Register)
  },
  {
    path: URLS.FORGOT_PASSWORD,
    element: React.createElement(ForgotPassword)
  },
  {
    path: URLS.RESET_PASSWORD,
    element: React.createElement(ResetPassword)
  }
];
