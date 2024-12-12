import { ProfileOrdersUI } from '@ui-pages';
import { TOrder } from '@utils-types';
import { FC } from 'react';

export const ProfileOrders: FC = () => {
  /** TODO: взять переменную из стора и получить все заказы крч ну база */
  const orders: TOrder[] = [];

  return <ProfileOrdersUI orders={orders} />;
};
